/**
 * Instagram Graph API helpers
 * Uses Instagram Business Login (v21.0)
 * Docs: https://developers.facebook.com/docs/instagram-platform
 */

const IG_API = 'https://graph.instagram.com/v21.0'
const IG_AUTH = 'https://www.instagram.com/oauth/authorize'
const IG_TOKEN = 'https://api.instagram.com/oauth/access_token'
const IG_LONG_TOKEN = `${IG_API}/access_token`

export function getInstagramAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/instagram/callback`,
    response_type: 'code',
    scope: 'instagram_business_basic,instagram_business_manage_messages',
    state,
  })
  return `${IG_AUTH}?${params}`
}

/** Exchange auth code for a short-lived token, then upgrade to long-lived (60 days) */
export async function exchangeCodeForToken(code: string): Promise<{
  accessToken: string
  userId: string
  expiresAt: Date
}> {
  // Step 1: short-lived token
  const shortRes = await fetch(IG_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.INSTAGRAM_APP_ID!,
      client_secret: process.env.INSTAGRAM_APP_SECRET!,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/instagram/callback`,
      code,
    }),
  })

  if (!shortRes.ok) {
    const err = await shortRes.text()
    throw new Error(`Instagram token exchange failed: ${err}`)
  }

  const shortJson = await shortRes.json()
  // Meta wraps the token in a data array
  const shortData = Array.isArray(shortJson?.data) ? shortJson.data[0] : shortJson
  const { access_token: shortToken, user_id } = shortData

  // Step 2: long-lived token
  const longRes = await fetch(
    `${IG_LONG_TOKEN}?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_APP_SECRET}&access_token=${shortToken}`
  )

  if (!longRes.ok) {
    const err = await longRes.text()
    throw new Error(`Instagram long-lived token exchange failed: ${err}`)
  }

  const { access_token, expires_in } = await longRes.json()
  const expiresAt = new Date(Date.now() + expires_in * 1000)

  return { accessToken: access_token, userId: String(user_id), expiresAt }
}

/** Fetch the IG username for a user */
export async function getInstagramProfile(accessToken: string): Promise<{
  id: string
  username: string
}> {
  const res = await fetch(
    `${IG_API}/me?fields=id,username&access_token=${accessToken}`
  )
  if (!res.ok) throw new Error('Failed to fetch Instagram profile')
  return res.json()
}

/** Send a DM reply via Instagram Messaging API */
export async function sendInstagramReply(
  recipientIgsid: string,
  text: string,
  accessToken: string
): Promise<void> {
  const res = await fetch(`${IG_API}/me/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientIgsid },
      message: { text },
      access_token: accessToken,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Failed to send Instagram reply: ${err}`)
  }
}

/** Verify a Facebook webhook signature (X-Hub-Signature-256) */
export async function verifyWebhookSignature(
  rawBody: string,
  signature: string
): Promise<boolean> {
  const secret = process.env.INSTAGRAM_APP_SECRET!
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody))
  const hex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  const expected = `sha256=${hex}`
  return expected === signature
}
