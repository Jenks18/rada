import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { exchangeCodeForToken, getInstagramProfile } from '@/lib/instagram'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/instagram/callback
// Instagram redirects here after the user approves access.
// Exchanges the code for tokens and stores them in the DB.
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  // Meta appends #_ to the code — strip it
  const code = (searchParams.get('code') ?? '').replace(/#_$/, '') || null
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  if (error) {
    return NextResponse.redirect(
      `${appUrl}/dashboard/settings/instagram?error=${encodeURIComponent(searchParams.get('error_reason') ?? 'access_denied')}`
    )
  }

  if (!code || !state) {
    return NextResponse.redirect(`${appUrl}/dashboard/settings/instagram?error=missing_params`)
  }

  // Decode userId from state (set in /api/instagram/connect)
  let userId: string
  try {
    userId = Buffer.from(state, 'base64url').toString('utf-8')
    if (!userId.startsWith('user_')) throw new Error('invalid')
  } catch {
    return NextResponse.redirect(`${appUrl}/dashboard/settings/instagram?error=invalid_state`)
  }

  try {
    const { accessToken, expiresAt } = await exchangeCodeForToken(code)
    // Use profile.id — this matches the entry.id in webhook payloads.
    // The token exchange user_id is app-scoped and differs from the webhook ID.
    const profile = await getInstagramProfile(accessToken)

    console.log('[instagram/callback] storing ig_user_id:', profile.id, 'username:', profile.username)

    await supabase.from('instagram_connections').upsert(
      {
        user_id: userId,
        ig_user_id: profile.id,
        ig_username: profile.username,
        access_token: accessToken,
        token_expires_at: expiresAt.toISOString(),
        auto_reply_enabled: true,
      },
      { onConflict: 'user_id' }
    )

    return NextResponse.redirect(`${appUrl}/dashboard/settings/instagram?connected=1`)
  } catch (err) {
    console.error('[instagram/callback]', err)
    return NextResponse.redirect(`${appUrl}/dashboard/settings/instagram?error=token_exchange_failed`)
  }
}
