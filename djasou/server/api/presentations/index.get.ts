/**
 * GET /api/presentations
 * Liste toutes les présentations (meta uniquement)
 */
import { listPresentations } from '../../lib/storage'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  return listPresentations()
})
