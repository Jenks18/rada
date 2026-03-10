# Clerk Authentication Setup

This app now uses Clerk for authentication instead  of Supabase Auth.

## Setup Steps

### 1. Create a Clerk Account
1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

### 2. Get Your Clerk Keys
1. In your Clerk Dashboard, go to **API Keys**
2. Copy your:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 3. Update Environment Variables

Update your `.env.local` file with your Clerk keys:

```env
# Clerk - Get these from https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 4. Update Vercel Environment Variables

In your Vercel project settings (or other hosting platform), add:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`

### 5. Update Database Schema

Run the updated `supabase/creator_profiles.sql` migration in your Supabase SQL Editor. This updates the `user_id` column to accept Clerk user IDs (strings) instead of UUIDs.

If the table already exists, you'll need to:
```sql
-- Drop the old table (WARNING: This deletes all data!)
DROP TABLE IF EXISTS creator_profiles CASCADE;

-- Then run the new migration from supabase/creator_profiles.sql
```

### 6. Test Locally

```bash
npm run dev
```

1. Go to `http://localhost:3000/sign-up`
2. Create an account
3. You should be redirected to `/dashboard`
4. Go to Settings → Mini Site to set your username

### 7. Configure Clerk Settings (Optional)

In your Clerk Dashboard:
- **User & Authentication > Email, Phone, Username**: Enable the methods you want
- **User & Authentication > Social Connections**: Add OAuth providers (Google, GitHub, etc.)
- **Customization**: Customize the appearance of sign-in/sign-up forms

## How It Works

- **Authentication**: Handled by Clerk (no more Supabase Auth)
- **Database**: Still using Supabase for data storage
- **User IDs**: Clerk provides user IDs as strings (e.g., `user_2a1b2c3d...`)
- **API Routes**: Use `@clerk/nextjs/server` to get authenticated user ID
- **Middleware**: Protects `/dashboard` and `/studio` routes automatically

## Benefits

✅ **Better developer experience**: Pre-built UI components  
✅ **More auth providers**: Easy to add Google, GitHub, Twitter, etc.  
✅ **Phone authentication**: Built-in SMS support  
✅ **Session management**: Automatic token refresh  
✅ **Production-ready**: Battle-tested in production apps  

## Support

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
