import { supabase } from './client'

export interface AuthUser {
  id: string
  phone: string
  email?: string
  role: 'ARTIST' | 'FAN' | 'ADMIN'
}

// Sign up with phone number
export async function signUpWithPhone(phone: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    phone: phone,
    password: password,
  })
  
  if (error) throw error
  return data
}

// Sign in with phone number
export async function signInWithPhone(phone: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    phone: phone,
    password: password,
  })
  
  if (error) throw error
  return data
}

// Sign in with OTP (passwordless)
export async function signInWithOTP(phone: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phone,
  })
  
  if (error) throw error
  return data
}

// Verify OTP
export async function verifyOTP(phone: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: 'sms',
  })
  
  if (error) throw error
  return data
}

// Get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) throw error
  return user
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Get session
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

// Update user profile
export async function updateProfile(updates: {
  name?: string
  avatar?: string
  email?: string
}) {
  const { data, error } = await supabase.auth.updateUser({
    data: updates,
  })
  
  if (error) throw error
  return data
}
