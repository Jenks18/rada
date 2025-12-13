'use client';

import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Crown, Phone, Mail, MessageCircle, Send, Search, Download, Users, TrendingUp } from 'lucide-react';

interface Fan {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  avatar?: string;
  totalSpent: number;
  ticketsPurchased: number;
  isSuperfan: boolean;
  tags: string[];
  lastInteraction: string;
}

interface FanListProps {
  fans?: Fan[];
}

export function FanList({ fans = [] }: FanListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFans, setSelectedFans] = useState<Set<string>>(new Set());
  const [showBulkMessage, setShowBulkMessage] = useState(false);

  // Mock data for demo
  const mockFans: Fan[] = fans.length > 0 ? fans : [
    {
      id: '1',
      name: 'John Kamau',
      phoneNumber: '+254712345678',
      email: 'john@example.com',
      avatar: '/users/1.jpg',
      totalSpent: 15000,
      ticketsPurchased: 10,
      isSuperfan: true,
      tags: ['VIP', 'Early Adopter'],
      lastInteraction: '2024-12-08T10:00:00Z',
    },
    {
      id: '2',
      name: 'Mary Wanjiku',
      phoneNumber: '+254723456789',
      avatar: '/users/2.jpg',
      totalSpent: 8500,
      ticketsPurchased: 5,
      isSuperfan: true,
      tags: ['Loyal Fan'],
      lastInteraction: '2024-12-07T15:30:00Z',
    },
    {
      id: '3',
      name: 'David Ochieng',
      phoneNumber: '+254734567890',
      email: 'david@example.com',
      totalSpent: 3000,
      ticketsPurchased: 2,
      isSuperfan: false,
      tags: ['New Fan'],
      lastInteraction: '2024-12-06T09:20:00Z',
    },
    {
      id: '4',
      name: 'Jane Njeri',
      phoneNumber: '+254745678901',
      totalSpent: 12000,
      ticketsPurchased: 8,
      isSuperfan: true,
      tags: ['VIP', 'Merchandise'],
      lastInteraction: '2024-12-09T18:45:00Z',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace('+254', '0');
  };

  const tabs = [
    { id: 'all', label: `All Fans (${mockFans.length})`, icon: Users },
    { id: 'superfans', label: `Superfans (${mockFans.filter(f => f.isSuperfan).length})`, icon: Crown },
    { id: 'recent', label: 'Recent', icon: TrendingUp },
  ];

  const filteredFans = mockFans.filter((fan) => {
    const matchesSearch = searchQuery === '' || 
      fan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fan.phoneNumber.includes(searchQuery);
    
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'superfans' && fan.isSuperfan) ||
      activeTab === 'recent';

    return matchesSearch && matchesTab;
  });

  const toggleFanSelection = (fanId: string) => {
    const newSelected = new Set(selectedFans);
    if (newSelected.has(fanId)) {
      newSelected.delete(fanId);
    } else {
      newSelected.add(fanId);
    }
    setSelectedFans(newSelected);
  };

  const selectAllSuperfans = () => {
    const superfanIds = mockFans.filter(f => f.isSuperfan).map(f => f.id);
    setSelectedFans(new Set(superfanIds));
  };

  const totalSpent = mockFans.reduce((sum, fan) => sum + fan.totalSpent, 0);
  const superfanCount = mockFans.filter(f => f.isSuperfan).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Fans</span>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold">{mockFans.length}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Superfans</span>
            <Crown className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold">{superfanCount}</div>
          <div className="text-sm text-gray-500 mt-1">
            {((superfanCount / mockFans.length) * 100).toFixed(1)}% of total
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Revenue</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold">{formatCurrency(totalSpent)}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg Spend/Fan</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold">
            {formatCurrency(totalSpent / mockFans.length)}
          </div>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search fans by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" onClick={selectAllSuperfans}>
              <Crown className="w-4 h-4 mr-2" />
              Select Superfans
            </Button>
            <Button 
              variant="default"
              className="bg-green-500 hover:bg-green-600"
              disabled={selectedFans.size === 0}
              onClick={() => setShowBulkMessage(true)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message ({selectedFans.size})
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

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

      {/* Fan List */}
      <div className="space-y-3">
        {filteredFans.map((fan) => (
          <Card 
            key={fan.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedFans.has(fan.id) ? 'border-2 border-purple-500 bg-purple-50' : ''
            }`}
            onClick={() => toggleFanSelection(fan.id)}
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={fan.avatar} alt={fan.name} />
                <AvatarFallback>{fan.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold truncate">{fan.name}</p>
                  {fan.isSuperfan && (
                    <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {formatPhoneNumber(fan.phoneNumber)}
                  </span>
                  {fan.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {fan.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-purple-600">{formatCurrency(fan.totalSpent)}</p>
                <p className="text-xs text-gray-500">{fan.ticketsPurchased} tickets</p>
              </div>

              {fan.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {fan.tags.slice(0, 2).map((tag, i) => (
                    <Badge key={i} variant="default" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {fan.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{fan.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredFans.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No fans found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Bulk Message Modal */}
      {showBulkMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Send Bulk Message</h2>
            <p className="text-gray-600 mb-4">
              Sending to {selectedFans.size} selected fans
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Message Type</label>
                <Tabs defaultValue="whatsapp">
                  <TabsList>
                    <TabsTrigger value="sms">SMS</TabsTrigger>
                    <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <textarea
                  className="w-full border rounded-lg p-3 min-h-[120px]"
                  placeholder="Early bird tickets for my Alchemist show drop in 1 hour! Get yours before they sell out 🔥"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowBulkMessage(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                onClick={() => {
                  // Handle send
                  setShowBulkMessage(false);
                  setSelectedFans(new Set());
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
