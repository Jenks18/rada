import PreviewBrandIcon from './PreviewBrandIcon'

interface SocialLink {
  id: string
  url: string
}

interface Module {
  id: string
  type: string
  title: string
  data?: any
}

interface PublicMiniSiteProps {
  username: string
  talentName?: string | null
  displayName?: string
  showDisplayName?: boolean
  displayMode?: 'text' | 'logo'
  profileImage?: string
  coverImage?: string
  logoImage?: string
  backgroundColor?: string
  textColor?: string
  overlayMode?: 'lighten' | 'darken'
  socialLinks?: SocialLink[]
  modules?: Module[]
}

export default function PublicMiniSite({
  username,
  talentName,
  displayName = 'Artist',
  showDisplayName = true,
  displayMode = 'text',
  profileImage,
  coverImage,
  logoImage,
  backgroundColor = '#FFFFFF',
  textColor = '#121212',
  overlayMode = 'darken',
  socialLinks = [],
  modules = [],
}: PublicMiniSiteProps) {
  // Calculate overlay color based on background and overlay mode
  const getOverlayColor = () => {
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    if (overlayMode === 'lighten') {
      return `rgba(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)}, 0.5)`
    } else {
      return `rgba(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)}, 0.5)`
    }
  }

  const getBorderColor = () => {
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    
    if (overlayMode === 'lighten') {
      return `rgba(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)}, 0.3)`
    } else {
      return `rgba(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)}, 0.3)`
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor }}>
      {/* Centered container - mobile-first, responsive */}
      <div className="w-full max-w-md min-h-screen flex flex-col" style={{ backgroundColor }}>
        {/* Header with cover */}
        <div className="relative h-[350px] flex-shrink-0" style={{ backgroundColor: getOverlayColor() }}>
          {coverImage ? (
            <div className="absolute inset-0">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(to bottom, ${backgroundColor}66, ${backgroundColor}33, ${backgroundColor})`
                }}
              ></div>
            </div>
          ) : (
            <div 
              className="absolute inset-0" 
              style={{ 
                background: `linear-gradient(to bottom, ${getOverlayColor()}, ${backgroundColor})`
              }}
            ></div>
          )}

          {/* Profile Photo */}
          {profileImage && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3">
              <div 
                className="w-24 h-24 rounded-2xl overflow-hidden border-4" 
                style={{ borderColor: backgroundColor }}
              >
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col px-4 pb-8" style={{ backgroundColor }}>
          {/* Artist Name or Logo */}
          {showDisplayName && (
            displayMode === 'logo' && logoImage ? (
              <div className="flex justify-center mt-5 mb-5">
                <div className="max-w-[90%] flex items-center justify-center">
                  <img src={logoImage} alt="Logo" className="max-w-full h-auto object-contain" style={{ maxHeight: '120px' }} />
                </div>
              </div>
            ) : (
              <h1 
                className="text-3xl font-bold text-center mt-5 mb-5"
                style={{ color: textColor }}
              >
                {displayName}
              </h1>
            )
          )}

          {/* Social Links */}
          <div className={`flex justify-center mb-6 ${!showDisplayName ? 'mt-5' : ''}`}>
            {socialLinks.filter(l => l.url).length > 0 ? (
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {socialLinks.filter(l => l.url).map((link) => (
                  <a
                    key={link.id}
                    href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ backgroundColor: getOverlayColor() }}
                    title={link.id}
                  >
                    <PreviewBrandIcon id={link.id} color={textColor} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Module Cards */}
          <div className="flex-1 flex flex-col items-center gap-3">
            {modules.length > 0 ? (
              modules.map((module) => (
                <div
                  key={module.id}
                  className="w-full max-w-[90%] rounded-xl py-4 px-5 border text-center cursor-pointer hover:scale-[1.02] transition-transform"
                  style={{
                    backgroundColor: getOverlayColor(),
                    borderColor: getBorderColor(),
                  }}
                >
                  <span
                    className="font-semibold text-sm block"
                    style={{ color: textColor }}
                  >
                    {module.title}
                  </span>
                  <span
                    className="text-xs mt-1 block capitalize"
                    style={{ color: textColor, opacity: 0.5 }}
                  >
                    {module.type.replace(/-/g, ' ')}
                  </span>
                </div>
              ))
            ) : (
              <div
                className="w-full max-w-[90%] rounded-2xl py-20 px-8 text-center border"
                style={{
                  backgroundColor: getOverlayColor(),
                  borderColor: getBorderColor(),
                }}
              >
                <span
                  className="font-medium text-sm"
                  style={{ color: textColor, opacity: 0.5 }}
                >
                  No content yet
                </span>
              </div>
            )}
          </div>

          {/* Footer branding */}
          <div className="text-center mt-8 pt-4 border-t" style={{ borderColor: getBorderColor() }}>
            <p className="text-xs opacity-50" style={{ color: textColor }}>
              Powered by <span className="font-semibold">Rada</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
