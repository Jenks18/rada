'use client';

import { useState } from 'react';
import { EventCard } from './EventCard';
import { LocationFilter } from './LocationFilter';
import { Tabs } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Calendar, TrendingUp, Users } from 'lucide-react';

interface DiscoveryFeedProps {
  events?: Array<any>;
  onPurchaseTicket?: (eventId: string) => void;
}

export function DiscoveryFeed({ events = [], onPurchaseTicket }: DiscoveryFeedProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for demo - replace with real data
  const mockEvents = events.length > 0 ? events : [
    {
      id: '1',
      title: 'Nviiri The Storyteller Live in Concert',
      artist: {
        name: 'Nviiri The Storyteller',
        image: '/artists/nviiri.jpg',
        verified: true,
      },
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      venue: 'The Alchemist',
      location: 'westlands',
      price: 1500,
      currency: 'KES',
      ticketsSold: 420,
      totalTickets: 500,
      image: '/events/nviiri-concert.jpg',
      attendees: [
        { name: 'John Kamau', image: '/users/1.jpg' },
        { name: 'Mary Wanjiku', image: '/users/2.jpg' },
        { name: 'David Ochieng', image: '/users/3.jpg' },
      ],
      category: 'Live Music',
    },
    {
      id: '2',
      title: 'Gengetone Night ft. Sailors',
      artist: {
        name: 'Sailors Gang',
        image: '/artists/sailors.jpg',
        verified: true,
      },
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      venue: 'Space Lounge',
      location: 'kilimani',
      price: 1000,
      currency: 'KES',
      ticketsSold: 280,
      totalTickets: 300,
      image: '/events/sailors.jpg',
      attendees: [
        { name: 'Jane Njeri', image: '/users/4.jpg' },
        { name: 'Mike Otieno', image: '/users/5.jpg' },
      ],
      category: 'Gengetone',
    },
    {
      id: '3',
      title: 'Afrobeats Friday with DJ Sadic',
      artist: {
        name: 'DJ Sadic',
        image: '/artists/sadic.jpg',
        verified: false,
      },
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      venue: 'B Club',
      location: 'cbd',
      price: 500,
      currency: 'KES',
      ticketsSold: 150,
      totalTickets: 200,
      image: '/events/afrobeats.jpg',
      attendees: [],
      category: 'DJ Set',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Events', icon: Calendar },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'following', label: 'Following', icon: Users },
  ];

  const filteredEvents = mockEvents.filter((event) => {
    const matchesLocation = !selectedLocation || event.location === selectedLocation;
    const matchesSearch = !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Discover Events
        </h1>
        <p className="text-gray-600">
          Find the hottest shows and events happening in Kenya 🇰🇪
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search for artists, events, or venues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs.map(tab => ({
          id: tab.id,
          label: tab.label,
          icon: tab.icon,
        }))}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Location Filter */}
      <LocationFilter
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPurchase={onPurchaseTicket}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later
            </p>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredEvents.length > 0 && (
        <div className="text-center pt-6">
          <button className="text-purple-600 hover:text-purple-700 font-semibold">
            Load more events →
          </button>
        </div>
      )}
    </div>
  );
}
