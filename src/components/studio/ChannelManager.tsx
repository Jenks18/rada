'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Music2, 
  Youtube, 
  Instagram, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart,
  Share2,
  Download,
  ExternalLink,
  Play,
  MessageCircle
} from 'lucide-react';
import { useState } from 'react';

interface PlatformStats {
  platform: 'spotify' | 'apple-music' | 'youtube' | 'tiktok' | 'instagram';
  followers: number;
  monthlyListeners?: number;
  views?: number;
  engagement: number;
  growth: number;
  topContent: Array<{
    title: string;
    plays: number;
    thumbnail?: string;
  }>;
}

interface TrendingSound {
  id: string;
  trackName: string;
  artist: string;
  platform: string;
  usageCount: number;
  growth: number;
  topCreators: Array<{
    username: string;
    followers: number;
    videoUrl: string;
  }>;
}

export function ChannelManager() {
  const [activeTab, setActiveTab] = useState('overview');

  const platformStats: PlatformStats[] = [
    {
      platform: 'spotify',
      followers: 125000,
      monthlyListeners: 450000,
      engagement: 85,
      growth: 12.5,
      topContent: [
        { title: 'Pombe Sigara', plays: 2500000 },
        { title: 'Overdose', plays: 1800000 },
        { title: 'Niko Sawa', plays: 1200000 },
      ],
    },
    {
      platform: 'apple-music',
      followers: 85000,
      monthlyListeners: 320000,
      engagement: 78,
      growth: 8.3,
      topContent: [
        { title: 'Pombe Sigara', plays: 1800000 },
        { title: 'Overdose', plays: 1200000 },
      ],
    },
    {
      platform: 'youtube',
      followers: 250000,
      views: 15000000,
      engagement: 92,
      growth: 18.7,
      topContent: [
        { title: 'Pombe Sigara (Official Video)', plays: 5200000 },
        { title: 'Overdose (Official Audio)', plays: 3100000 },
      ],
    },
    {
      platform: 'tiktok',
      followers: 180000,
      views: 25000000,
      engagement: 95,
      growth: 35.2,
      topContent: [
        { title: 'Pombe Sigara Sound', plays: 12000000 },
      ],
    },
    {
      platform: 'instagram',
      followers: 320000,
      engagement: 88,
      growth: 15.4,
      topContent: [
        { title: 'Latest Reel', plays: 850000 },
        { title: 'Story Highlights', plays: 620000 },
      ],
    },
  ];

  const trendingSounds: TrendingSound[] = [
    {
      id: '1',
      trackName: 'Pombe Sigara',
      artist: 'Nviiri The Storyteller',
      platform: 'TikTok',
      usageCount: 12500,
      growth: 145,
      topCreators: [
        { username: '@wakadinali_fans', followers: 450000, videoUrl: '' },
        { username: '@nairobi_vibes', followers: 280000, videoUrl: '' },
        { username: '@ke_comedy', followers: 180000, videoUrl: '' },
      ],
    },
    {
      id: '2',
      trackName: 'Overdose',
      artist: 'Nviiri The Storyteller',
      platform: 'Instagram Reels',
      usageCount: 8200,
      growth: 89,
      topCreators: [
        { username: '@kenyan_dancers', followers: 320000, videoUrl: '' },
        { username: '@nairobi_nights', followers: 210000, videoUrl: '' },
      ],
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'platforms', label: 'Platforms', icon: Music2 },
    { id: 'trending', label: 'Trend Radar', icon: TrendingUp },
    { id: 'pre-save', label: 'Pre-Save Campaigns', icon: Heart },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'spotify':
        return <Music2 className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'tiktok':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <Music2 className="w-5 h-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'spotify':
        return 'from-green-500 to-green-600';
      case 'apple-music':
        return 'from-pink-500 to-rose-600';
      case 'youtube':
        return 'from-red-500 to-red-600';
      case 'tiktok':
        return 'from-black to-gray-800';
      case 'instagram':
        return 'from-purple-500 via-pink-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Channel Manager</h1>
          <p className="text-gray-600 mt-1">
            Unified analytics across all your streaming platforms
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Download className="w-4 h-4 mr-2" />
          Export EPK
        </Button>
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
          {/* Total Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Followers</span>
                <Users className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">
                {formatNumber(platformStats.reduce((acc, p) => acc + p.followers, 0))}
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-3 h-3" />
                +15.2% this month
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Monthly Streams</span>
                <Play className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">
                {formatNumber(770000)}
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-3 h-3" />
                +10.5% this month
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Video Views</span>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">
                {formatNumber(40000000)}
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-3 h-3" />
                +22.8% this month
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Avg Engagement</span>
                <Heart className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">87.6%</div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-3 h-3" />
                +3.2% this month
              </div>
            </Card>
          </div>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformStats.map((stat) => (
              <Card key={stat.platform} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${getPlatformColor(stat.platform)}`}>
                    <div className="text-white">{getPlatformIcon(stat.platform)}</div>
                  </div>
                  <Badge variant={stat.growth > 0 ? 'success' : 'default'}>
                    {stat.growth > 0 ? '+' : ''}{stat.growth.toFixed(1)}%
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold capitalize mb-4">
                  {stat.platform.replace('-', ' ')}
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Followers</span>
                    <span className="font-semibold">{formatNumber(stat.followers)}</span>
                  </div>
                  
                  {stat.monthlyListeners && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Monthly Listeners</span>
                      <span className="font-semibold">{formatNumber(stat.monthlyListeners)}</span>
                    </div>
                  )}
                  
                  {stat.views && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Views</span>
                      <span className="font-semibold">{formatNumber(stat.views)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Engagement</span>
                    <span className="font-semibold">{stat.engagement}%</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Platform
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Trend Radar Tab */}
      {activeTab === 'trending' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Trend Radar</h2>
                <p className="text-gray-600 mt-1">
                  Track your music usage across TikTok and Instagram Reels
                </p>
              </div>
              <Badge variant="default" className="bg-gradient-to-r from-purple-600 to-pink-600">
                Live
              </Badge>
            </div>

            <div className="space-y-4">
              {trendingSounds.map((sound) => (
                <Card key={sound.id} className="p-6 border-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{sound.trackName}</h3>
                      <p className="text-gray-600 text-sm">{sound.artist}</p>
                    </div>
                    <Badge variant="default" className="bg-green-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{sound.growth}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">Platform</span>
                      <p className="font-semibold">{sound.platform}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Total Uses</span>
                      <p className="font-semibold">{formatNumber(sound.usageCount)}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 text-sm">Top Creators Using Your Sound</h4>
                    <div className="space-y-2">
                      {sound.topCreators.map((creator, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{creator.username}</p>
                            <p className="text-xs text-gray-600">
                              {formatNumber(creator.followers)} followers
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      <Share2 className="w-4 h-4 mr-2" />
                      Reach Out for Collab
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Pre-Save Campaigns Tab */}
      {activeTab === 'pre-save' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Pre-Save Campaigns</h2>
                <p className="text-gray-600 mt-1">
                  Launch campaigns to build hype before your release
                </p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>

            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No active campaigns
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first pre-save campaign to build anticipation for your next release
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                Get Started
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
