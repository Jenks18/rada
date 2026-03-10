import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

function getSupabase() {
  const cookieStore = cookies()
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage: {
          getItem: (key: string) => {
            return cookieStore.get(key)?.value ?? null
          },
          setItem: () => {},
          removeItem: () => {},
        },
      },
    }
  )
}

// GET /api/minisite/profile — return the current user's creator profile
export async function GET(req: NextRequest) {
  const supabase = getSupabase()
  const { data: { user }, error: authErr } = await supabase.auth.getUser()
  if (authErr || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('creator_profiles')
    .select('id, username, talent_name, currency, is_published, minisite_data')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ profile: data })
}

// POST /api/minisite/profile — upsert profile settings (username, talent_name, currency)
export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  const { data: { user }, error: authErr } = await supabase.auth.getUser()
  if (authErr || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { username, talent_name, currency } = body

  // Validate username format
  if (username) {
    const usernameRegex = /^[a-z0-9][a-z0-9\-]{0,28}[a-z0-9]$|^[a-z0-9]{1,30}$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: 'Username must be 2–30 lowercase letters, numbers, or hyphens (no leading/trailing hyphens).' },
        { status: 400 }
      )
    }

    // Reserved slugs that must not be taken as usernames
    const reserved = ['dashboard', 'api', 'studio', 'discover', 'artists', 'admin', 'support', 'www', 'app', 'about', 'pricing', 'blog', 'help']
    if (reserved.includes(username)) {
      return NextResponse.json({ error: 'That username is reserved.' }, { status: 400 })
    }

    // Check uniqueness (excluding own row)
    const { data: existing } = await supabase
      .from('creator_profiles')
      .select('user_id')
      .eq('username', username)
      .neq('user_id', user.id)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'Username is already taken.' }, { status: 409 })
    }
  }

  const upsertData: Record<string, unknown> = {
    user_id: user.id,
    ...(username && { username: username.toLowerCase() }),
    ...(talent_name !== undefined && { talent_name }),
    ...(currency && { currency }),
  }

  const { data, error } = await supabase
    .from('creator_profiles')
    .upsert(upsertData, { onConflict: 'user_id' })
    .select('id, username, talent_name, currency, is_published')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ profile: data })
}
