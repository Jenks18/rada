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
    console.log('[instagram/webhook] non-instagram object:', payload.object)
    return new NextResponse('OK', { status: 200 })
  }

  console.log('[instagram/webhook] received entries:', JSON.stringify(payload.entry, null, 2))

  // Await processing — Vercel terminates the function after the response is sent,
  // so fire-and-forget loses the work. Meta allows up to 20s for a response.
  try {
    await processEntries(payload.entry)
  } catch (err) {
    console.error('[instagram/webhook] processing error:', err)
  }

  return new NextResponse('EVENT_RECEIVED', { status: 200 })
}

// ---------------------------------------------------------------------------
// Internal processing
// ---------------------------------------------------------------------------

async function processEntries(entries: WebhookEntry[]) {
  for (const entry of entries) {
    const igUserId = entry.id
    const messagingEvents = entry.messaging ?? []

    console.log(`[instagram/webhook] entry igUserId=${igUserId} events=${messagingEvents.length}`)

    for (const event of messagingEvents) {
      const msg = event.message
      if (!msg || msg.is_echo) {
        console.log('[instagram/webhook] skipping echo or missing message')
        continue
      }

      const isStoryReply = !!msg.reply_to?.story
      const senderIgsid = event.sender.id
      const fanText = msg.text ?? ''

      console.log(`[instagram/webhook] message from=${senderIgsid} isStoryReply=${isStoryReply} text="${fanText}"`)

      // Reply to story replies AND direct DMs (for testing; story-only filter can be re-enabled later)
      await handleStoryReply({ igUserId, senderIgsid, fanText, isStoryReply })
    }
  }
}

async function handleStoryReply({
  igUserId,
  senderIgsid,
  fanText,
  isStoryReply,
}: {
  igUserId: string
  senderIgsid: string
  fanText: string
  isStoryReply: boolean
}) {
  // Look up the artist's connection by their IG user ID
  const { data: conn, error: connErr } = await supabase
    .from('instagram_connections')
    .select('user_id, access_token, auto_reply_enabled, custom_system_prompt')
    .eq('ig_user_id', igUserId)
    .maybeSingle()

  console.log(`[instagram/webhook] DB lookup igUserId=${igUserId} found=${!!conn} err=${connErr?.message}`)

  if (!conn || !conn.auto_reply_enabled) {
    console.log('[instagram/webhook] no connection or auto-reply disabled, skipping')
    return
  }

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
