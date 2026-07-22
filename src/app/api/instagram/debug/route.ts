import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { sendInstagramReply } from '@/lib/instagram'
import { generateStoryReply } from '@/lib/gemini'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/instagram/debug
// Shows stored connection info and lets you fire a test reply
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: conn } = await supabase
    .from('instagram_connections')
    .select('ig_user_id, ig_username, auto_reply_enabled, token_expires_at, created_at')
    .eq('user_id', userId)
    .maybeSingle()

  return NextResponse.json({
    connection: conn,
    env: {
      INSTAGRAM_APP_ID: !!process.env.INSTAGRAM_APP_ID,
      INSTAGRAM_APP_SECRET: !!process.env.INSTAGRAM_APP_SECRET,
      INSTAGRAM_WEBHOOK_VERIFY_TOKEN: !!process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN,
      GOOGLE_GEMINI_API_KEY: !!process.env.GOOGLE_GEMINI_API_KEY,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
  })
}

// POST /api/instagram/debug  { "recipient_id": "...", "text": "hello" }
// Fires a real DM to any IGSID using your stored token — useful to confirm send works
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { recipient_id, text } = await req.json()

  const { data: conn } = await supabase
    .from('instagram_connections')
    .select('ig_user_id, access_token')
    .eq('user_id', userId)
    .maybeSingle()

  if (!conn) return NextResponse.json({ error: 'No Instagram connection found' }, { status: 404 })

  // If text not provided, generate one via Gemini
  const replyText = text ?? await generateStoryReply({
    artistName: 'Test Artist',
    fanMessage: 'Hey love your music!',
  })

  try {
    await sendInstagramReply(recipient_id, replyText, conn.access_token)
    return NextResponse.json({ success: true, sent: replyText, from_ig_user_id: conn.ig_user_id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
