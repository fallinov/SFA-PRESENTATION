/**
 * PUT /api/presentations/:slug
 * Met à jour le contenu Markdown
 */
import { updatePresentation } from '../../lib/storage'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const slug = getRouterParam(event, 'slug')!
  const { content } = await readBody<{ content: string }>(event)

  if (content === undefined) {
    throw createError({ statusCode: 400, message: 'Contenu requis' })
  }

  try {
    const meta = updatePresentation(slug, content)
    return meta
  } catch (err) {
    throw createError({ statusCode: 404, message: (err as Error).message })
  }
})
