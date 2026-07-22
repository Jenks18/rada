import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getInstagramAuthUrl } from '@/lib/instagram'

// GET /api/instagram/connect
// Redirects the authenticated user to Instagram's OAuth consent screen
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Use userId as CSRF state so callback can verify the right user
  const state = Buffer.from(userId).toString('base64url')
  const url = getInstagramAuthUrl(state)

  return NextResponse.redirect(url)
}
