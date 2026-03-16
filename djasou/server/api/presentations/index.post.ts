/**
 * POST /api/presentations
 * Crée une nouvelle présentation
 */
import { createPresentation } from '../../lib/storage'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const { title, theme, tags } = await readBody<{ title: string; theme?: string; tags?: string[] }>(event)

  if (!title?.trim()) {
    throw createError({ statusCode: 400, message: 'Titre requis' })
  }

  const user = session.user as { username: string }

  try {
    const presentation = createPresentation(title.trim(), user.username, theme, tags)
    return presentation
  } catch (err) {
    throw createError({ statusCode: 409, message: (err as Error).message })
  }
})
