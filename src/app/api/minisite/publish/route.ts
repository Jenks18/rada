import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase(req: NextRequest) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage: {
          getItem: (key) => req.cookies.get(key)?.value ?? null,
          setItem: () => {},
          removeItem: () => {},
        },
      },
    }
  )
}

// POST /api/minisite/publish
// Saves the full minisite state snapshot to Supabase and sets is_published = true
// Also used to "re-publish" (update content of an already-published site).
export async function POST(req: NextRequest) {
  const supabase = getSupabase(req)
  const { data: { user }, error: authErr } = await supabase.auth.getUser()
  if (authErr || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verify the user has a creator profile with a username set
  const { data: profile } = await supabase
    .from('creator_profiles')
    .select('id, username')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!profile?.username) {
    return NextResponse.json(
      { error: 'Please set a username in Settings → Mini Site before publishing.' },
      { status: 422 }
    )
  }

  const body = await req.json()
  const {
    displayName,
    showDisplayName,
    displayMode,
    coverImage,
    profileImage,
    logoImage,
    themeMode,
    backgroundColor,
    textColor,
    overlayMode,
    socialLinks,
    modules,
  } = body

  const minisite_data = {
    displayName,
    showDisplayName,
    displayMode,
    coverImage,
    profileImage,
    logoImage,
    themeMode,
    backgroundColor,
    textColor,
    overlayMode,
    socialLinks,
    modules,
    publishedAt: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('creator_profiles')
    .update({ minisite_data, is_published: true })
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    url: `https://${profile.username}.rada.bio`,
    username: profile.username,
  })
}

// DELETE /api/minisite/publish — unpublish (set is_published = false)
export async function DELETE(req: NextRequest) {
  const supabase = getSupabase(req)
  const { data: { user }, error: authErr } = await supabase.auth.getUser()
  if (authErr || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('creator_profiles')
    .update({ is_published: false })
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
