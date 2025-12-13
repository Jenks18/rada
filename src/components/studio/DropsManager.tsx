'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Upload,
  Download,
  Check,
  X,
  Star,
  Eye,
  Video,
  Image as ImageIcon,
  Music,
  Link as LinkIcon,
  Filter,
  Copy,
  ExternalLink,
  Share2
} from 'lucide-react';

interface Submission {
  id: string
  user: {
    name: string
    phoneNumber: string
    avatar?: string
  }
  contentType: 'video' | 'audio' | 'image' | 'link'
  contentUrl: string
  thumbnail?: string
  caption?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FEATURED'
  views: number
  votes: number
  createdAt: string
}

interface Drop {
  id: string
  title: string
  description?: string
  totalSubmissions: number
  pendingSubmissions: number
  isActive: boolean
}

interface DropsManagerProps {
  drop?: Drop;
  submissions?: Submission[];
}

export function DropsManager({ drop, submissions: initialSubmissions = [] }: DropsManagerProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Mock data for demo
  const mockDrop: Drop = drop || {
    id: '1',
    title: 'Pombe Sigara Challenge',
    description: 'Show us your best dance moves to Pombe Sigara! Winner gets VIP tickets to my next show.',
    totalSubmissions: 156,
    pendingSubmissions: 23,
    isActive: true,
  };

  const dropLink = `https://rada.to/nviiri/${mockDrop.title.toLowerCase().replace(/\s+/g, '-')}`;

  const copyDropLink = () => {
    navigator.clipboard.writeText(dropLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatRelativeTime = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'all') return true
    if (filter === 'pending') return sub.status === 'PENDING'
    if (filter === 'approved') return sub.status === 'APPROVED' || sub.status === 'FEATURED'
    if (filter === 'rejected') return sub.status === 'REJECTED'
    return true
  })

  const handleApprove = (submissionId: string) => {
    setSubmissions(prev => prev.map(sub =>
      sub.id === submissionId ? { ...sub, status: 'APPROVED' as const } : sub
    ))
  }

  const handleReject = (submissionId: string) => {
    setSubmissions(prev => prev.map(sub =>
      sub.id === submissionId ? { ...sub, status: 'REJECTED' as const } : sub
    ))
  }

  const handleFeature = (submissionId: string) => {
    setSubmissions(prev => prev.map(sub =>
      sub.id === submissionId ? { ...sub, status: 'FEATURED' as const } : sub
    ))
  }

  return (
    <div className="space-y-6">
      {/* Drop Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{mockDrop.title}</h2>
            {mockDrop.description && (
              <p className="text-gray-600">{mockDrop.description}</p>
            )}
          </div>
          <Badge variant={mockDrop.isActive ? 'success' : 'default'}>
            {mockDrop.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {/* Drop Link */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium mb-2">Submission Link</p>
          <div className="flex gap-2">
            <Input value={dropLink} readOnly className="flex-1 font-mono text-sm" />
            <Button onClick={copyDropLink} variant="outline">
              {copiedLink ? (
                <><Check className="w-4 h-4 mr-2" /> Copied</>
              ) : (
                <><Copy className="w-4 h-4 mr-2" /> Copy</>
              )}
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-purple-50 border border-purple-200">
            <p className="text-3xl font-bold text-purple-600 mb-1">{mockDrop.totalSubmissions}</p>
            <p className="text-sm text-gray-600">Total Submissions</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-yellow-50 border border-yellow-200">
            <p className="text-3xl font-bold text-yellow-600 mb-1">{mockDrop.pendingSubmissions}</p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-3xl font-bold text-green-600 mb-1">
              {submissions.filter(s => s.status === 'APPROVED' || s.status === 'FEATURED').length}
            </p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <Tabs value={filter} onValueChange={(val) => setFilter(val as any)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending ({submissions.filter(s => s.status === 'PENDING').length})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Submissions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubmissions.map((submission, i) => (
          <SubmissionCard
            key={submission.id}
            submission={submission}
            onApprove={() => handleApprove(submission.id)}
            onReject={() => handleReject(submission.id)}
            onFeature={() => handleFeature(submission.id)}
            index={i}
            formatRelativeTime={formatRelativeTime}
          />
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-20">
          <Upload className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No submissions yet</h3>
          <p className="text-gray-500 mb-4">
            Share your drop link to start receiving submissions
          </p>
          <Button onClick={copyDropLink} className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Copy className="w-4 h-4 mr-2" />
            Copy Submission Link
          </Button>
        </div>
      )}
    </div>
  );
}

interface SubmissionCardProps {
  submission: Submission;
  onApprove: () => void;
  onReject: () => void;
  onFeature: () => void;
  index: number;
  formatRelativeTime: (date: string) => string;
}

function SubmissionCard({ submission, onApprove, onReject, onFeature, index, formatRelativeTime }: SubmissionCardProps) {
  const getContentIcon = () => {
    switch (submission.contentType) {
      case 'video': return <Video className="h-5 w-5" />
      case 'audio': return <Music className="h-5 w-5" />
      case 'image': return <ImageIcon className="h-5 w-5" />
      case 'link': return <LinkIcon className="h-5 w-5" />
    }
  }

  const getStatusBadge = () => {
    switch (submission.status) {
      case 'PENDING':
        return <Badge variant="warning">Pending</Badge>
      case 'APPROVED':
        return <Badge variant="success">Approved</Badge>
      case 'REJECTED':
        return <Badge variant="danger">Rejected</Badge>
      case 'FEATURED':
        return <Badge variant="primary" className="gap-1">
          <Star className="h-3 w-3" />
          Featured
        </Badge>
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Media Preview */}
      <div className="relative aspect-square bg-gradient-to-br from-purple-500 to-pink-500">
        {submission.thumbnail ? (
          <img
            src={submission.thumbnail}
            alt="Submission"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            {getContentIcon()}
          </div>
        )}
        <div className="absolute top-3 left-3">
          {getStatusBadge()}
        </div>
        <div className="absolute bottom-3 right-3 flex gap-2 text-white text-sm">
          <span className="bg-black/70 px-2 py-1 rounded-lg flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {submission.views}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={submission.user.avatar} alt={submission.user.name} />
            <AvatarFallback>{submission.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {submission.user.name}
            </p>
            <p className="text-xs text-gray-500">
              {formatRelativeTime(submission.createdAt)}
            </p>
          </div>
        </div>

        {/* Caption */}
        {submission.caption && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {submission.caption}
          </p>
        )}

        {/* Actions */}
        {submission.status === 'PENDING' && (
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1 gap-1 bg-green-600 hover:bg-green-700"
              onClick={onApprove}
            >
              <Check className="h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1 gap-1"
              onClick={onReject}
            >
              <X className="h-4 w-4" />
              Reject
            </Button>
          </div>
        )}

        {submission.status === 'APPROVED' && (
          <Button
            variant="default"
            size="sm"
            className="w-full gap-1 bg-gradient-to-r from-purple-600 to-pink-600"
            onClick={onFeature}
          >
            <Star className="h-4 w-4" />
            Feature This
          </Button>
        )}

        {submission.status === 'FEATURED' && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onApprove}
          >
            Unfeature
          </Button>
        )}

        {submission.status === 'REJECTED' && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onApprove}
          >
            Restore
          </Button>
        )}
      </div>
    </Card>
  );
}
