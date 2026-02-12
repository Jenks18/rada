'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface MiniSiteContextType {
  displayName: string
  setDisplayName: (name: string) => void
  showDisplayName: boolean
  setShowDisplayName: (show: boolean) => void
  coverImage: string | null
  setCoverImage: (image: string | null) => void
  profileImage: string | null
  setProfileImage: (image: string | null) => void
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  textColor: string
  setTextColor: (color: string) => void
  isHydrated: boolean
}

const MiniSiteContext = createContext<MiniSiteContextType | undefined>(undefined)

export function MiniSiteProvider({ children }: { children: ReactNode }) {
  // Track hydration to prevent mismatch
  const [isHydrated, setIsHydrated] = useState(false)
  
  // Initialize with default values (no localStorage on first render)
  const [displayName, setDisplayName] = useState('usher')
  const [showDisplayName, setShowDisplayName] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState('#121212')
  const [textColor, setTextColor] = useState('#ffffff')
  
  // Load from localStorage after hydration
  useEffect(() => {
    setDisplayName(localStorage.getItem('minisite_displayName') || 'usher')
    setShowDisplayName(localStorage.getItem('minisite_showDisplayName') === 'true')
    setCoverImage(localStorage.getItem('minisite_coverImage'))
    setProfileImage(localStorage.getItem('minisite_profileImage'))
    setBackgroundColor(localStorage.getItem('minisite_backgroundColor') || '#121212')
    setTextColor(localStorage.getItem('minisite_textColor') || '#ffffff')
    setIsHydrated(true)
  }, [])

  // Persist to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('minisite_displayName', displayName)
  }, [displayName])

  useEffect(() => {
    localStorage.setItem('minisite_showDisplayName', showDisplayName.toString())
  }, [showDisplayName])

  useEffect(() => {
    if (coverImage) {
      localStorage.setItem('minisite_coverImage', coverImage)
    } else {
      localStorage.removeItem('minisite_coverImage')
    }
  }, [coverImage])

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('minisite_profileImage', profileImage)
    } else {
      localStorage.removeItem('minisite_profileImage')
    }
  }, [profileImage])

  useEffect(() => {
    localStorage.setItem('minisite_backgroundColor', backgroundColor)
  }, [backgroundColor])

  useEffect(() => {
    localStorage.setItem('minisite_textColor', textColor)
  }, [textColor])

  return (
    <MiniSiteContext.Provider
      value={{
        displayName,
        setDisplayName,
        showDisplayName,
        setShowDisplayName,
        coverImage,
        setCoverImage,
        profileImage,
        setProfileImage,
        backgroundColor,
        setBackgroundColor,
        textColor,
        setTextColor,
        isHydrated,
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
