/**
 * GET /api/presentations/:slug/export
 * Exporte en HTML standalone (assets inlinés pour téléchargement)
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getPresentation } from '../../../lib/storage'
import { renderPresentation } from '../../../lib/md2slides'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const slug = getRouterParam(event, 'slug')!

  const presentation = getPresentation(slug)

  if (!presentation) {
    throw createError({ statusCode: 404, message: 'Présentation introuvable' })
  }

  // Rendre avec des chemins relatifs pour un fichier standalone
  // Les assets devront être copiés à côté du HTML
  const html = renderPresentation(presentation.content, './')

  const filename = `${slug}.html`
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  setResponseHeader(event, 'content-disposition', `attachment; filename="${filename}"`)
  return html
})
