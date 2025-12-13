# 🚀 Supabase Setup Guide for Rada

## Step 1: Create Supabase Project (5 mins)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" (free account)
3. Create new project:
   - **Name**: `rada-production`
   - **Database Password**: Save this! You'll need it
   - **Region**: Select closest to Kenya (e.g., "Singapore" or "Frankfurt")
4. Wait 2-3 minutes for setup

## Step 2: Get Your Credentials

1. In Supabase Dashboard, go to **Settings** > **API**
2. Copy these values:

```bash
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Go to **Settings** > **Database**
4. Copy the connection string:

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

## Step 3: Update Your .env.local File

Replace the values in `/Users/iannjenga/Desktop/rada/.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Create Storage Buckets

1. In Supabase Dashboard, go to **Storage**
2. Create 4 buckets:

   - **avatars** (Public bucket)
   - **covers** (Public bucket)  
   - **events** (Public bucket)
   - **submissions** (Private bucket)

3. For each public bucket, click **Policies** and enable "Public access"

## Step 5: Run Database Migration

1. Open Supabase **SQL Editor**
2. Copy the contents of `/Users/iannjenga/Desktop/rada/supabase/migration.sql`
3. Paste and click **RUN**
4. Wait for "Success" message

## Step 6: Seed Database (Optional)

You can add test data directly in the SQL Editor or through the Supabase Dashboard table editor.

For example, to create a test artist:
1. Go to **Table Editor** > **artists**
2. Click **Insert row**
3. Add test data

## Step 7: Test Locally

```bash
npm run dev
```

Visit:
- http://localhost:3000 (Homepage)
- http://localhost:3000/discover (Discovery feed)
- http://localhost:3000/studio (Studio dashboard)

## Step 8: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add Environment Variables (copy from .env.local):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
MPESA_CONSUMER_KEY (when ready)
MPESA_CONSUMER_SECRET (when ready)
AFRICAS_TALKING_API_KEY (when ready)
```

4. Click **Deploy**

## Step 9: Enable Authentication

In Supabase Dashboard:
1. Go to **Authentication** > **Providers**
2. Enable **Phone** provider
3. Configure SMS provider (Twilio or MessageBird)
4. Or use **Email** for now (easier to test)

## Troubleshooting

### "relation does not exist" error
- Run the migration.sql in SQL Editor
- Verify all tables were created in Table Editor

### "Invalid API key" error
- Double-check your SUPABASE keys in .env.local
- Make sure there are no spaces or quotes

### Can't connect to database
- Check that migration.sql was run successfully
- Verify tables exist in Supabase Dashboard > Table Editor

## Next Steps

After setup:
1. Test authentication (sign up/login)
2. Upload a test image
3. Create a test event
4. Integrate M-Pesa (separate guide)
5. Configure SMS (separate guide)

## Support

Issues? Check:
- Supabase logs: Dashboard > Logs
- Vercel logs: Deployment > Functions
- Browser console for client errors

---

**Estimated Setup Time**: 15-20 minutes
**Cost**: $0 (Free tier handles 50k monthly active users)
