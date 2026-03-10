# Clerk Authentication Setup

This app now uses Clerk for authentication with **keyless mode** enabled - no API keys needed to get started!

## Quick Start (No Keys Required!)

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Visit the app** at `http://localhost:3000`

3. **Click "Get Started"** or **"Sign Up"** in the nav

4. **Create your account** - Clerk auto-generates temporary keys in the background

5. **After signup succeeds** and you see your profile icon in the dashboard, you're done!

6. **Optional: Claim your app** - If you see a "Configure your application" banner, click it to claim your app and get permanent API keys

## How Keyless Mode Works

Clerk automatically generates temporary development keys when you run your app without environment variables. This lets you:
- ✅ Test authentication immediately
- ✅ Skip manual account setup
- ✅ Get started in seconds

When you're ready to deploy to production, you can claim your app and get permanent keys.

## Deploy to Production

### 1. Claim Your Clerk Application

After testing locally with keyless mode, visit [https://dashboard.clerk.com](https://dashboard.clerk.com) to claim your application and get permanent production keys.

### 2. Get Your Production Keys

1. In your Clerk Dashboard, go to **API Keys**
2. Copy your production keys (starts with `pk_live_` and `sk_live_`)

### 3. Update Vercel Environment Variables

In your Vercel project settings, add these environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key_here
CLERK_SECRET_KEY=sk_live_your_secret_key_here
```

### 4. Update Database Schema

Run the updated [creator_profiles.sql](supabase/creator_profiles.sql) migration in your Supabase SQL Editor. This updates the `user_id` column to accept Clerk user IDs (strings) instead of UUIDs.

### 5. Configure Clerk Settings (Optional)

In your Clerk Dashboard:
- **User & Authentication > Email, Phone, Username**: Enable the auth methods you want
- **User & Authentication > Social Connections**: Add OAuth providers (Google, GitHub, etc.)
- **Customization**: Customize the appearance of sign-in/sign-up forms
- **Webhooks**: Set up webhooks if you need to sync user data

## How It Works

- **Authentication**: Handled by Clerk (no more Supabase Auth)
- **Database**: Still using Supabase for data storage
- **User IDs**: Clerk provides user IDs as strings (e.g., `user_2a1b2c3d...`)
- **API Routes**: Use `auth()` from `@clerk/nextjs/server` to get authenticated user ID
- **Middleware**: Protects `/dashboard` and `/studio` routes automatically

## Benefits

✅ **Keyless mode**: Start testing immediately without API keys  
✅ **Better developer experience**: Pre-built UI components  
✅ **More auth providers**: Easy to add Google, GitHub, Twitter, etc.  
✅ **Phone authentication**: Built-in SMS support  
✅ **Session management**: Automatic token refresh  
✅ **Production-ready**: Battle-tested in production apps  

## Testing the Full Flow

1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Sign Up" and create an account
4. After signup, you'll be redirected to `/dashboard`
5. Go to **Settings → Mini Site** to set your username
6. Configure your minisite content
7. Click **PUBLISH** to make it live at `username.rada.bio`

## Support

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Organizations](https://clerk.com/docs/guides/organizations/overview)
- [Clerk Components](https://clerk.com/docs/reference/components/overview)
