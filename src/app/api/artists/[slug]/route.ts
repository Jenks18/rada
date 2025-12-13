import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * GET /api/artists/[slug]
 * Get artist profile by slug (for public landing page)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Get artist profile
    const { data: artist, error: artistError } = await supabase
      .from('artists')
      .select('*')
      .eq('slug', params.slug)
      .single()

    if (artistError || !artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
    }

    // Get custom links
    const { data: links } = await supabase
      .from('custom_links')
      .select('*')
      .eq('artist_id', artist.id)
      .eq('is_active', true)
      .order('order', { ascending: true })

    // Get upcoming events with ticket types
    const { data: events } = await supabase
      .from('events')
      .select(`
        *,
        ticket_types:ticket_types(*)
      `)
      .eq('artist_id', artist.id)
      .eq('is_published', true)
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true })

    // Filter active ticket types
    const eventsWithActiveTickets = events?.map(event => ({
      ...event,
      ticket_types: event.ticket_types?.filter((tt: any) => tt.is_active)
    }))

    // Get merchandise
    const { data: merchandise } = await supabase
      .from('merchandise')
      .select('*')
      .eq('artist_id', artist.id)
      .eq('is_active', true)

    // Increment page view
    await supabase
      .from('artists')
      .update({ page_views: artist.page_views + 1 })
      .eq('id', artist.id)

    return NextResponse.json({
      ...artist,
      links: links || [],
      events: eventsWithActiveTickets || [],
      merchandise: merchandise || []
    })
  } catch (error: any) {
    console.error('Artist fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch artist' },
      { status: 500 }
    )
  }
}
