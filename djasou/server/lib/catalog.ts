/**
 * Chargement du catalogue de composants depuis catalog/*.md
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

export interface CatalogComponent {
  slug: string
  name: string
  description: string
  category: string
  content: string
}

const CATALOG_DIR = join(process.cwd(), 'catalog')

let cache: CatalogComponent[] | null = null

export function loadCatalog(): CatalogComponent[] {
  if (cache) return cache

  const files = readdirSync(CATALOG_DIR).filter(f => f.endsWith('.md'))

  cache = files.map((file) => {
    const raw = readFileSync(join(CATALOG_DIR, file), 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug: file.replace('.md', ''),
      name: data.name || file.replace('.md', ''),
      description: data.description || '',
      category: data.category || 'content',
      content,
    }
  })

  return cache
}

/**
 * Génère le texte du catalogue pour injection dans le system prompt.
 */
export function catalogToPrompt(selection?: string[]): string {
  const components = loadCatalog()
  const filtered = selection
    ? components.filter(c => selection.includes(c.slug))
    : components

  return filtered.map(c =>
    `### ${c.name}\n${c.description}\n${c.content}`,
  ).join('\n\n')
}
