'use client'

import { useState } from 'react'
import { X, Plus, Trash2, GripVertical } from 'lucide-react'
import { useMiniSite } from '@/contexts/MiniSiteContext'

// Brand Icon Component
const BrandIcon = ({ id }: { id: string }) => {
  const iconClass = "w-5 h-5"
  
  const icons: Record<string, JSX.Element> = {
    'discord': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
    ),
    'facebook': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    ),
    'instagram': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="url(#instagram-gradient)"><defs><linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style={{stopColor: '#FD5949'}} /><stop offset="100%" style={{stopColor: '#D6249F'}} /></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849c0 3.205-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919c-1.266.058-1.644.07-4.85.07c-3.204 0-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92c-.058-1.265-.07-1.644-.07-4.849c0-3.204.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919c1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072C2.695.272.273 2.69.073 7.052C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98c.059-1.28.073-1.689.073-4.948c0-3.259-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881a1.44 1.44 0 0 0 0-2.881z"/></svg>
    ),
    'linkedin': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
    'medium': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#000000"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42c-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42s3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75c-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
    ),
    'messenger': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="url(#messenger-gradient)"><defs><linearGradient id="messenger-gradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style={{stopColor: '#00B2FF'}} /><stop offset="100%" style={{stopColor: '#006AFF'}} /></linearGradient></defs><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464c6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26l-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/></svg>
    ),
    'pinterest': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#E60023"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162c-.105-.949-.199-2.403.041-3.439c.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911c1.024 0 1.518.769 1.518 1.688c0 1.029-.653 2.567-.992 3.992c-.285 1.193.6 2.165 1.775 2.165c2.128 0 3.768-2.245 3.768-5.487c0-2.861-2.063-4.869-5.008-4.869c-3.41 0-5.409 2.562-5.409 5.199c0 1.033.394 2.143.889 2.741c.099.12.112.225.085.345c-.09.375-.293 1.199-.334 1.363c-.053.225-.172.271-.401.165c-1.495-.69-2.433-2.878-2.433-4.646c0-3.776 2.748-7.252 7.92-7.252c4.158 0 7.392 2.967 7.392 6.923c0 4.135-2.607 7.462-6.233 7.462c-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146c1.123.345 2.306.535 3.55.535c6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
    ),
    'reddit': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FF4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547l-.8 3.747c1.824.07 3.48.632 4.674 1.488c.308-.309.73-.491 1.207-.491c.968 0 1.754.786 1.754 1.754c0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87c-3.874 0-7.004-2.176-7.004-4.87c0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754c.463 0 .898.196 1.207.49c1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197a.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248c.687 0 1.248-.561 1.248-1.249c0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25c0 .687.561 1.248 1.249 1.248c.688 0 1.249-.561 1.249-1.249c0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094a.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913c.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463a.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73c-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
    ),
    'telegram': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#26A5E4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345c-.48.33-.913.49-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789c.027-.216.325-.437.893-.663c3.498-1.524 5.83-2.529 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
    ),
    'threads': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#000000"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098c1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015c-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164c1.43 1.781 3.631 2.695 6.54 2.717c2.623-.02 4.358-.631 5.8-2.045c1.647-1.613 1.618-3.593 1.09-4.798c-.31-.71-.873-1.3-1.634-1.701c-.192 1.352-.622 2.446-1.284 3.272c-.886 1.102-2.14 1.704-3.73 1.79c-1.202.065-2.361-.218-3.259-.801c-1.063-.689-1.685-1.74-1.752-2.964c-.065-1.19.408-2.285 1.33-3.082c.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142l-.126 1.974a11.881 11.881 0 0 0-2.68-.15c-1.004.058-1.784.339-2.32.834c-.485.446-.73 1.014-.689 1.596c.037.549.354 1.01.944 1.373c.579.357 1.354.527 2.237.492c1.14-.066 1.948-.486 2.544-1.323c.583-.821.9-1.933.944-3.305l.03-.563c-.015-.157-.03-.314-.052-.471c-.02-.14-.045-.28-.073-.418c-.04-.188-.092-.375-.153-.56c-.066-.218-.146-.433-.236-.644c-.098-.23-.21-.457-.336-.68c-.124-.22-.26-.437-.414-.65c-.155-.216-.326-.426-.516-.63c-.19-.203-.394-.396-.616-.577c-.223-.182-.46-.353-.71-.51c-1.963-1.245-4.565-1.86-7.74-1.833l-.054.997c2.925-.025 5.282.533 7.017 1.66c.196.127.376.27.54.421c.164.152.312.314.446.485c.134.17.254.35.36.535c.107.186.198.38.276.581c.077.2.14.408.188.621c.047.213.08.428.1.645c.02.217.027.437.025.659c0 .06-.005.12-.008.181a11.69 11.69 0 0 0-3.02-.142c-1.465.084-2.704.53-3.583 1.291c-.922.797-1.395 1.893-1.33 3.082c.067 1.224.689 2.275 1.752 2.964c.898.583 2.057.866 3.259.801c1.59-.086 2.844-.688 3.73-1.79c.662-.826 1.092-1.92 1.284-3.272c.761.401 1.324.991 1.634 1.701c.528 1.205.557 3.185-1.09 4.798c-1.442 1.414-3.177 2.025-5.8 2.045z"/></svg>
    ),
    'twitter': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#000000"><path d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
    'tiktok': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#000000"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/></svg>
    ),
    'snapchat': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FFFC00"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821c.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51c.075.045.203.09.401.09c.3-0.016.659-.12 1.033-.301a1.1 1.1 0 0 1 .438-.097c.276 0 .5.14.656.326c.169.203.265.467.265.711c0 .628-.532 1.152-1.154 1.152c-.1 0-.203-.016-.31-.046c-.48-.15-.976-.39-1.452-.39c-.19 0-.365.044-.525.135c-.427.251-.674.974-.872 1.596c-.185.583-.324 1.047-.736 1.272c-.122.066-.263.102-.415.102l-.013-.001a.832.832 0 0 1-.126-.01c-.355-.044-.673-.127-.982-.21c-.37-.1-.746-.201-1.163-.234c-.176-.015-.359-.023-.547-.023c-.559 0-1.023.09-1.417.17c-.377.08-.761.162-1.176.162c-.133 0-.275-.013-.422-.04l-.044-.007c-.502-.078-.96-.36-1.361-.77c-.475-.485-.889-1.025-1.258-1.526c-.354-.48-.656-.918-.918-1.203a.73.73 0 0 0-.502-.213c-.276 0-.5-.225-.5-.5s.224-.5.5-.5c.1 0 .203.016.31.046c.48.15.976.39 1.452.39c.19 0 .365-.044.525-.135c.427-.251.674-.974.872-1.596c.185-.583.324-1.047.736-1.272a.832.832 0 0 1 .415-.102c.044 0 .087.003.13.009c.355.044.673.127.982.21c.37.1.746.201 1.163.234c.176.015.359.023.547.023c.559 0 1.023-.09 1.417-.17c.377-.08.761-.162 1.176-.162c.133 0 .275.013.422.04l.044.007c.502.078.96.36 1.361.77c.475.485.889 1.025 1.258 1.526c.354.48.656.918.918 1.203a.73.73 0 0 0 .502.213z"/></svg>
    ),
    'whatsapp': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51c-.173-.008-.371-.01-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    ),
    'amazon-music': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FF9900"><path d="M2.325 7.875C.9 8.8 0 10.113 0 11.7v.6c0 1.588.9 2.9 2.325 3.825l7.95 5.213c1.425.926 3.075 1.426 4.725 1.426s3.3-.5 4.725-1.426l7.95-5.213C22.1 15.2 23 13.887 23 12.3v-.6c0-1.588-.9-2.9-2.325-3.825l-7.95-5.213C11.4 1.737 9.75 1.237 8.1 1.237s-3.3.5-4.725 1.426l-7.95 5.212z"/></svg>
    ),
    'apple-music': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FA243C"><path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.98 5.98 0 0 0-1.809-.743A10.385 10.385 0 0 0 17.672 0h-11.35c-.706.003-1.416.05-2.12.147c-.711.116-1.406.295-2.065.606c-1.39.656-2.34 1.67-2.833 3.097C.088 4.854 0 5.883 0 6.9v10.18c0 .718.065 1.45.24 2.19c.317 1.31 1.062 2.312 2.184 3.044c.547.355 1.147.614 1.81.743c.7.138 1.416.21 2.123.21h11.35c.706 0 1.416-.05 2.12-.147c.71-.116 1.406-.295 2.065-.607c1.39-.656 2.34-1.67 2.833-3.096c.156-.417.232-.86.289-1.302c.065-.522.1-1.051.1-1.58V6.124h-.017zM15.667 15.405a2.68 2.68 0 0 1-1.096 1.198c-.57.339-1.23.545-1.912.545a4.051 4.051 0 0 1-1.57-.325c-.506-.213-.955-.536-1.339-.946a4.39 4.39 0 0 1-.899-1.388a4.294 4.294 0 0 1-.325-1.659c0-.552.098-1.095.293-1.616c.195-.52.48-.997.853-1.405a3.83 3.83 0 0 1 1.339-.93c.52-.228 1.08-.342 1.646-.342c.37 0 .738.05 1.096.147c.325.082.64.196.938.341V6.762c0-.148-.016-.312-.082-.443a.95.95 0 0 0-.341-.406c-.147-.098-.325-.147-.504-.18a3.6 3.6 0 0 0-.571-.049H8.294c-.147 0-.309.016-.438.066c-.147.065-.28.163-.39.276a.968.968 0 0 0-.212.423a1.74 1.74 0 0 0-.049.475v11.999c0 .406-.065.813-.195 1.186a2.579 2.579 0 0 1-.57.963a2.561 2.561 0 0 1-.913.618c-.37.147-.78.228-1.186.228c-.406 0-.813-.08-1.186-.228a2.578 2.578 0 0 1-.963-.618a2.561 2.561 0 0 1-.618-.963a2.904 2.904 0 0 1-.228-1.186V6.796c0-.455.081-.896.244-1.318c.163-.422.406-.81.731-1.121c.325-.312.714-.57 1.137-.748c.422-.18.88-.277 1.35-.277h11.512c.47 0 .928.098 1.35.277c.422.18.812.437 1.137.748c.325.311.568.7.731 1.121c.163.422.244.863.244 1.318v9.388z"/></svg>
    ),
    'beatport': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#94D500"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12s12-5.4 12-12S18.6 0 12 0zm0 2.2c5.4 0 9.8 4.4 9.8 9.8s-4.4 9.8-9.8 9.8s-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8zM7.2 8v8h2.4v-2.4h2.4c1.3 0 2.4-1.1 2.4-2.4V9.6c0-1.3-1.1-2.4-2.4-2.4H7.2zm2.4 1.6h2.4v1.6H9.6V9.6z"/></svg>
    ),
    'deezer': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FF0092"><path d="M18.81 4.16v3.03h5.16V4.16h-5.16zm0 6.07v3.03h5.16v-3.03h-5.16zm0 6.06v3.03h5.16v-3.03h-5.16zM12.68 10.23v3.03h5.16v-3.03h-5.16zm0 6.06v3.03h5.16v-3.03h-5.16zM6.54 12.28v3.03h5.16v-3.03H6.54zm0 6.06v3.03h5.16v-3.03H6.54zM.405 14.34v3.03h5.16v-3.03H.405zm0 6.06v3.03h5.16v-3.03H.405z"/></svg>
    ),
    'soundcloud': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FF5500"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154l.233 2.105c.007.058.05.098.101.098c.05 0 .09-.04.099-.098l.255-2.105l-.255-2.154c-.009-.057-.049-.1-.099-.1m-.899.828c-.052 0-.091.039-.099.093l-.145 1.326l.145 1.279c.008.053.047.094.099.094c.051 0 .095-.041.104-.104l.171-1.269l-.171-1.326c-.009-.054-.053-.093-.104-.093zm1.804-.097c-.043 0-.078.035-.085.08l-.257 2.372l.257 2.294c.007.046.042.082.085.082c.042 0 .078-.036.085-.082l.289-2.294l-.289-2.372c-.007-.045-.043-.08-.085-.08zm.901-.064c-.048 0-.087.039-.092.086l-.239 2.436l.239 2.36c.005.047.044.086.092.086c.047 0 .086-.039.091-.086l.27-2.36l-.27-2.436c-.005-.047-.044-.086-.091-.086zm.899-.078c-.053 0-.096.043-.103.096l-.213 2.514l.213 2.445c.007.053.05.097.103.097c.053 0 .096-.044.104-.097l.247-2.445l-.247-2.514c-.008-.053-.051-.096-.104-.096zm.964-.128c-.058 0-.106.048-.114.107l-.188 2.642l.188 2.577c.008.062.056.108.114.108c.057 0 .105-.046.112-.108l.221-2.577l-.221-2.642c-.007-.059-.055-.107-.112-.107zm.947-.223c-.063 0-.114.051-.123.114l-.176 2.865l.176 2.78c.009.065.06.115.123.115c.064 0 .115-.05.125-.115l.207-2.78l-.207-2.865c-.01-.063-.061-.114-.125-.114zm1.011-.223c-.068 0-.124.056-.134.124l-.166 3.088l.166 2.996c.01.069.066.125.134.125c.067 0 .122-.056.132-.125l.194-2.996l-.194-3.088c-.01-.068-.065-.124-.132-.124zm.977-.125c-.073 0-.133.06-.142.134l-.154 3.213l.154 3.12c.009.074.069.134.142.134c.072 0 .132-.06.141-.134l.186-3.12l-.186-3.213c-.009-.074-.069-.134-.141-.134zm1.009-.149c-.078 0-.142.064-.151.143l-.142 3.362l.142 3.271c.009.078.073.142.151.142c.077 0 .141-.064.15-.142l.173-3.271l-.173-3.362c-.009-.079-.073-.143-.15-.143zm.986-.158a.147.147 0 0 0-.148.148l-.134 3.52l.134 3.416c.009.082.074.149.148.149c.075 0 .14-.067.148-.149l.168-3.416l-.168-3.52a.147.147 0 0 0-.148-.148zm1.012-.196c-.083 0-.151.068-.159.152l-.126 3.716l.126 3.618c.008.084.076.152.159.152c.082 0 .15-.068.158-.152l.161-3.618l-.161-3.716a.16.16 0 0 0-.158-.152zm1.003-.365a.167.167 0 0 0-.166.167l-.118 4.081l.118 3.963c.008.088.08.166.166.166a.167.167 0 0 0 .165-.166l.151-3.963l-.151-4.081a.167.167 0 0 0-.165-.167zm1.012-1.336a.185.185 0 0 0-.183.184l-.11 5.417l.11 5.274c.008.097.086.183.183.183a.185.185 0 0 0 .183-.183l.143-5.274l-.143-5.417a.185.185 0 0 0-.183-.184zm1.011-1.319c-.094 0-.17.076-.178.17l-.104 6.736l.104 6.553c.008.094.084.171.178.171c.093 0 .169-.077.177-.171l.137-6.553l-.137-6.736c-.008-.094-.084-.17-.177-.17z"/></svg>
    ),
    'spotify': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12s12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24c-2.82-1.74-6.36-2.101-10.561-1.141c-.418.122-.779-.179-.899-.539c-.12-.421.18-.78.54-.9c4.56-1.021 8.52-.6 11.64 1.32c.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3c-3.239-1.98-8.159-2.58-11.939-1.38c-.479.12-1.02-.12-1.14-.6c-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721c-.18-.601.18-1.2.72-1.381c4.26-1.26 11.28-1.02 15.721 1.621c.539.3.719 1.02.419 1.56c-.299.421-1.02.599-1.559.3z"/></svg>
    ),
    'tidal': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#000000"><path d="M12.012 3.992L8.008 7.996L4.004 3.992L0 7.996l4.004 4.004l4.004-4.004l4.004 4.004l4.004-4.004l-4.004-4.004zm0 8.008l-4.004 4.004l4.004 4.004l4.004-4.004l-4.004-4.004zm4.004-4.004L20.02 3.992L24.024 7.996l-4.004 4.004l-4.004-4.004z"/></svg>
    ),
    'twitch': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#9146FF"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
    ),
    'youtube': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ),
    'youtube-music': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FF0000"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12s12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104s-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/></svg>
    ),
    'amazon': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FF9900"><path d="M.045 18.02c.072-.116.187-.124.348-.022c3.636 2.11 7.594 3.166 11.87 3.166c2.852 0 5.668-.533 8.447-1.595c.434-.165.807-.225 1.116-.18c.439.06.661.36.661.902c0 .36-.144.615-.434.763c-3.323 1.802-6.91 2.704-10.757 2.704c-4.208 0-8.044-1.052-11.506-3.154c-.21-.126-.315-.315-.315-.57c0-.215.07-.39.21-.54zm1.718-5.923c-.242 0-.363-.145-.363-.435c0-.3.121-.445.363-.445h4.655c.242 0 .363.15.363.445v9.317c0 .3-.121.445-.363.445h-.91c-.242 0-.363-.15-.363-.445v-8.882H1.763zm7.555 0c-.242 0-.363-.145-.363-.435c0-.3.121-.445.363-.445h4.655c.242 0 .363.15.363.445v9.317c0 .3-.121.445-.363.445h-.91c-.242 0-.363-.15-.363-.445v-8.882H9.318zm16.477-3.632c.242 0 .363.145.363.435c0 .3-.121.445-.363.445h-4.655c-.242 0-.363-.15-.363-.445V3.553c0-.285.121-.435.363-.435h.91c.242 0 .363.15.363.435v4.912h3.382z"/></svg>
    ),
    'bandsintown': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#00CEC8"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12s12-5.373 12-12S18.627 0 12 0zm6.92 17.13c-.17.29-.48.46-.81.46c-.15 0-.31-.04-.46-.12c-3.33-1.92-7.52-.96-7.56-.96c-.53.12-1.05-.21-1.17-.74c-.12-.53.21-1.05.74-1.17c.19-.04 4.68-1.07 8.48 1.09c.47.27.63.88.36 1.35c-.01.03-.02.06-.04.09zm1.16-2.58c-.21.34-.59.54-1 .54c-.19 0-.38-.05-.56-.15c-3.97-2.3-10.03-2.97-14.73-1.63c-.65.18-1.32-.2-1.5-.85c-.18-.65.2-1.32.85-1.5c5.42-1.54 12.05-.8 16.68 1.88c.59.34.79 1.1.45 1.69l-.19.02zm.1-2.69c-4.76-2.83-12.62-3.09-17.17-1.71c-.78.23-1.61-.21-1.84-.99c-.23-.78.21-1.61.99-1.84c5.24-1.59 13.88-1.28 19.38 1.98c.71.42.94 1.34.52 2.05c-.42.71-1.34.94-2.05.52l.17-.01z"/></svg>
    ),
    'email': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#EA4335"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/></svg>
    ),
    'imdb': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#F5C518"><path d="M13.65 8.844h-1.091v4.508h1.09V8.844zm5.852 0l-.896 3.37l-.896-3.37h-1.328v4.508h.896v-3.63l.896 3.63h.768l.896-3.63v3.63h.896V8.844h-1.232zM8.5 8.844H6.539v4.508h.896v-1.275h1.065c.896 0 1.617-.724 1.617-1.617s-.721-1.616-1.617-1.616zm0 2.337H7.435V9.74h1.065c.448 0 .721.273.721.721c0 .448-.273.72-.721.72zm6.938-2.337h-1.617v4.508h1.617c.896 0 1.617-.721 1.617-1.617v-1.274c0-.896-.721-1.617-1.617-1.617zm.721 2.891c0 .448-.273.721-.721.721h-.721v-2.612h.721c.448 0 .721.273.721.721v1.17zM2.5 6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h19c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2h-19z"/></svg>
    ),
    'substack': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#FF6719"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11L22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
    ),
    'custom': (
      <svg className={iconClass} viewBox="0 0 24 24" fill="#4285F4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    ),
  }
  
  return icons[id] || icons['custom']
}

interface Platform {
  id: string
  name: string
  category: string
}

const socialPlatforms: Platform[] = [
  // Social Media
  { id: 'discord', name: 'Discord', category: 'social' },
  { id: 'facebook', name: 'Facebook', category: 'social' },
  { id: 'instagram', name: 'Instagram', category: 'social' },
  { id: 'linkedin', name: 'LinkedIn', category: 'social' },
  { id: 'medium', name: 'Medium', category: 'social' },
  { id: 'messenger', name: 'Messenger', category: 'social' },
  { id: 'pinterest', name: 'Pinterest', category: 'social' },
  { id: 'reddit', name: 'Reddit', category: 'social' },
  { id: 'telegram', name: 'Telegram', category: 'social' },
  { id: 'threads', name: 'Threads', category: 'social' },
  { id: 'twitter', name: 'X (Twitter)', category: 'social' },
  { id: 'tiktok', name: 'TikTok', category: 'social' },
  { id: 'snapchat', name: 'Snapchat', category: 'social' },
  { id: 'whatsapp', name: 'WhatsApp', category: 'social' },
  
  // Streaming
  { id: 'amazon-music', name: 'Amazon Music', category: 'streaming' },
  { id: 'apple-music', name: 'Apple Music', category: 'streaming' },
  { id: 'beatport', name: 'Beatport', category: 'streaming' },
  { id: 'deezer', name: 'Deezer', category: 'streaming' },
  { id: 'soundcloud', name: 'SoundCloud', category: 'streaming' },
  { id: 'spotify', name: 'Spotify', category: 'streaming' },
  { id: 'tidal', name: 'Tidal', category: 'streaming' },
  { id: 'twitch', name: 'Twitch', category: 'streaming' },
  { id: 'youtube', name: 'YouTube', category: 'streaming' },
  { id: 'youtube-music', name: 'YouTube Music', category: 'streaming' },
  
  // Other
  { id: 'amazon', name: 'Amazon', category: 'other' },
  { id: 'bandsintown', name: 'Bandsintown', category: 'other' },
  { id: 'email', name: 'Email', category: 'other' },
  { id: 'imdb', name: 'IMDb', category: 'other' },
  { id: 'substack', name: 'Substack', category: 'other' },
  { id: 'custom', name: 'Custom Website', category: 'other' },
]

export default function SocialLinksPage() {
  const { socialLinks, setSocialLinks } = useMiniSite()
  const [showModal, setShowModal] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const selectedIds = socialLinks.map(l => l.id)

  const toggleLink = (platformId: string) => {
    if (selectedIds.includes(platformId)) {
      setSocialLinks(socialLinks.filter(l => l.id !== platformId))
    } else {
      if (socialLinks.length >= 7) {
        alert('You can add up to 7 social profile links to your page.')
        return
      }
      setSocialLinks([...socialLinks, { id: platformId, url: '' }])
    }
  }

  const handleInputChange = (platformId: string, value: string) => {
    setSocialLinks(socialLinks.map(l => l.id === platformId ? { ...l, url: value } : l))
  }

  const removeLink = (platformId: string) => {
    setSocialLinks(socialLinks.filter(l => l.id !== platformId))
  }

  const handleDone = () => {
    setShowModal(false)
  }

  // Drag and drop reorder
  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }
  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return
    const updated = [...socialLinks]
    const [moved] = updated.splice(dragIndex, 1)
    updated.splice(index, 0, moved)
    setSocialLinks(updated)
    setDragIndex(null)
    setDragOverIndex(null)
  }
  const handleDragEnd = () => {
    setDragIndex(null)
    setDragOverIndex(null)
  }

  const selectedPlatforms = socialLinks.map(l => socialPlatforms.find(p => p.id === l.id)).filter(Boolean) as Platform[]
  const socialMediaPlatforms = socialPlatforms.filter(p => p.category === 'social')
  const streamingPlatforms = socialPlatforms.filter(p => p.category === 'streaming')
  const otherPlatforms = socialPlatforms.filter(p => p.category === 'other')

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Direct link to your social profiles</h2>
        <p className="text-gray-500 text-sm mb-6">
          You can add up to 7 social links to your mini-site.
        </p>

        {/* Selected Links List - Card Style */}
        {socialLinks.length > 0 && (
          <div className="space-y-4 mb-6">
            {socialLinks.map((link, index) => {
              const platform = socialPlatforms.find(p => p.id === link.id)
              if (!platform) return null
              return (
                <div
                  key={link.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={() => handleDrop(index)}
                  onDragEnd={handleDragEnd}
                  className={`bg-white border rounded-xl p-4 transition-all ${
                    dragOverIndex === index ? 'border-blue-400 shadow-md' : 'border-gray-200'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-500">Link</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeLink(link.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove link"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="cursor-grab active:cursor-grabbing p-1.5 text-gray-400 hover:text-gray-600">
                        <GripVertical size={16} />
                      </div>
                    </div>
                  </div>
                  {/* URL Input */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <BrandIcon id={link.id} />
                    </div>
                    <input
                      type="text"
                      placeholder={`https://${platform.id}.com/yourprofile`}
                      value={link.url}
                      onChange={(e) => handleInputChange(link.id, e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-900 text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Add Link Button */}
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center space-x-2 text-gray-700 font-medium text-sm hover:text-gray-900 transition-colors"
        >
          <Plus size={18} />
          <span>Add Link</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Add Social Link</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-sm text-gray-600 mb-6">
                You can add up to 7 social profile links to your page.
              </p>

              {/* Social Media Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Social Media</h3>
                <div className="flex flex-wrap gap-2">
                  {socialMediaPlatforms.map((platform) => {
                    const isSelected = selectedIds.includes(platform.id)
                    return (
                      <button
                        key={platform.id}
                        onClick={() => toggleLink(platform.id)}
                        className={`
                          inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all
                          ${isSelected 
                            ? 'bg-gray-100 border-gray-900' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <span>
                          <BrandIcon id={platform.id} />
                        </span>
                        <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                        {isSelected && <X size={14} className="text-gray-600" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Streaming Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Streaming</h3>
                <div className="flex flex-wrap gap-2">
                  {streamingPlatforms.map((platform) => {
                    const isSelected = selectedIds.includes(platform.id)
                    return (
                      <button
                        key={platform.id}
                        onClick={() => toggleLink(platform.id)}
                        className={`
                          inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all
                          ${isSelected 
                            ? 'bg-gray-100 border-gray-900' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <span>
                          <BrandIcon id={platform.id} />
                        </span>
                        <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                        {isSelected && <X size={14} className="text-gray-600" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Other Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Other</h3>
                <div className="flex flex-wrap gap-2">
                  {otherPlatforms.map((platform) => {
                    const isSelected = selectedIds.includes(platform.id)
                    return (
                      <button
                        key={platform.id}
                        onClick={() => toggleLink(platform.id)}
                        className={`
                          inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all
                          ${isSelected 
                            ? 'bg-gray-100 border-gray-900' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <span>
                          <BrandIcon id={platform.id} />
                        </span>
                        <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                        {isSelected && <X size={14} className="text-gray-600" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={handleDone}
                className="w-full px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
