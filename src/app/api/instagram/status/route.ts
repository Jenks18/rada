import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/instagram/status — returns current connection info for the logged-in user
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data } = await supabase
    .from('instagram_connections')
    .select('ig_username, auto_reply_enabled, token_expires_at, created_at')
    .eq('user_id', userId)
    .maybeSingle()

  return NextResponse.json({ connection: data ?? null })
}

// DELETE /api/instagram/status — disconnects the Instagram account
export async function DELETE(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await supabase.from('instagram_connections').delete().eq('user_id', userId)

  return NextResponse.json({ success: true })
}

// PATCH /api/instagram/status — toggle auto_reply or update custom_system_prompt
export async function PATCH(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const updates: Record<string, unknown> = {}

  if (typeof body.auto_reply_enabled === 'boolean') {
    updates.auto_reply_enabled = body.auto_reply_enabled
  }
  if (typeof body.custom_system_prompt === 'string' || body.custom_system_prompt === null) {
    updates.custom_system_prompt = body.custom_system_prompt
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const { error } = await supabase
    .from('instagram_connections')
    .update(updates)
    .eq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
