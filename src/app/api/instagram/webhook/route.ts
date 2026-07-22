import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendInstagramReply, verifyWebhookSignature } from '@/lib/instagram'
import { generateStoryReply } from '@/lib/gemini'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/instagram/webhook
// Meta calls this once to verify the endpoint during setup.
// Must respond with hub.challenge when hub.verify_token matches.
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }

  return new NextResponse('Forbidden', { status: 403 })
}

// POST /api/instagram/webhook
// Receives Instagram messaging events (story replies, DMs, etc.)
// Validates the signature, checks if it's a story reply, then auto-replies via Gemini.
export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-hub-signature-256') ?? ''

  // Verify the request is genuinely from Meta
  const valid = await verifyWebhookSignature(rawBody, signature)
  if (!valid) {
    return new NextResponse('Invalid signature', { status: 401 })
  }

  let payload: WebhookPayload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return new NextResponse('Bad JSON', { status: 400 })
  }

  if (payload.object !== 'instagram') {
    return new NextResponse('OK', { status: 200 })
  }

  // Process each entry asynchronously (don't block the 200 response)
  processEntries(payload.entry).catch((err) =>
    console.error('[instagram/webhook] processing error:', err)
  )

  return new NextResponse('EVENT_RECEIVED', { status: 200 })
}

// ---------------------------------------------------------------------------
// Internal processing
// ---------------------------------------------------------------------------

async function processEntries(entries: WebhookEntry[]) {
  for (const entry of entries) {
    const igUserId = entry.id
    const messagingEvents = entry.messaging ?? []

    for (const event of messagingEvents) {
      // Only handle story replies (DMs with a story context)
      const msg = event.message
      if (!msg || msg.is_echo) continue

      const isStoryReply = !!msg.reply_to?.story
      if (!isStoryReply) continue

      const senderIgsid = event.sender.id
      const fanText = msg.text ?? ''

      await handleStoryReply({ igUserId, senderIgsid, fanText })
    }
  }
}

async function handleStoryReply({
  igUserId,
  senderIgsid,
  fanText,
}: {
  igUserId: string
  senderIgsid: string
  fanText: string
}) {
  // Look up the artist's connection by their IG user ID
  const { data: conn } = await supabase
    .from('instagram_connections')
    .select('user_id, access_token, auto_reply_enabled, custom_system_prompt')
    .eq('ig_user_id', igUserId)
    .maybeSingle()

  if (!conn || !conn.auto_reply_enabled) return

  // Get the artist's display name for the Gemini prompt
  const { data: profile } = await supabase
    .from('creator_profiles')
    .select('talent_name, username')
    .eq('user_id', conn.user_id)
    .maybeSingle()

  const artistName = profile?.talent_name ?? profile?.username ?? 'the artist'

  // Generate smart reply
  const replyText = await generateStoryReply({
    artistName,
    fanMessage: fanText,
    customSystemPrompt: conn.custom_system_prompt,
  })

  // Send the reply back via Instagram Messaging API
  await sendInstagramReply(senderIgsid, replyText, conn.access_token)
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WebhookPayload {
  object: string
  entry: WebhookEntry[]
}

interface WebhookEntry {
  id: string
  time: number
  messaging?: MessagingEvent[]
}

interface MessagingEvent {
  sender: { id: string }
  recipient: { id: string }
  timestamp: number
  message?: {
    mid: string
    text?: string
    is_echo?: boolean
    reply_to?: {
      story?: { url: string; id: string }
    }
  }
}
