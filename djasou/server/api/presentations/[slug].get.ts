/**
 * GET /api/presentations/:slug
 * Récupère une présentation (meta + content)
 */
import { getPresentation } from '../../lib/storage'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const slug = getRouterParam(event, 'slug')!

  const presentation = getPresentation(slug)

  if (!presentation) {
    throw createError({ statusCode: 404, message: 'Présentation introuvable' })
  }

  return presentation
})
