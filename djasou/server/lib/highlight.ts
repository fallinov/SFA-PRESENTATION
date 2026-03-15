/**
 * Coloration syntaxique regex-based pour les code blocks.
 * Port TypeScript de la partie highlight de md2slides.mjs.
 */

interface TokenRule {
  re: RegExp
  cls: string | null
  group?: number
  replace?: (...args: string[]) => string
}

type TokenRules = TokenRule[] | string

const TOKENS: Record<string, TokenRules> = {
  js: [
    { re: /(\/\/.*$)/gm, cls: 'comment' },
    { re: /(\/\*[\s\S]*?\*\/)/g, cls: 'comment' },
    { re: /("(?:[^"\\]|\\.)*")/g, cls: 'string' },
    { re: /('(?:[^'\\]|\\.)*')/g, cls: 'string' },
    { re: /(`(?:[^`\\]|\\.)*`)/g, cls: 'string' },
    { re: /\b(\d+(?:\.\d+)?)\b/g, cls: 'number' },
    { re: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|yield|void|delete|true|false|null|undefined)\b/g, cls: 'keyword' },
    { re: /\b([a-zA-Z_$][\w$]*)\s*\(/g, cls: 'function', group: 1 },
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
    { re: /(&lt;\/?)([\w-]+)/g, cls: null, replace: (_: string, bracket: string, tag: string) => `<span class="tag">${bracket}${tag}</span>` },
    { re: /(\/?&gt;)/g, cls: 'tag' },
    { re: /\b([\w-]+)(=)/g, cls: null, replace: (_: string, attr: string, eq: string) => `<span class="attr">${attr}</span>${eq}` },
  ],
  vue: 'html',
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

const PH_START = '§PH_'
const PH_END = '§'

/**
 * Applique la coloration syntaxique sur du code HTML-escaped.
 * Protège les zones déjà colorées avec des placeholders pour éviter
 * la double coloration.
 */
export function highlight(code: string, lang: string): string {
  let rules = TOKENS[lang]
  if (!rules) return code
  if (typeof rules === 'string') rules = TOKENS[rules] as TokenRule[]

  const placeholders: string[] = []

  function protect(span: string): string {
    const idx = placeholders.length
    placeholders.push(span)
    return `${PH_START}${idx}${PH_END}`
  }

  function hasPlaceholder(str: string): boolean {
    return str.includes(PH_START)
  }

  let result = code

  for (const rule of rules as TokenRule[]) {
    if (rule.replace) {
      result = result.replace(rule.re, (...args: unknown[]) => {
        const match = args[0] as string
        if (hasPlaceholder(match)) return match
        return protect(rule.replace!(...(args as string[])))
      })
    } else if (rule.group !== undefined) {
      result = result.replace(rule.re, (...args: unknown[]) => {
        const match = args[0] as string
        if (hasPlaceholder(match)) return match
        const captured = (args as string[])[rule.group!] as string
        return match.replace(captured, protect(`<span class="${rule.cls}">${captured}</span>`))
      })
    } else {
      result = result.replace(rule.re, (...args: unknown[]) => {
        const match = args[0] as string
        if (hasPlaceholder(match)) return match
        return protect(`<span class="${rule.cls}">${match}</span>`)
      })
    }
  }

  // Restaurer les placeholders (du dernier au premier)
  let output = result
  for (let i = placeholders.length - 1; i >= 0; i--) {
    output = output.replaceAll(`${PH_START}${i}${PH_END}`, placeholders[i]!)
  }
  return output
}
