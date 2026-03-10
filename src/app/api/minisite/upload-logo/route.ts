import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = file.name.split('.').pop() ?? 'png'
  const path = `${userId}/logo.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabase.storage.from('covers').upload(path, buffer, {
    contentType: file.type || 'image/png',
    cacheControl: '31536000',
    upsert: true,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data } = supabase.storage.from('covers').getPublicUrl(path)
  const url = `${data.publicUrl}?t=${Date.now()}`

  return NextResponse.json({ url })
}

export async function DELETE() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Try common extensions
  await supabase.storage.from('covers').remove([
    `${userId}/logo.png`,
    `${userId}/logo.jpg`,
    `${userId}/logo.jpeg`,
    `${userId}/logo.webp`,
  ])
  return NextResponse.json({ ok: true })
}
