'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { 
  Music2, 
  Youtube, 
  Instagram, 
  Twitter,
  Globe,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
  Calendar,
  MapPin,
  Star,
  Play,
  Download
} from 'lucide-react';

interface ArtistLandingPageProps {
  artist: {
    name: string;
    stageName: string;
    bio: string;
    avatar: string;
    coverImage: string;
    verified: boolean;
    whatsapp: string;
    skizaTune?: {
      code: string;
      shortCode: string;
    };
  };
  musicLinks?: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  merchandise?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  }>;
  upcomingEvents?: Array<{
    id: string;
    title: string;
    date: Date;
    venue: string;
    price: number;
  }>;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
}

export function ArtistLandingPage({ artist, musicLinks = [], merchandise = [], upcomingEvents = [], socialLinks = {} }: ArtistLandingPageProps) {
  const defaultMusicLinks = musicLinks.length > 0 ? musicLinks : [
    { platform: 'Spotify', url: 'https://spotify.com', icon: '🎵' },
    { platform: 'Apple Music', url: 'https://music.apple.com', icon: '🎵' },
    { platform: 'YouTube Music', url: 'https://music.youtube.com', icon: '▶️' },
    { platform: 'Boomplay', url: 'https://boomplay.com', icon: '🎶' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent(`Hi ${artist.name}, I'd like to inquire about booking you for an event.`);
    window.open(`https://wa.me/${artist.whatsapp}?text=${message}`, '_blank');
  };

  const handleSkizaSubscribe = () => {
    if (artist.skizaTune) {
      window.open(`tel:${artist.skizaTune.shortCode}`, '_self');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
        {artist.coverImage && (
          <img 
            src={artist.coverImage} 
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
          {/* Avatar */}
          <div className="relative">
            <Avatar 
              src={artist.avatar} 
              alt={artist.name} 
              size="xl"
              className="border-4 border-white shadow-xl"
            />
            {artist.verified && (
              <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1.5">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            )}
          </div>

          {/* Name & Bio */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{artist.stageName}</h1>
            <p className="text-gray-600 mb-4">{artist.bio}</p>
            
            {/* Social Links */}
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Instagram className="w-4 h-4" />
                  </Button>
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Youtube className="w-4 h-4" />
                  </Button>
                </a>
              )}
              {socialLinks.website && (
                <a href={socialLinks.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Globe className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleWhatsAppBooking}
              className="bg-green-500 hover:bg-green-600"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Bookings
            </Button>
          </div>
        </div>

        {/* Skiza Tune Banner */}
        {artist.skizaTune && (
          <Card className="p-4 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-600 rounded-full">
                  <Music2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Set as Skiza Tune</h3>
                  <p className="text-sm text-gray-600">
                    Dial {artist.skizaTune.shortCode} or SMS <span className="font-mono font-bold">{artist.skizaTune.code}</span> to 811
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleSkizaSubscribe}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Subscribe
              </Button>
            </div>
          </Card>
        )}

        {/* Music Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">🎵 Listen Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {defaultMusicLinks.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{link.icon}</span>
                      <span className="font-semibold">{link.platform}</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">📅 Upcoming Shows</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="p-4 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date.toLocaleDateString('en-KE', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.venue}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-2">From</p>
                      <p className="text-xl font-bold text-purple-600">
                        {formatPrice(event.price)}
                      </p>
                      <Button size="sm" className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600">
                        Get Tickets
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Merchandise */}
        {merchandise.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">🛍️ Merchandise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {merchandise.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative aspect-square bg-gray-100">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 truncate">{item.name}</h3>
                    <p className="text-purple-600 font-bold mb-2">{formatPrice(item.price)}</p>
                    <Button 
                      size="sm" 
                      className="w-full" 
                      disabled={!item.inStock}
                    >
                      {item.inStock ? 'Buy Now' : 'Sold Out'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-gray-600 mb-2">
            Powered by <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Rada</span>
          </p>
          <p className="text-sm text-gray-500">
            The Operating System for Kenyan Artists
          </p>
        </div>
      </div>
    </div>
  );
}
