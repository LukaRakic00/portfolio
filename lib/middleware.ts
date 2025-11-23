import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromRequest } from './auth'

export function requireAuth(request: NextRequest): { username: string } | null {
  const token = getTokenFromRequest(request) || request.cookies.get('admin_token')?.value

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  return decoded
}

export function authMiddleware(handler: (req: NextRequest, user: { username: string }) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = requireAuth(request)

    if (!user) {
      return NextResponse.json(
        { error: 'Neautorizovan pristup' },
        { status: 401 }
      )
    }

    return handler(request, user)
  }
}

