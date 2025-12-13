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
