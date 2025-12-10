'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Music, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  ExternalLink,
  Phone,
  Calendar,
  ShoppingBag
} from 'lucide-react'

interface Artist {
  id: string
  stageName: string
  slug: string
  bio: string
  genre: string[]
  location: string
  coverImage: string
  themeColor: string
  bookingWhatsApp: string
  instagram: string
  tiktok: string
  twitter: string
  spotify: string
  appleMusic: string
  youtube: string
  skizaTuneCode: string
  links: CustomLink[]
  events: Event[]
  merchandise: Merchandise[]
}

interface CustomLink {
  id: string
  title: string
  url: string
  icon: string
}

interface Event {
  id: string
  title: string
  slug: string
  coverImage: string
  venue: string
  city: string
  startDate: string
  ticketTypes: TicketType[]
}

interface TicketType {
  id: string
  name: string
  price: number
  sold: number
  quantity: number
}

interface Merchandise {
  id: string
  name: string
  price: number
  images: string[]
}

export default function ArtistPage() {
  const params = useParams()
  const slug = params.slug as string
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArtist() {
      try {
        const response = await fetch(`/api/artists/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setArtist(data)
        }
      } catch (error) {
        console.error('Failed to fetch artist:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtist()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
          <p className="text-gray-400">This page doesn't exist</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(to bottom, ${artist.themeColor}, #000000)`,
      }}
    >
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        {artist.coverImage && (
          <Image
            src={artist.coverImage}
            alt={artist.stageName}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{artist.stageName}</h1>
            {artist.location && (
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                {artist.location}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Bio */}
        {artist.bio && (
          <div className="mb-8">
            <p className="text-gray-300 text-center">{artist.bio}</p>
          </div>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {artist.instagram && (
            <a
              href={`https://instagram.com/${artist.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
            >
              <Instagram className="w-6 h-6" />
            </a>
          )}
          {artist.twitter && (
            <a
              href={`https://twitter.com/${artist.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
            >
              <Twitter className="w-6 h-6" />
            </a>
          )}
          {artist.youtube && (
            <a
              href={artist.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
            >
              <Youtube className="w-6 h-6" />
            </a>
          )}
          {artist.bookingWhatsApp && (
            <a
              href={`https://wa.me/${artist.bookingWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition"
            >
              <Phone className="w-5 h-5" />
              Book Me
            </a>
          )}
        </div>

        {/* Skiza Tune */}
        {artist.skizaTuneCode && (
          <div className="bg-white/5 rounded-xl p-6 mb-8 text-center border border-white/10">
            <Music className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Set as Skiza Tune</h3>
            <p className="text-gray-400 text-sm mb-3">
              Dial *811*{artist.skizaTuneCode}# or SMS Skiza to 811
            </p>
            <code className="bg-black/30 px-4 py-2 rounded text-lg">
              *811*{artist.skizaTuneCode}#
            </code>
          </div>
        )}

        {/* Custom Links */}
        {artist.links.length > 0 && (
          <div className="space-y-3 mb-8">
            {artist.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/10 hover:bg-white/20 rounded-xl p-4 transition touch-target"
                onClick={() => {
                  // Track link click
                  fetch('/api/analytics/click', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ linkId: link.id }),
                  })
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {link.icon && <span className="text-2xl">{link.icon}</span>}
                    <span className="font-semibold">{link.title}</span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Upcoming Events */}
        {artist.events.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {artist.events.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="block bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition"
                >
                  <div className="flex">
                    {event.coverImage && (
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={event.coverImage}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-1">
                      <h3 className="font-semibold mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {event.venue}, {event.city}
                      </p>
                      <p className="text-sm text-gray-300">
                        {new Date(event.startDate).toLocaleDateString('en-KE', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      {event.ticketTypes[0] && (
                        <p className="text-sm font-semibold mt-2">
                          From KES {event.ticketTypes[0].price.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Merchandise */}
        {artist.merchandise.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              Merch
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {artist.merchandise.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 rounded-xl overflow-hidden border border-white/10"
                >
                  {item.images[0] && (
                    <div className="relative aspect-square">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                    <p className="text-sm font-bold">
                      KES {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">Powered by Rada</p>
          <Link href="/signup" className="text-sm text-white/60 hover:text-white">
            Create your own page
          </Link>
        </div>
      </div>
    </div>
  )
}
