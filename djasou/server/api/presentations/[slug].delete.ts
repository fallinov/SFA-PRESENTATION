/**
 * DELETE /api/presentations/:slug
 * Supprime une présentation
 */
import { deletePresentation } from '../../lib/storage'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const slug = getRouterParam(event, 'slug')!

  try {
    deletePresentation(slug)
    return { ok: true }
  } catch (err) {
    throw createError({ statusCode: 404, message: (err as Error).message })
  }
})
