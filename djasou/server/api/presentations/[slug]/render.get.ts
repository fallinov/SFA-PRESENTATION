/**
 * GET /api/presentations/:slug/render
 * Rend le Markdown en HTML complet (pour l'iframe de preview)
 */
import { getPresentation } from '../../../lib/storage'
import { renderPresentation } from '../../../lib/md2slides'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const slug = getRouterParam(event, 'slug')!

  const presentation = getPresentation(slug)

  if (!presentation) {
    throw createError({ statusCode: 404, message: 'Présentation introuvable' })
  }

  const html = renderPresentation(presentation.content)

  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  return html
})
