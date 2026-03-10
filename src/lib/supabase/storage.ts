import { supabase } from './client'

// Upload file to Supabase Storage
export async function uploadFile(
  bucket: 'avatars' | 'covers' | 'events' | 'submissions',
  path: string,
  file: File
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error
  return data
}

// Get public URL for a file
export function getPublicUrl(
  bucket: 'avatars' | 'covers' | 'events' | 'submissions',
  path: string
) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

// Delete file
export async function deleteFile(
  bucket: 'avatars' | 'covers' | 'events' | 'submissions',
  path: string
) {
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}

// Upload artist cover image
export async function uploadCoverImage(artistId: string, file: File) {
  const fileName = `${artistId}-${Date.now()}.${file.name.split('.').pop()}`
  const path = `${artistId}/${fileName}`
  
  await uploadFile('covers', path, file)
  return getPublicUrl('covers', path)
}

// Upload event poster
export async function uploadEventPoster(eventId: string, file: File) {
  const fileName = `${eventId}-${Date.now()}.${file.name.split('.').pop()}`
  const path = `${eventId}/${fileName}`
  
  await uploadFile('events', path, file)
  return getPublicUrl('events', path)
}

// Upload user avatar
export async function uploadAvatar(userId: string, file: File) {
  const fileName = `${userId}.${file.name.split('.').pop()}`
  const path = fileName
  
  await uploadFile('avatars', path, file)
  return getPublicUrl('avatars', path)
}

// Upload drop submission
export async function uploadSubmission(dropId: string, userId: string, file: File) {
  const fileName = `${userId}-${Date.now()}.${file.name.split('.').pop()}`
  const path = `${dropId}/${fileName}`
  
  await uploadFile('submissions', path, file)
  return getPublicUrl('submissions', path)
}

// ─── MiniSite asset helpers ───────────────────────────────────────────────

// Fixed paths per user so re-uploads automatically overwrite the old file.
const MINISITE_COVER_PATH = (userId: string) => `${userId}/cover.jpg`
const MINISITE_LOGO_PATH  = (userId: string) => `${userId}/logo.png`

/** Upload/replace the minisite cover image (cropped JPEG blob). */
export async function uploadMiniSiteCover(userId: string, blob: Blob): Promise<string> {
  const path = MINISITE_COVER_PATH(userId)
  const { error } = await supabase.storage.from('covers').upload(path, blob, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
    upsert: true,
  })
  if (error) throw error
  // Append a cache-buster so the browser/CDN always reflects the latest crop
  return `${getPublicUrl('covers', path)}?t=${Date.now()}`
}

/** Delete the minisite cover image from storage. */
export async function deleteMiniSiteCover(userId: string): Promise<void> {
  await supabase.storage.from('covers').remove([MINISITE_COVER_PATH(userId)])
}

/** Upload/replace the minisite logo (original file, no crop). */
export async function uploadMiniSiteLogo(userId: string, file: File): Promise<string> {
  const ext  = file.name.split('.').pop() ?? 'png'
  const path = `${userId}/logo.${ext}`
  const { error } = await supabase.storage.from('avatars').upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000',
    upsert: true,
  })
  if (error) throw error
  return `${getPublicUrl('avatars', path)}?t=${Date.now()}`
}

/** Delete the minisite logo from storage. */
export async function deleteMiniSiteLogo(userId: string): Promise<void> {
  // Remove both .png and .jpg variants in case the extension changed
  await supabase.storage
    .from('avatars')
    .remove([`${userId}/logo.png`, `${userId}/logo.jpg`, `${userId}/logo.jpeg`])
}
