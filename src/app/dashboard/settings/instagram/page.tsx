'use client'

import { useEffect, useState } from 'react'
import { Instagram, Link2, Unlink, Zap, ZapOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSearchParams } from 'next/navigation'

interface InstagramConnection {
  ig_username: string
  auto_reply_enabled: boolean
  token_expires_at: string
  created_at: string
}

export default function InstagramSettingsPage() {
  const searchParams = useSearchParams()
  const [connection, setConnection] = useState<InstagramConnection | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    if (searchParams.get('connected') === '1') {
      setBanner({ type: 'success', message: 'Instagram connected successfully!' })
    } else if (searchParams.get('error')) {
      const err = searchParams.get('error')!.replace(/_/g, ' ')
      setBanner({ type: 'error', message: `Connection failed: ${err}` })
    }
  }, [searchParams])

  useEffect(() => {
    fetchStatus()
  }, [])

  async function fetchStatus() {
    setLoading(true)
    const res = await fetch('/api/instagram/status')
    const data = await res.json()
    setConnection(data.connection)
    setLoading(false)
  }

  async function handleDisconnect() {
    if (!confirm('Disconnect your Instagram account? Auto-replies will stop.')) return
    setSaving(true)
    await fetch('/api/instagram/status', { method: 'DELETE' })
    setConnection(null)
    setBanner({ type: 'success', message: 'Instagram disconnected.' })
    setSaving(false)
  }

  async function toggleAutoReply() {
    if (!connection) return
    setSaving(true)
    const res = await fetch('/api/instagram/status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auto_reply_enabled: !connection.auto_reply_enabled }),
    })
    if (res.ok) {
      setConnection({ ...connection, auto_reply_enabled: !connection.auto_reply_enabled })
    }
    setSaving(false)
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Instagram className="w-6 h-6" />
          Instagram Story DMs
        </h1>
        <p className="text-muted-foreground mt-1">
          Automatically reply to fans who respond to your Instagram Stories using AI.
        </p>
      </div>

      {banner && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            banner.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {banner.message}
        </div>
      )}

      {loading ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">Loading…</CardContent>
        </Card>
      ) : connection ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Connected Account</CardTitle>
                <Badge variant="default" className="bg-green-600">Active</Badge>
              </div>
              <CardDescription>
                @{connection.ig_username} · Connected{' '}
                {new Date(connection.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAutoReply}
                disabled={saving}
                className="flex items-center gap-2"
              >
                {connection.auto_reply_enabled ? (
                  <>
                    <ZapOff className="w-4 h-4" />
                    Disable Auto-Reply
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Enable Auto-Reply
                  </>
                )}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDisconnect}
                disabled={saving}
                className="flex items-center gap-2"
              >
                <Unlink className="w-4 h-4" />
                Disconnect
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Auto-Reply Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    connection.auto_reply_enabled ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                  }`}
                />
                <span className="text-sm">
                  {connection.auto_reply_enabled
                    ? 'Listening for story replies — Gemini AI will respond automatically.'
                    : 'Auto-reply is paused. Story replies will not receive a response.'}
                </span>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Connect Instagram</CardTitle>
            <CardDescription>
              Grant access to your Instagram Business or Creator account. When someone replies to
              your Story, our AI will send them a smart, personal message automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="flex items-center gap-2 w-fit">
              <a href="/api/instagram/connect">
                <Link2 className="w-4 h-4" />
                Connect Instagram Account
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Requires an Instagram Professional (Business or Creator) account.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">How it works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>1. A fan replies to one of your Instagram Stories.</p>
          <p>2. Instagram sends that message to Rada via a secure webhook.</p>
          <p>3. Gemini AI crafts a warm, personal reply matching the fan's energy.</p>
          <p>4. The reply is sent back to the fan's DM — instantly, automatically.</p>
        </CardContent>
      </Card>
    </div>
  )
}
