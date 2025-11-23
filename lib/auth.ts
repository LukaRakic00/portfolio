import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getRedisValue, setRedisValue } from './redis'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export async function createAdminUser(): Promise<void> {
  const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const hash = await hashPassword(defaultPassword)
  await setRedisValue('admin:password', hash)
}

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) {
    return false
  }

  const storedHash = await getRedisValue('admin:password')
  if (!storedHash) {
    // Prvi put - kreiraj admin korisnika
    await createAdminUser()
    return await verifyAdmin(username, password)
  }

  return await verifyPassword(password, storedHash)
}

export function generateToken(username: string): string {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { username: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string }
    return decoded
  } catch {
    return null
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}

