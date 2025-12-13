import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const createSupabaseServerClient = () => {
  const cookieStore = cookies()
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage: {
          getItem: (key: string) => {
            return cookieStore.get(key)?.value ?? null
          },
          setItem: (key: string, value: string) => {
            // Server components can't set cookies
          },
          removeItem: (key: string) => {
            // Server components can't remove cookies
          },
        },
      },
    }
  )
}
