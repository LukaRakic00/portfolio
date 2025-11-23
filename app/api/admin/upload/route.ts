import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/lib/middleware'
import { uploadImage } from '@/lib/cloudinary'

async function handler(request: NextRequest, user: { username: string }) {
  try {
    // Proveri Cloudinary konfiguraciju
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: 'Cloudinary nije konfigurisan. Proverite .env fajl sa CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY i CLOUDINARY_API_SECRET.' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'luka-portfolio'

    if (!file) {
      return NextResponse.json(
        { error: 'Fajl nije pronađen' },
        { status: 400 }
      )
    }

    const url = await uploadImage(file, folder)

    return NextResponse.json({ success: true, url })
  } catch (error: any) {
    console.error('Upload error:', error)
    
    // Bolja error poruka za Cloudinary greške
    let errorMessage = 'Greška pri upload-u slike'
    if (error?.http_code === 401) {
      errorMessage = 'Neispravni Cloudinary kredencijali. Proverite CLOUDINARY_API_SECRET u .env fajlu.'
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export const POST = authMiddleware(handler)

