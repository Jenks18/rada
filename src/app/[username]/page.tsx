import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import PublicMiniSite from '@/components/PublicMiniSite'

// Server component — fetches the published profile
export default async function PublicProfilePage({
  params,
}: {
  params: { username: string }
}) {
  const username = params.username.toLowerCase()

  // Use service role to bypass RLS (published profiles are readable via policy anyway)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await supabase
    .from('creator_profiles')
    .select('username, talent_name, minisite_data, is_published')
    .eq('username', username)
    .eq('is_published', true)
    .maybeSingle()

  if (!profile) {
    notFound()
  }

  const data = profile.minisite_data as any

  return (
    <PublicMiniSite
      username={profile.username}
      talentName={profile.talent_name}
      displayName={data.displayName}
      showDisplayName={data.showDisplayName}
      displayMode={data.displayMode}
      coverImage={data.coverImage}
      profileImage={data.profileImage}
      logoImage={data.logoImage}
      backgroundColor={data.backgroundColor}
      textColor={data.textColor}
      overlayMode={data.overlayMode}
      socialLinks={data.socialLinks}
      modules={data.modules}
    />
  )
}

// Opt out of static generation for now (could enable ISR later)
export const dynamic = 'force-dynamic'
