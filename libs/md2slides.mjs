#!/usr/bin/env node
/**
 * md2slides — Convertisseur Markdown → HTML pour SFA-PRESENTATION
 *
 * Usage :
 *   node libs/md2slides.mjs wordpress/gestion-medias.md   # un fichier
 *   node libs/md2slides.mjs                                # tous les .md
 *   node libs/md2slides.mjs --watch                        # watch mode
 */
import { readFileSync, writeFileSync, readdirSync, statSync, watchFile } from 'node:fs'
import { resolve, dirname, extname, relative, join } from 'node:path'
import matter from 'gray-matter'
import markdownit from 'markdown-it'

// ============================================================
// Tokenizer syntaxique (regex-based)
// ============================================================

const TOKENS = {
  js: [
    // Commentaires
    { re: /(\/\/.*$)/gm, cls: 'comment' },
    { re: /(\/\*[\s\S]*?\*\/)/g, cls: 'comment' },
    // Strings (double, single, backtick)
    { re: /("(?:[^"\\]|\\.)*")/g, cls: 'string' },
    { re: /('(?:[^'\\]|\\.)*')/g, cls: 'string' },
    { re: /(`(?:[^`\\]|\\.)*`)/g, cls: 'string' },
    // Numbers
    { re: /\b(\d+(?:\.\d+)?)\b/g, cls: 'number' },
    // Keywords
    { re: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|yield|void|delete|true|false|null|undefined)\b/g, cls: 'keyword' },
    // Functions (word followed by parenthesis)
    { re: /\b([a-zA-Z_$][\w$]*)\s*\(/g, cls: 'function', group: 1 },
    // Types (PascalCase)
    { re: /\b([A-Z][a-zA-Z0-9]*)\b/g, cls: 'type' },
  ],
  css: [
    { re: /(\/\*[\s\S]*?\*\/)/g, cls: 'comment' },
    { re: /("(?:[^"\\]|\\.)*")/g, cls: 'string' },
    { re: /('(?:[^'\\]|\\.)*')/g, cls: 'string' },
    { re: /\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms|deg|fr)?)\b/g, cls: 'number' },
    { re: /(@(?:media|keyframes|import|font-face|supports|layer))\b/g, cls: 'keyword' },
    { re: /([\w-]+)\s*:/g, cls: 'attr', group: 1 },
    { re: /([.#][\w-]+)/g, cls: 'function' },
  ],
  html: [
    { re: /(&lt;!--[\s\S]*?--&gt;)/g, cls: 'comment' },
    { re: /("(?:[^"\\]|\\.)*")/g, cls: 'value' },
    { re: /('(?:[^'\\]|\\.)*')/g, cls: 'value' },
    { re: /(&lt;\/?)([\w-]+)/g, cls: null, replace: (_, bracket, tag) => `<span class="tag">${bracket}${tag}</span>` },
    { re: /(\/?&gt;)/g, cls: 'tag' },
    { re: /\b([\w-]+)(=)/g, cls: null, replace: (_, attr, eq) => `<span class="attr">${attr}</span>${eq}` },
  ],
  vue: 'html', // alias
  php: [
    { re: /(\/\/.*$)/gm, cls: 'comment' },
    { re: /(\/\*[\s\S]*?\*\/)/g, cls: 'comment' },
    { re: /(#.*$)/gm, cls: 'comment' },
    { re: /("(?:[^"\\]|\\.)*")/g, cls: 'string' },
    { re: /('(?:[^'\\]|\\.)*')/g, cls: 'string' },
    { re: /(&lt;\?php|&lt;\?|\?&gt;)/g, cls: 'php-tag' },
    { re: /\b(\d+(?:\.\d+)?)\b/g, cls: 'number' },
    { re: /(\$[\w]+)/g, cls: 'variable' },
    { re: /\b(function|return|if|else|elseif|for|foreach|while|do|switch|case|break|continue|new|class|extends|implements|public|private|protected|static|echo|print|require|include|require_once|include_once|use|namespace|as|true|false|null|array|isset|unset|empty)\b/g, cls: 'keyword' },
    { re: /\b([a-zA-Z_][\w]*)\s*\(/g, cls: 'function', group: 1 },
  ],
}

/**
 * Applique la coloration syntaxique sur du code HTML-escaped.
 * Protège les zones déjà colorées pour éviter la double coloration.
 *
 * Utilise des placeholders « §PH_N§ » qui ne seront pas matchés
 * par les regex de nombres, keywords, etc.
 */
function highlight(code, lang) {
  let rules = TOKENS[lang]
  if (!rules) return code
  if (typeof rules === 'string') rules = TOKENS[rules]

  const placeholders = []
  const PH_START = '§PH_'
  const PH_END = '§'

  function protect(span) {
    const idx = placeholders.length
    placeholders.push(span)
    return `${PH_START}${idx}${PH_END}`
  }

  function hasPlaceholder(str) {
    return str.includes(PH_START)
  }

  let result = code

  for (const rule of rules) {
    if (rule.replace) {
      result = result.replace(rule.re, (...args) => {
        if (hasPlaceholder(args[0])) return args[0]
        return protect(rule.replace(...args))
      })
    } else if (rule.group !== undefined) {
      result = result.replace(rule.re, (...args) => {
        if (hasPlaceholder(args[0])) return args[0]
        const captured = args[rule.group]
        return args[0].replace(captured, protect(`<span class="${rule.cls}">${captured}</span>`))
      })
    } else {
      result = result.replace(rule.re, (match) => {
        if (hasPlaceholder(match)) return match
        return protect(`<span class="${rule.cls}">${match}</span>`)
      })
    }
  }

  // Restaurer les placeholders (du dernier au premier pour éviter les conflits d'index)
  let output = result
  for (let i = placeholders.length - 1; i >= 0; i--) {
    output = output.replaceAll(`${PH_START}${i}${PH_END}`, placeholders[i])
  }
  return output
}

// ============================================================
// Markdown-it configuration
// ============================================================

function createMd() {
  const md = markdownit({ html: true, linkify: false, typographer: false })

  // Override fence renderer : code-block avec coloration + data-code pour copier
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const lang = token.info.trim()
    const str = token.content
    const escaped = escapeHtml(str).replace(/\n$/, '')
    const highlighted = highlight(escaped, lang)
    return `<div class="code-block pr-20" data-code="${attrEscape(str.trim())}">`
      + `<code>${highlighted}</code></div>\n`
  }

  return md
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function attrEscape(str) {
  return escapeHtml(str).replace(/"/g, '&quot;')
}

// ============================================================
// Parser de directives (commentaires HTML)
// ============================================================

function parseDirectives(slideContent) {
  const directives = {}
  const lines = []

  for (const line of slideContent.split('\n')) {
    const m = line.match(/^\s*<!--\s*(class|layout|blurs|section)\s*(?::\s*(.+?))?\s*-->/)
    if (m) {
      const key = m[1]
      const val = m[2] || true
      directives[key] = val
    } else {
      lines.push(line)
    }
  }

  return { directives, content: lines.join('\n').trim() }
}

// ============================================================
// Wrapper de slide
// ============================================================

function wrapSlide(html, directives, index, totalSlides, frontmatterRef) {
  const isTitle = directives.layout === 'title'
  const classes = ['slide', 'flex', 'items-center']

  if (isTitle) {
    classes.push('justify-center', 'relative', 'overflow-hidden')
  }

  // py-12 pour les slides contenu (py-20 déborde avec du contenu dense)
  if (!isTitle) {
    classes.push('py-12')
  }

  // Classe custom ou alternance bg
  if (directives.class) {
    classes.push(directives.class)
  } else {
    classes.push(index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800')
  }

  const id = `slide-${index + 1}`

  // Blurs décoratifs
  let blursHtml = ''
  if (directives.blurs) {
    blursHtml = `
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>`
  }

  // Section label
  let sectionHtml = ''
  if (directives.section) {
    sectionHtml = `<span class="slide-section-label">${directives.section}</span>\n`
  }

  // Wrapper contenu pour slides non-titre
  let wrappedContent = html
  if (!isTitle) {
    // Toujours envelopper dans max-w-6xl (comme les originaux)
    wrappedContent = `<div class="max-w-6xl mx-auto px-6 w-full">\n${sectionHtml}${html}\n</div>`
  } else {
    // Titre : contenu centré avec z-10 + scroll indicator
    const scrollIndicator = frontmatterRef?.nav === 'scroll'
      ? `\n<div class="scroll-indicator"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg><p>Défiler pour commencer</p></div>`
      : ''
    wrappedContent = `<div class="relative z-10 text-center slide-title-content">\n${sectionHtml}${html}${scrollIndicator}\n</div>`
  }

  return `    <!-- Slide ${index + 1} -->
    <section id="${id}" class="${classes.join(' ')}">
${blursHtml}
        ${wrappedContent}
    </section>\n`
}

// ============================================================
// Générateur de template HTML
// ============================================================

function buildHTML(frontmatter, slidesHtml, depth) {
  const title = frontmatter.title || 'Présentation'
  const nav = frontmatter.nav || ''
  const colors = frontmatter.colors || {}
  const gradients = frontmatter.gradients || {}

  // Chemin relatif vers libs/
  const prefix = depth > 0 ? '../'.repeat(depth) : ''
  const libsPath = `${prefix}libs/`

  // Body attributes
  const bodyAttrs = nav === 'scroll' ? ' data-nav="scroll"' : ''

  // Tailwind config (couleurs custom)
  let tailwindConfig = ''
  if (Object.keys(colors).length > 0) {
    const colorsLines = JSON.stringify(colors, null, 4)
      .split('\n')
      .map((line, i) => i === 0 ? line : '                        ' + line)
      .join('\n')
    tailwindConfig = `
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    colors: ${colorsLines}
                }
            }
        }
    </script>`
  }

  // CSS custom (gradients + styles Markdown)
  const gradientRules = Object.entries(gradients)
    .map(([cls, val]) => `.${cls} { background: ${val}; }`)
    .join('\n        ')

  // Première couleur custom comme accent, sinon bleu par défaut
  const accentColor = Object.values(colors)[0] || '#3b82f6'

  const customCSS = `
    <style>
        ${gradientRules}

        /* --- Styles Markdown : éléments SANS classe dans .slide ---
             :not([class]) évite d'écraser les classes Tailwind inline */

        /* Titres */
        .slide h1:not([class]) {
            font-size: clamp(2.5rem, 5vw, 3.75rem);
            font-weight: 700;
            margin-bottom: 1.5rem;
            line-height: 1.1;
        }
        .slide h2:not([class]) {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 700;
            margin-bottom: 2rem;
            line-height: 1.15;
        }
        .slide h3:not([class]) {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
        }

        /* Paragraphes */
        .slide p:not([class]) {
            font-size: 1.125rem;
            color: #cbd5e1;
            line-height: 1.75;
            margin-bottom: 1.5rem;
        }
        .slide p:not([class]):last-child { margin-bottom: 0; }
        .slide p:not([class]) strong { color: #fff; }

        /* Listes */
        .slide ul:not([class]), .slide ol:not([class]) {
            font-size: 1.125rem;
            color: #cbd5e1;
            line-height: 1.75;
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
        }
        .slide ul:not([class]) { list-style: disc; }
        .slide ol:not([class]) { list-style: decimal; }
        .slide li:not([class]) { margin-bottom: 0.5rem; }
        .slide li:not([class])::marker { color: ${accentColor}; }
        .slide li:not([class]) strong { color: #fff; }

        /* Inline code */
        .slide code:not(.code-block code):not([class]) {
            background: rgba(255,255,255,0.08);
            padding: 0.15rem 0.4rem;
            border-radius: 0.25rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875em;
            color: ${accentColor};
        }

        /* Blockquote */
        .slide blockquote {
            border-left: 4px solid ${accentColor};
            padding-left: 1.5rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #cbd5e1;
        }
        .slide blockquote p { font-size: 1.25rem; color: #cbd5e1; }

        /* Tables */
        .slide table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
        }
        .slide th {
            text-align: left;
            padding: 0.75rem 1rem;
            border-bottom: 2px solid rgba(255,255,255,0.1);
            font-weight: 600;
            color: #fff;
        }
        .slide td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            color: #cbd5e1;
        }

        /* Images */
        .slide img:not([class]) { border-radius: 0.75rem; max-width: 100%; }

        /* Liens */
        .slide a:not([class]) {
            color: ${accentColor};
            text-decoration: underline;
            text-underline-offset: 3px;
        }

        /* Séparateur hr */
        .slide hr {
            border: none;
            border-top: 1px solid rgba(255,255,255,0.1);
            margin: 2rem 0;
        }

        /* --- Slide titre --- */
        .slide-title-content {
            padding: 0 1.5rem;
        }
        .slide-title-content h1 {
            font-size: clamp(3rem, 7vw, 4.5rem) !important;
            margin-bottom: 1.5rem;
            color: #fff;
            animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .slide-title-content p:not([class]) {
            font-size: clamp(1.25rem, 2.5vw, 1.5rem);
            color: rgba(255,255,255,0.9);
            margin-bottom: 2rem;
            animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
            opacity: 0;
        }

        /* Section label */
        .slide-section-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1rem;
            margin-bottom: 1rem;
            display: block;
            color: ${accentColor};
        }

        /* Code blocks — espacement */
        .slide .code-block { margin: 1.5rem 0; }
        .slide .code-block + p { margin-top: 1.5rem; }

        /* Slides contenu : empêcher le débordement vertical */
        .slide:not(.slide-title-wrap) > .max-w-6xl {
            max-height: calc(720px - 6rem);
            overflow-y: auto;
            scrollbar-width: none;
        }
        .slide:not(.slide-title-wrap) > .max-w-6xl::-webkit-scrollbar {
            display: none;
        }

        /* Scroll indicator (slide titre en mode scroll) */
        .scroll-indicator {
            margin-top: 4rem;
            animation: pulse-slow 3s ease-in-out infinite;
            color: rgba(255,255,255,0.8);
            text-align: center;
        }
        .scroll-indicator svg {
            width: 2rem;
            height: 2rem;
            margin: 0 auto;
        }
        .scroll-indicator p {
            font-size: 0.875rem !important;
            color: rgba(255,255,255,0.7) !important;
            margin-top: 0.5rem;
        }
    </style>`

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <script src="${libsPath}tailwind.js"></script>
    <link rel="stylesheet" href="${libsPath}fonts.css">
    <link rel="stylesheet" href="${libsPath}slides.css">${tailwindConfig}${customCSS}
</head>
<body${bodyAttrs} class="font-sans bg-slate-900 text-white overflow-x-hidden">

    <!-- Navigation -->
    <nav id="dots" class="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3"></nav>
    <div id="contrast-badge" style="display:none">Contraste élevé (C)</div>

${slidesHtml}
    <script src="${libsPath}slides.js"></script>
</body>
</html>
`
}

// ============================================================
// Pipeline principal
// ============================================================

function convert(inputPath) {
  const raw = readFileSync(inputPath, 'utf-8')
  const { data: frontmatter, content: body } = matter(raw)

  // Calculer la profondeur pour les chemins relatifs
  const projectRoot = findProjectRoot(inputPath)
  const relPath = relative(projectRoot, dirname(inputPath))
  const depth = relPath ? relPath.split('/').length : 0

  // Séparer les slides par ---
  // On doit ignorer le premier --- du frontmatter (déjà retiré par gray-matter)
  const rawSlides = body.split(/\n---\n/).filter(s => s.trim())

  const md = createMd()
  const slidesHtml = []

  for (let i = 0; i < rawSlides.length; i++) {
    const { directives, content } = parseDirectives(rawSlides[i])
    const html = md.render(content)
    slidesHtml.push(wrapSlide(html, directives, i, rawSlides.length, frontmatter))
  }

  const fullHtml = buildHTML(frontmatter, slidesHtml.join('\n'), depth)

  // Écrire le fichier HTML (même nom, extension .html)
  const outputPath = inputPath.replace(/\.md$/, '.html')
  writeFileSync(outputPath, fullHtml, 'utf-8')

  const relOut = relative(projectRoot, outputPath)
  console.log(`  ✓ ${relOut} (${rawSlides.length} slides)`)
  return outputPath
}

// ============================================================
// Utilitaires fichiers
// ============================================================

function findProjectRoot(filePath) {
  let dir = dirname(resolve(filePath))
  while (dir !== '/') {
    try {
      statSync(join(dir, 'libs', 'slides.js'))
      return dir
    } catch {
      dir = dirname(dir)
    }
  }
  return process.cwd()
}

function findMarkdownFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.git' || entry === 'slidev-test') continue
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      files.push(...findMarkdownFiles(full))
    } else if (extname(entry) === '.md' && entry !== 'README.md' && entry !== 'CLAUDE.md') {
      files.push(full)
    }
  }
  return files
}

// ============================================================
// CLI
// ============================================================

const args = process.argv.slice(2)
const projectRoot = findProjectRoot(import.meta.filename || process.cwd())

if (args.includes('--watch')) {
  // Watch mode
  const files = findMarkdownFiles(projectRoot)
  if (files.length === 0) {
    console.log('Aucun fichier .md trouvé.')
    process.exit(0)
  }
  console.log(`md2slides — watch mode (${files.length} fichiers)\n`)
  for (const f of files) {
    convert(f)
    watchFile(f, { interval: 500 }, () => {
      console.log(`\n  ↻ ${relative(projectRoot, f)} modifié`)
      try {
        convert(f)
      } catch (err) {
        console.error(`  ✗ Erreur: ${err.message}`)
      }
    })
  }
  console.log('\nEn attente de modifications... (Ctrl+C pour quitter)')
} else if (args.length > 0) {
  // Fichiers spécifiques
  console.log('md2slides — conversion\n')
  for (const arg of args) {
    const p = resolve(arg)
    try {
      convert(p)
    } catch (err) {
      console.error(`  ✗ ${arg}: ${err.message}`)
    }
  }
} else {
  // Tous les .md
  const files = findMarkdownFiles(projectRoot)
  if (files.length === 0) {
    console.log('Aucun fichier .md trouvé.')
    process.exit(0)
  }
  console.log(`md2slides — conversion de ${files.length} fichier(s)\n`)
  for (const f of files) {
    try {
      convert(f)
    } catch (err) {
      console.error(`  ✗ ${relative(projectRoot, f)}: ${err.message}`)
    }
  }
}
