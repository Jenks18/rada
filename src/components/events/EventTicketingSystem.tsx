'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  Download,
  QrCode,
  Check,
  X,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  Clock
} from 'lucide-react';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sold: number;
  color: string;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  venue: string;
  location: string;
  totalCapacity: number;
  ticketsSold: number;
  revenue: number;
  status: 'upcoming' | 'ongoing' | 'past';
  tiers: TicketTier[];
}

interface GuestlistEntry {
  id: string;
  name: string;
  phoneNumber: string;
  ticketTier: string;
  ticketCode: string;
  checkedIn: boolean;
  checkedInAt?: Date;
  purchasedAt: Date;
}

export function EventTicketingSystem() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Mock event data
  const mockEvent: Event = {
    id: '1',
    title: 'Nviiri The Storyteller Live in Concert',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    venue: 'The Alchemist',
    location: 'Westlands, Nairobi',
    totalCapacity: 500,
    ticketsSold: 420,
    revenue: 585000,
    status: 'upcoming',
    tiers: [
      { id: '1', name: 'Early Bird', price: 1000, quantity: 100, sold: 100, color: 'green' },
      { id: '2', name: 'Regular', price: 1500, quantity: 300, sold: 250, color: 'blue' },
      { id: '3', name: 'VIP', price: 3000, quantity: 100, sold: 70, color: 'purple' },
    ],
  };

  const mockGuestlist: GuestlistEntry[] = [
    {
      id: '1',
      name: 'John Kamau',
      phoneNumber: '+254712345678',
      ticketTier: 'VIP',
      ticketCode: 'VIP-001-XYZ',
      checkedIn: true,
      checkedInAt: new Date(),
      purchasedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: 'Mary Wanjiku',
      phoneNumber: '+254723456789',
      ticketTier: 'Regular',
      ticketCode: 'REG-045-ABC',
      checkedIn: false,
      purchasedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      name: 'David Ochieng',
      phoneNumber: '+254734567890',
      ticketTier: 'VIP',
      ticketCode: 'VIP-023-DEF',
      checkedIn: true,
      checkedInAt: new Date(),
      purchasedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-KE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-KE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const selloutPercentage = (mockEvent.ticketsSold / mockEvent.totalCapacity) * 100;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'guestlist', label: 'Guestlist', icon: Users },
    { id: 'scanner', label: 'QR Scanner', icon: QrCode },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{mockEvent.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(mockEvent.date)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {mockEvent.venue}, {mockEvent.location}
            </span>
          </div>
        </div>
        <Badge variant="default" className="bg-green-500">
          {mockEvent.status.toUpperCase()}
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id}>
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Tickets Sold</span>
                <Ticket className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">
                {mockEvent.ticketsSold} / {mockEvent.totalCapacity}
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-3 h-3" />
                {selloutPercentage.toFixed(1)}% sold
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">
                {formatCurrency(mockEvent.revenue)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                From ticket sales
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Checked In</span>
                <Users className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">
                {mockGuestlist.filter(g => g.checkedIn).length}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {((mockGuestlist.filter(g => g.checkedIn).length / mockGuestlist.length) * 100).toFixed(0)}% attendance
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Avg Ticket Price</span>
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">
                {formatCurrency(mockEvent.revenue / mockEvent.ticketsSold)}
              </div>
            </Card>
          </div>

          {/* Progress Bar */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Ticket Sales Progress</h3>
              <span className="text-sm text-gray-600">
                {mockEvent.totalCapacity - mockEvent.ticketsSold} tickets remaining
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                style={{ width: `${selloutPercentage}%` }}
              />
            </div>
          </Card>

          {/* Ticket Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockEvent.tiers.map((tier) => {
              const tierSoldPercentage = (tier.sold / tier.quantity) * 100;
              const isSoldOut = tier.sold >= tier.quantity;
              
              return (
                <Card key={tier.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{tier.name}</h3>
                    {isSoldOut && (
                      <Badge variant="danger">Sold Out</Badge>
                    )}
                  </div>
                  
                  <div className="text-3xl font-bold text-purple-600 mb-4">
                    {formatCurrency(tier.price)}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sold</span>
                      <span className="font-semibold">
                        {tier.sold} / {tier.quantity}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          isSoldOut ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${tierSoldPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Revenue: {formatCurrency(tier.sold * tier.price)}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto py-4 flex-col">
                <Download className="w-6 h-6 mb-2" />
                <span className="text-sm">Export Sales</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col">
                <Users className="w-6 h-6 mb-2" />
                <span className="text-sm">View Guestlist</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col">
                <QrCode className="w-6 h-6 mb-2" />
                <span className="text-sm">Scan Tickets</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col">
                <Ticket className="w-6 h-6 mb-2" />
                <span className="text-sm">Add Comp Ticket</span>
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Guestlist Tab */}
      {activeTab === 'guestlist' && (
        <div className="space-y-6">
          {/* Search */}
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, phone, or ticket code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Guestlist */}
          <div className="space-y-3">
            {mockGuestlist.map((entry) => (
              <Card key={entry.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{entry.name}</h3>
                      <Badge 
                        variant={entry.ticketTier === 'VIP' ? 'primary' : 'default'}
                      >
                        {entry.ticketTier}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{entry.phoneNumber}</p>
                      <p className="font-mono text-xs">{entry.ticketCode}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    {entry.checkedIn ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <div className="text-sm">
                          <p className="font-semibold">Checked In</p>
                          {entry.checkedInAt && (
                            <p className="text-xs">
                              {formatTime(entry.checkedInAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                        Check In
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Scanner Tab */}
      {activeTab === 'scanner' && (
        <Card className="p-12">
          <div className="text-center">
            <QrCode className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold mb-2">QR Code Scanner</h3>
            <p className="text-gray-600 mb-6">
              Scan ticket QR codes to check in attendees
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600" size="lg">
              <QrCode className="w-5 h-5 mr-2" />
              Open Scanner
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Works offline for venues with spotty internet
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
