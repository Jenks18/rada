import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

// Supabase client for database operations only (not auth)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// POST /api/minisite/publish
// Saves the full minisite state snapshot to Supabase and sets is_published = true
// Also used to "re-publish" (update content of an already-published site).
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verify the user has a creator profile with a username set
  const { data: profile } = await supabase
    .from('creator_profiles')
    .select('id, username')
    .eq('user_id', userId)
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
    .eq('user_id', userId)

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
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('creator_profiles')
    .update({ is_published: false })
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
