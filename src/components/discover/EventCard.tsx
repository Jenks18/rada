'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';
import { useState } from 'react';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    artist: {
      name: string;
      image: string;
      verified: boolean;
    };
    date: Date;
    venue: string;
    location: string;
    price: number;
    currency: string;
    ticketsSold: number;
    totalTickets: number;
    image: string;
    attendees: Array<{
      name: string;
      image: string;
    }>;
    category: string;
  };
  onPurchase?: (eventId: string) => void;
}

export function EventCard({ event, onPurchase }: EventCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const soldOutPercentage = (event.ticketsSold / event.totalTickets) * 100;
  const isAlmostSoldOut = soldOutPercentage > 80;
  const isSoldOut = soldOutPercentage >= 100;

  const handlePurchase = async () => {
    if (isSoldOut) return;
    setIsLoading(true);
    try {
      await onPurchase?.(event.id);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: event.currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffDays = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return eventDate.toLocaleDateString('en-KE', { 
      month: 'short', 
      day: 'numeric',
      year: eventDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Ticket className="w-16 h-16 text-white/30" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="default" className="bg-black/60 text-white border-0">
            {event.category}
          </Badge>
        </div>

        {/* Almost Sold Out Badge */}
        {isAlmostSoldOut && !isSoldOut && (
          <div className="absolute top-3 right-3">
            <Badge variant="danger" className="animate-pulse">
              🔥 Almost Sold Out
            </Badge>
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="danger" className="text-lg px-4 py-2">
              SOLD OUT
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Artist Info */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={event.artist.image} alt={event.artist.name} />
            <AvatarFallback>{event.artist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm truncate">{event.artist.name}</span>
              {event.artist.verified && (
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Event Title */}
        <h3 className="font-bold text-lg mb-3 line-clamp-2">{event.title}</h3>

        {/* Event Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.venue}, {event.location}</span>
          </div>
        </div>

        {/* Social Proof - Attendees */}
        {event.attendees.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {event.attendees.slice(0, 3).map((attendee, i) => (
                <Avatar key={i} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={attendee.image} alt={attendee.name} />
                  <AvatarFallback>{attendee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {event.attendees[0]?.name}
              {event.attendees.length > 1 && ` +${event.attendees.length - 1} going`}
            </span>
          </div>
        )}

        {/* Ticket Stats */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {event.ticketsSold} / {event.totalTickets} sold
            </span>
            <span>{soldOutPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                isAlmostSoldOut ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(soldOutPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-2xl font-bold">{formatPrice(event.price)}</div>
            <div className="text-xs text-gray-500">per ticket</div>
          </div>
          <Button 
            onClick={handlePurchase}
            disabled={isSoldOut || isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Processing...
              </span>
            ) : isSoldOut ? (
              'Sold Out'
            ) : (
              'Buy with M-Pesa'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
