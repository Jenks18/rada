import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/artists/[slug]
 * Get artist profile by slug (for public landing page)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const artist = await prisma.artist.findUnique({
      where: { slug: params.slug },
      include: {
        links: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        events: {
          where: {
            isPublished: true,
            startDate: {
              gte: new Date(),
            },
          },
          include: {
            ticketTypes: {
              where: { isActive: true },
            },
          },
          orderBy: {
            startDate: 'asc',
          },
        },
        merchandise: {
          where: { isActive: true },
        },
      },
    })

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
    }

    // Increment page view
    await prisma.artist.update({
      where: { id: artist.id },
      data: {
        pageViews: {
          increment: 1,
        },
      },
    })

    // Track page view (with IP and user agent if needed)
    await prisma.pageView.create({
      data: {
        artistId: artist.id,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
      },
    })

    return NextResponse.json(artist)
  } catch (error: any) {
    console.error('Artist fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch artist' },
      { status: 500 }
    )
  }
}
