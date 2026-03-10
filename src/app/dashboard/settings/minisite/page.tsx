'use client'

import { useState, useEffect } from 'react'
import { useMiniSite } from '@/contexts/MiniSiteContext'
import { Check, X, Loader2, AlertCircle, ExternalLink } from 'lucide-react'

export default function MiniSiteSettingsPage() {
  const { username: contextUsername, isPublished, setUsername, setIsPublished } = useMiniSite()

  const [username, setUsernameLocal] = useState('')
  const [talentName, setTalentName] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [profileStatus, setProfileStatus] = useState<'Offline' | 'Online'>('Offline')

  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [usernameError, setUsernameError] = useState<string | null>(null)

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const [isTogglingPublish, setIsTogglingPublish] = useState(false)

  // Load the profile on mount
  useEffect(() => {
    fetch('/api/minisite/profile')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.profile) {
          setUsernameLocal(data.profile.username ?? '')
          setTalentName(data.profile.talent_name ?? '')
          setCurrency(data.profile.currency ?? 'USD')
          setProfileStatus(data.profile.is_published ? 'Online' : 'Offline')
        }
      })
      .catch(() => null)
  }, [])

  // Debounced username availability check
  useEffect(() => {
    if (!username || username === contextUsername) {
      setUsernameAvailable(null)
      setUsernameError(null)
      return
    }

    const timer = setTimeout(async () => {
      setIsCheckingUsername(true)
      try {
        const res = await fetch(`/api/minisite/username-check?username=${encodeURIComponent(username)}`)
        const data = await res.json()
        if (data.available === false) {
          setUsernameAvailable(false)
          setUsernameError(data.reason === 'reserved' ? 'Username is reserved' : 'Username is taken')
        } else {
          setUsernameAvailable(true)
          setUsernameError(null)
        }
      } catch {
        setUsernameError('Check failed')
      } finally {
        setIsCheckingUsername(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [username, contextUsername])

  const handleSave = async () => {
    if (!username) {
      setSaveError('Username is required')
      return
    }

    setIsSaving(true)
    setSaveSuccess(false)
    setSaveError(null)

    try {
      const res = await fetch('/api/minisite/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, talent_name: talentName, currency }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSaveError(data.error ?? 'Save failed')
      } else {
        setSaveSuccess(true)
        setUsername(data.profile.username)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch {
      setSaveError('Network error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleTogglePublish = async () => {
    const newStatus = profileStatus === 'Offline' ? 'Online' : 'Offline'
    setIsTogglingPublish(true)

    try {
      if (newStatus === 'Online') {
        // Attempt to publish
        const res = await fetch('/api/minisite/publish', { method: 'POST', body: JSON.stringify({}) })
        if (res.ok) {
          setProfileStatus('Online')
          setIsPublished(true)
        } else {
          const data = await res.json()
          alert(data.error ?? 'Publish failed')
        }
      } else {
        // Unpublish
        const res = await fetch('/api/minisite/publish', { method: 'DELETE' })
        if (res.ok) {
          setProfileStatus('Offline')
          setIsPublished(false)
        }
      }
    } catch {
      alert('Network error')
    } finally {
      setIsTogglingPublish(false)
    }
  }

  const publicUrl = contextUsername ? `https://${contextUsername}.rada.bio` : null

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

        {/* Profile Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Profile Details</h2>
            <button
              onClick={() => {
                setUsernameLocal(contextUsername ?? '')
                setTalentName('')
                setCurrency('USD')
                setSaveSuccess(false)
                setSaveError(null)
              }}
              className="text-blue-500 text-sm hover:underline"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsernameLocal(e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, ''))}
                  placeholder="jio"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 pr-10"
                />
                {isCheckingUsername && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  </div>
                )}
                {!isCheckingUsername && usernameAvailable === true && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Check size={18} className="text-green-500" />
                  </div>
                )}
                {!isCheckingUsername && usernameAvailable === false && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X size={18} className="text-red-500" />
                  </div>
                )}
              </div>
              {usernameError && (
                <p className="text-sm text-red-500 mt-1">{usernameError}</p>
              )}
              {publicUrl && (
                <p className="text-sm text-gray-500 mt-1">
                  Your site: <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{publicUrl}</a>
                </p>
              )}
            </div>

            {/* Talent Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Talent Name</label>
              <input
                type="text"
                value={talentName}
                onChange={(e) => setTalentName(e.target.value)}
                placeholder="jkh"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            {/* Save / Cancel buttons */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  setUsernameLocal(contextUsername ?? '')
                  setSaveSuccess(false)
                  setSaveError(null)
                }}
                disabled={isSaving}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !username || usernameAvailable === false}
                className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving && <Loader2 size={16} className="animate-spin" />}
                {saveSuccess && <Check size={16} />}
                {saveSuccess ? 'SAVED' : 'SAVE'}
              </button>
            </div>
            {saveError && (
              <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
                <AlertCircle size={14} />
                <span>{saveError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Currency */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Currency</h2>
              <p className="text-sm text-gray-600 mt-1">
                $ - {currency} - {currency === 'USD' ? 'US dollars' : currency === 'KES' ? 'Kenyan Shillings' : 'Euro'}
              </p>
              <div className="flex items-start gap-2 mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <p>
                  Please note that your account currency does not apply when you manually set currency for individual products or add local pages.
                </p>
              </div>
            </div>
            <button className="text-blue-500 text-sm hover:underline">Edit</button>
          </div>
        </div>

        {/* Profile Status */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Profile Status</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePublish}
                disabled={isTogglingPublish || !username}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  profileStatus === 'Offline'
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-white text-gray-600 border border-gray-300'
                } ${isTogglingPublish ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isTogglingPublish && profileStatus === 'Offline' ? 'Loading...' : 'Offline'}
              </button>
              <button
                onClick={handleTogglePublish}
                disabled={isTogglingPublish || !username}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  profileStatus === 'Online'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-300'
                } ${isTogglingPublish ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isTogglingPublish && profileStatus === 'Online' ? 'Loading...' : 'Online'}
              </button>
            </div>
          </div>
          {!username && (
            <p className="text-sm text-amber-600 mt-3">Set a username above before publishing your site.</p>
          )}
        </div>
      </div>
    </div>
  )
}
