/**
 * Storage — Lecture/écriture des présentations sur disque.
 * Structure : data/presentations/{slug}/content.md + meta.json
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const DATA_DIR = join(process.cwd(), 'data')
const PRESENTATIONS_DIR = join(DATA_DIR, 'presentations')

// Assurer que le répertoire existe au démarrage
mkdirSync(PRESENTATIONS_DIR, { recursive: true })

export interface PresentationMeta {
  title: string
  slug: string
  author: string
  tags: string[]
  theme: string
  created: string
  updated: string
}

export interface Presentation {
  meta: PresentationMeta
  content: string
}

function slugDir(slug: string): string {
  return join(PRESENTATIONS_DIR, slug)
}

function metaPath(slug: string): string {
  return join(slugDir(slug), 'meta.json')
}

function contentPath(slug: string): string {
  return join(slugDir(slug), 'content.md')
}

/**
 * Génère un slug URL-safe à partir d'un titre.
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Liste toutes les présentations (meta uniquement).
 */
export function listPresentations(): PresentationMeta[] {
  if (!existsSync(PRESENTATIONS_DIR)) return []

  const entries = readdirSync(PRESENTATIONS_DIR, { withFileTypes: true })
  const presentations: PresentationMeta[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const mp = metaPath(entry.name)
    if (!existsSync(mp)) continue

    try {
      const meta = JSON.parse(readFileSync(mp, 'utf-8')) as PresentationMeta
      presentations.push(meta)
    } catch {
      // Fichier corrompu, on ignore
    }
  }

  return presentations.sort((a, b) => b.updated.localeCompare(a.updated))
}

/**
 * Récupère une présentation complète (meta + content).
 */
export function getPresentation(slug: string): Presentation | null {
  const mp = metaPath(slug)
  const cp = contentPath(slug)

  if (!existsSync(mp) || !existsSync(cp)) return null

  const meta = JSON.parse(readFileSync(mp, 'utf-8')) as PresentationMeta
  const content = readFileSync(cp, 'utf-8')

  return { meta, content }
}

/**
 * Crée une nouvelle présentation.
 */
export function createPresentation(title: string, author: string, theme = 'default', tags: string[] = []): Presentation {
  const slug = slugify(title)
  const dir = slugDir(slug)

  if (existsSync(dir)) {
    throw new Error(`Une présentation avec le slug "${slug}" existe déjà`)
  }

  mkdirSync(dir, { recursive: true })

  const now = new Date().toISOString()
  const meta: PresentationMeta = {
    title,
    slug,
    author,
    tags,
    theme,
    created: now,
    updated: now,
  }

  // Contenu initial avec frontmatter
  const content = `---
title: "${title}"
---

<!-- layout: title -->
<!-- blurs -->

# ${title}

Créé avec Djasou
`

  writeFileSync(metaPath(slug), JSON.stringify(meta, null, 2), 'utf-8')
  writeFileSync(contentPath(slug), content, 'utf-8')

  return { meta, content }
}

/**
 * Met à jour le contenu Markdown d'une présentation.
 */
export function updatePresentation(slug: string, content: string): PresentationMeta {
  const mp = metaPath(slug)

  if (!existsSync(mp)) {
    throw new Error(`Présentation "${slug}" introuvable`)
  }

  const meta = JSON.parse(readFileSync(mp, 'utf-8')) as PresentationMeta
  meta.updated = new Date().toISOString()

  writeFileSync(contentPath(slug), content, 'utf-8')
  writeFileSync(mp, JSON.stringify(meta, null, 2), 'utf-8')

  return meta
}

/**
 * Met à jour les métadonnées d'une présentation.
 */
export function updatePresentationMeta(slug: string, updates: Partial<Pick<PresentationMeta, 'title' | 'tags' | 'theme'>>): PresentationMeta {
  const mp = metaPath(slug)

  if (!existsSync(mp)) {
    throw new Error(`Présentation "${slug}" introuvable`)
  }

  const meta = JSON.parse(readFileSync(mp, 'utf-8')) as PresentationMeta
  Object.assign(meta, updates, { updated: new Date().toISOString() })
  writeFileSync(mp, JSON.stringify(meta, null, 2), 'utf-8')

  return meta
}

/**
 * Supprime une présentation.
 */
export function deletePresentation(slug: string): void {
  const dir = slugDir(slug)

  if (!existsSync(dir)) {
    throw new Error(`Présentation "${slug}" introuvable`)
  }

  rmSync(dir, { recursive: true, force: true })
}
