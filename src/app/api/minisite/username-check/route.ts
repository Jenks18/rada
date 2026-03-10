import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// GET /api/minisite/username-check?username=xxx
// Returns { available: boolean }
export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')?.toLowerCase()

  if (!username) {
    return NextResponse.json({ error: 'username is required' }, { status: 400 })
  }

  // Quick format check before hitting DB
  const usernameRegex = /^[a-z0-9][a-z0-9\-]{0,28}[a-z0-9]$|^[a-z0-9]{1,30}$/
  if (!usernameRegex.test(username)) {
    return NextResponse.json({ available: false, reason: 'invalid_format' })
  }

  const reserved = ['dashboard', 'api', 'studio', 'discover', 'artists', 'admin', 'support', 'www', 'app', 'about', 'pricing', 'blog', 'help']
  if (reserved.includes(username)) {
    return NextResponse.json({ available: false, reason: 'reserved' })
  }

  // Uses service role so RLS is bypassed — read-only check, safe
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from('creator_profiles')
    .select('username')
    .eq('username', username)
    .maybeSingle()

  return NextResponse.json({ available: !data })
}
