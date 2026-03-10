'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface SocialLink {
  id: string
  url: string
}

export interface Module {
  id: string
  type: string
  title: string
  data?: any
}

interface MiniSiteContextType {
  displayName: string
  setDisplayName: (name: string) => void
  showDisplayName: boolean
  setShowDisplayName: (show: boolean) => void
  displayMode: 'text' | 'logo'
  setDisplayMode: (mode: 'text' | 'logo') => void
  coverImage: string | null
  setCoverImage: (image: string | null) => void
  profileImage: string | null
  setProfileImage: (image: string | null) => void
  logoImage: string | null
  setLogoImage: (image: string | null) => void
  themeMode: 'light' | 'dark' | 'custom'
  setThemeMode: (mode: 'light' | 'dark' | 'custom') => void
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  textColor: string
  setTextColor: (color: string) => void
  overlayMode: 'lighten' | 'darken'
  setOverlayMode: (mode: 'lighten' | 'darken') => void
  socialLinks: SocialLink[]
  setSocialLinks: (links: SocialLink[]) => void
  modules: Module[]
  setModules: (modules: Module[]) => void
  addModule: (module: Module) => void
  removeModule: (id: string) => void
  isHydrated: boolean
  // Profile / publish
  username: string | null
  setUsername: (u: string | null) => void
  isPublished: boolean
  setIsPublished: (p: boolean) => void
  publishMiniSite: () => Promise<{ ok: boolean; url?: string; error?: string }>
  publishStatus: 'idle' | 'publishing' | 'published' | 'error'
}

const MiniSiteContext = createContext<MiniSiteContextType | undefined>(undefined)

export function MiniSiteProvider({ children }: { children: ReactNode }) {
  // Track hydration to prevent mismatch
  const [isHydrated, setIsHydrated] = useState(false)

  // Profile fields (loaded from the server profile API)
  const [username, setUsername] = useState<string | null>(null)
  const [isPublished, setIsPublished] = useState(false)
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'published' | 'error'>('idle')
  
  // Initialize with default values (no localStorage on first render)
  const [displayName, setDisplayName] = useState('usher')
  const [showDisplayName, setShowDisplayName] = useState(false)
  const [displayMode, setDisplayMode] = useState<'text' | 'logo'>('text')
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'custom'>('light')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [textColor, setTextColor] = useState('#121212')
  const [overlayMode, setOverlayMode] = useState<'lighten' | 'darken'>('darken')
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [modules, setModules] = useState<Module[]>([])
  
  // Load from localStorage after hydration; also fetch the server profile
  useEffect(() => {
    setDisplayName(localStorage.getItem('minisite_displayName') || 'usher')
    setShowDisplayName(localStorage.getItem('minisite_showDisplayName') === 'true')
    setDisplayMode((localStorage.getItem('minisite_displayMode') as 'text' | 'logo') || 'text')
    setCoverImage(localStorage.getItem('minisite_coverImage'))
    setProfileImage(localStorage.getItem('minisite_profileImage'))
    setLogoImage(localStorage.getItem('minisite_logoImage'))
    setThemeMode((localStorage.getItem('minisite_themeMode') as 'light' | 'dark' | 'custom') || 'light')
    setBackgroundColor(localStorage.getItem('minisite_backgroundColor') || '#FFFFFF')
    setTextColor(localStorage.getItem('minisite_textColor') || '#121212')
    setOverlayMode((localStorage.getItem('minisite_overlayMode') as 'lighten' | 'darken') || 'darken')
    try {
      const stored = localStorage.getItem('minisite_socialLinks')
      if (stored) setSocialLinks(JSON.parse(stored))
    } catch {}
    try {
      const storedModules = localStorage.getItem('minisite_modules')
      if (storedModules) setModules(JSON.parse(storedModules))
    } catch {}
    setIsHydrated(true)

    // Load the creator profile (username, published status)
    fetch('/api/minisite/profile')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.profile) {
          setUsername(data.profile.username ?? null)
          setIsPublished(data.profile.is_published ?? false)
        }
      })
      .catch(() => null)
  }, [])

  // Persist to localStorage whenever values change (only after hydration)
  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('minisite_displayName', displayName)
  }, [displayName, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('minisite_showDisplayName', showDisplayName.toString())
  }, [showDisplayName, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('minisite_displayMode', displayMode)
  }, [displayMode, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    if (coverImage) {
      localStorage.setItem('minisite_coverImage', coverImage)
    } else {
      localStorage.removeItem('minisite_coverImage')
    }
  }, [coverImage, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    if (profileImage) {
      localStorage.setItem('minisite_profileImage', profileImage)
    } else {
      localStorage.removeItem('minisite_profileImage')
    }
  }, [profileImage, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    if (logoImage) {
      localStorage.setItem('minisite_logoImage', logoImage)
    } else {
      localStorage.removeItem('minisite_logoImage')
    }
  }, [logoImage, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('minisite_backgroundColor', backgroundColor)
  }, [backgroundColor, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('minisite_textColor', textColor)
  }, [textColor, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('minisite_themeMode', themeMode)
  }, [themeMode, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('minisite_overlayMode', overlayMode)
  }, [overlayMode, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('minisite_socialLinks', JSON.stringify(socialLinks))
  }, [socialLinks, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('minisite_modules', JSON.stringify(modules))
  }, [modules, isHydrated])

  const addModule = (module: Module) => {
    setModules(prev => [...prev, module])
  }

  const removeModule = (id: string) => {
    setModules(prev => prev.filter(m => m.id !== id))
  }

  // Publish: snapshot the full editor state to Supabase
  const publishMiniSite = async (): Promise<{ ok: boolean; url?: string; error?: string }> => {
    setPublishStatus('publishing')
    try {
      const res = await fetch('/api/minisite/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName,
          showDisplayName,
          displayMode,
          coverImage,
          profileImage,
          logoImage,
          themeMode,
          backgroundColor,
          textColor,
          overlayMode,
          socialLinks,
          modules,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setPublishStatus('error')
        return { ok: false, error: data.error ?? 'Publish failed' }
      }
      setIsPublished(true)
      setPublishStatus('published')
      setTimeout(() => setPublishStatus('idle'), 3000)
      return { ok: true, url: data.url }
    } catch {
      setPublishStatus('error')
      return { ok: false, error: 'Network error' }
    }
  }

  return (
    <MiniSiteContext.Provider
      value={{
        displayName,
        setDisplayName,
        showDisplayName,
        setShowDisplayName,
        displayMode,
        setDisplayMode,
        coverImage,
        setCoverImage,
        profileImage,
        setProfileImage,
        logoImage,
        setLogoImage,
        themeMode,
        setThemeMode,
        backgroundColor,
        setBackgroundColor,
        textColor,
        setTextColor,
        overlayMode,
        setOverlayMode,
        socialLinks,
        setSocialLinks,
        modules,
        setModules,
        addModule,
        removeModule,
        isHydrated,
        username,
        setUsername,
        isPublished,
        setIsPublished,
        publishMiniSite,
        publishStatus,
      }}
    >
      {children}
    </MiniSiteContext.Provider>
  )
}

export function useMiniSite() {
  const context = useContext(MiniSiteContext)
  if (context === undefined) {
    throw new Error('useMiniSite must be used within a MiniSiteProvider')
  }
  return context
}
