/**
 * md2slides — Convertisseur Markdown → HTML pour Djasou.
 * Port TypeScript de libs/md2slides.mjs (sans file I/O).
 *
 * Expose renderPresentation(markdown) qui retourne le HTML complet.
 */
import matter from 'gray-matter'
import markdownit from 'markdown-it'
import { highlight } from './highlight'

// ============================================================
// Types
// ============================================================

interface Frontmatter {
  title?: string
  nav?: 'scroll' | ''
  colors?: Record<string, string>
  gradients?: Record<string, string>
}

interface Directives {
  class?: string
  layout?: string
  blurs?: boolean | string
  section?: string
  [key: string]: unknown
}

// ============================================================
// HTML utilities
// ============================================================

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function attrEscape(str: string): string {
  return escapeHtml(str).replace(/"/g, '&quot;')
}

// ============================================================
// Pré-traitement Markdown
// ============================================================

/**
 * Limite l'indentation à max 3 espaces en dehors des code fences.
 * Empêche markdown-it de traiter le HTML indenté (4+ espaces)
 * comme des blocs de code indentés (CommonMark spec).
 */
function capIndentation(content: string): string {
  const lines = content.split('\n')
  const result: string[] = []
  let inCodeFence = false

  for (const line of lines) {
    // Détection code fence (0-3 espaces + ```)
    if (/^ {0,3}```/.test(line)) {
      inCodeFence = !inCodeFence
      result.push(line)
      continue
    }

    if (inCodeFence) {
      result.push(line)
      continue
    }

    // Hors code fence : limiter l'indentation à 3 espaces
    const match = line.match(/^( {4,})(.+)$/)
    if (match) {
      result.push(match[2]!)
    } else {
      result.push(line)
    }
  }

  return result.join('\n')
}

// ============================================================
// Markdown-it configuration
// ============================================================

function createMd(): markdownit {
  const md = markdownit({ html: true, linkify: false, typographer: false })

  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]!
    const lang = token.info.trim()
    const str = token.content
    const escaped = escapeHtml(str).replace(/\n$/, '')
    const highlighted = highlight(escaped, lang)
    return `<div class="code-block pr-20" data-code="${attrEscape(str.trim())}">`
      + `<code>${highlighted}</code></div>\n`
  }

  return md
}

// ============================================================
// Parser de directives
// ============================================================

function parseDirectives(slideContent: string): { directives: Directives; content: string } {
  const directives: Directives = {}
  const lines: string[] = []

  for (const line of slideContent.split('\n')) {
    const m = line.match(/^\s*<!--\s*(class|layout|blurs|section)\s*(?::\s*(.+?))?\s*-->/)
    if (m) {
      const key = m[1]!
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

function wrapSlide(
  html: string,
  directives: Directives,
  index: number,
  _totalSlides: number,
  frontmatter: Frontmatter,
): string {
  const isTitle = directives.layout === 'title'
  const classes = ['slide', 'items-center']

  if (isTitle) {
    classes.push('justify-center', 'relative', 'overflow-hidden')
  }

  if (!isTitle) {
    classes.push('py-12')
  }

  if (directives.class) {
    classes.push(directives.class)
  } else {
    classes.push(index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800')
  }

  const id = `slide-${index + 1}`

  let blursHtml = ''
  if (directives.blurs) {
    blursHtml = `
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>`
  }

  let sectionHtml = ''
  if (directives.section) {
    sectionHtml = `<span class="slide-section-label">${directives.section}</span>\n`
  }

  let wrappedContent = html
  if (!isTitle) {
    wrappedContent = `<div class="max-w-6xl mx-auto px-6 w-full">\n${sectionHtml}${html}\n</div>`
  } else {
    const scrollIndicator = frontmatter?.nav === 'scroll'
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

function buildHTML(frontmatter: Frontmatter, slidesHtml: string, staticPath: string): string {
  const title = frontmatter.title || 'Présentation'
  const nav = frontmatter.nav || ''
  const colors = frontmatter.colors || {}
  const gradients = frontmatter.gradients || {}

  const bodyAttrs = nav === 'scroll' ? ' data-nav="scroll"' : ''

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

  const gradientRules = Object.entries(gradients)
    .map(([cls, val]) => `.${cls} { background: ${val}; }`)
    .join('\n        ')

  const accentColor = Object.values(colors)[0] || '#3b82f6'

  const customCSS = `
    <style>
        ${gradientRules}

        /* --- Styles Markdown : éléments SANS classe dans .slide --- */
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
        .slide p:not([class]) {
            font-size: 1.125rem;
            color: #cbd5e1;
            line-height: 1.75;
            margin-bottom: 1.5rem;
        }
        .slide p:not([class]):last-child { margin-bottom: 0; }
        .slide p:not([class]) strong { color: #fff; }
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
        .slide code:not(.code-block code):not([class]) {
            background: rgba(255,255,255,0.08);
            padding: 0.15rem 0.4rem;
            border-radius: 0.25rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875em;
            color: ${accentColor};
        }
        .slide blockquote {
            border-left: 4px solid ${accentColor};
            padding-left: 1.5rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #cbd5e1;
        }
        .slide blockquote p { font-size: 1.25rem; color: #cbd5e1; }
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
        .slide img:not([class]) { border-radius: 0.75rem; max-width: 100%; }
        .slide a:not([class]) {
            color: ${accentColor};
            text-decoration: underline;
            text-underline-offset: 3px;
        }
        .slide hr {
            border: none;
            border-top: 1px solid rgba(255,255,255,0.1);
            margin: 2rem 0;
        }
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
        .slide-section-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1rem;
            margin-bottom: 1rem;
            display: block;
            color: ${accentColor};
        }
        .slide .code-block { margin: 1.5rem 0; }
        .slide .code-block + p { margin-top: 1.5rem; }
        .slide:not(.slide-title-wrap) > .max-w-6xl {
            max-height: calc(720px - 6rem);
            overflow-y: auto;
            scrollbar-width: none;
        }
        .slide:not(.slide-title-wrap) > .max-w-6xl::-webkit-scrollbar {
            display: none;
        }
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
    <script src="${staticPath}tailwind.js"></script>
    <link rel="stylesheet" href="${staticPath}fonts.css">
    <link rel="stylesheet" href="${staticPath}slides.css">${tailwindConfig}${customCSS}
</head>
<body${bodyAttrs} class="font-sans bg-slate-900 text-white overflow-x-hidden">

    <!-- Navigation -->
    <nav id="dots" class="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3"></nav>
    <div id="contrast-badge" style="display:none">Contraste élevé (C)</div>

${slidesHtml}
    <script src="${staticPath}slides.js"></script>
</body>
</html>
`
}

// ============================================================
// API publique
// ============================================================

/**
 * Convertit du Markdown (avec frontmatter) en HTML complet pour les slides.
 * @param markdown - Contenu Markdown avec frontmatter YAML
 * @param staticPath - Chemin vers les assets statiques (défaut: '/static/')
 */
export function renderPresentation(markdown: string, staticPath = '/static/'): string {
  const { data: frontmatter, content: body } = matter(markdown) as { data: Frontmatter; content: string }

  const rawSlides = body.split(/\n---\n/).filter(s => s.trim())
  const md = createMd()
  const slidesHtml: string[] = []

  for (let i = 0; i < rawSlides.length; i++) {
    const { directives, content } = parseDirectives(rawSlides[i]!)
    const html = md.render(capIndentation(content))
    slidesHtml.push(wrapSlide(html, directives, i, rawSlides.length, frontmatter))
  }

  return buildHTML(frontmatter, slidesHtml.join('\n'), staticPath)
}

/**
 * Extrait les slides individuels du Markdown (pour édition par slide).
 */
export function splitSlides(markdown: string): string[] {
  const { content: body } = matter(markdown)
  return body.split(/\n---\n/).filter(s => s.trim())
}

/**
 * Reconstruit le Markdown complet à partir du frontmatter et des slides.
 */
export function joinSlides(frontmatterStr: string, slides: string[]): string {
  return `${frontmatterStr}\n${slides.join('\n\n---\n\n')}\n`
}

/**
 * Extrait le frontmatter brut (string YAML) du Markdown.
 */
export function extractFrontmatter(markdown: string): { raw: string; data: Frontmatter } {
  const { data, matter: raw } = matter(markdown) as { data: Frontmatter; matter: string }
  // gray-matter stocke le YAML brut dans .matter
  const frontmatterBlock = raw ? `---\n${raw}\n---\n` : ''
  return { raw: frontmatterBlock, data: data as Frontmatter }
}
