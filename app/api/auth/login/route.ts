import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Korisničko ime i lozinka su obavezni' },
        { status: 400 }
      )
    }

    const isValid = await verifyAdmin(username, password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Neispravno korisničko ime ili lozinka' },
        { status: 401 }
      )
    }

    const token = generateToken(username)

    const response = NextResponse.json({ success: true, token })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dana
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Greška pri prijavljivanju' },
      { status: 500 }
    )
  }
}

