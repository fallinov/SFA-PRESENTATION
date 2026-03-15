/**
 * POST /api/auth/login
 * Authentification basique avec users.json
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

interface User {
  username: string
  password: string
  name: string
}

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<{ username: string; password: string }>(event)

  if (!username || !password) {
    throw createError({ statusCode: 400, message: 'Identifiants requis' })
  }

  const usersPath = join(process.cwd(), 'data', 'users.json')

  if (!existsSync(usersPath)) {
    throw createError({ statusCode: 500, message: 'Fichier users.json manquant' })
  }

  const users = JSON.parse(readFileSync(usersPath, 'utf-8')) as User[]
  const user = users.find(u => u.username === username && u.password === password)

  if (!user) {
    throw createError({ statusCode: 401, message: 'Identifiants invalides' })
  }

  await setUserSession(event, {
    user: {
      username: user.username,
      name: user.name,
    },
  })

  return { user: { username: user.username, name: user.name } }
})
