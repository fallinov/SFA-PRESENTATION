/**
 * GET /api/auth/session
 * Retourne l'utilisateur courant ou 401
 */
export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return session.user
})
