# 🔐 Complete Your Supabase Setup

## ⚡ Quick Action Required

I've opened your Supabase dashboard. Please complete these 3 steps:

## Step 1: Get Your API Keys (Currently Open in Browser)

On the page that just opened (`https://supabase.com/dashboard/project/icuoxubgxpqzhrmbysxy/settings/api`):

1. **Copy the full `anon` `public` key** - It should look like:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljdm94dWJneHBxemhybWJ5c3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMTg5ODUsImV4cCI6MjA0OTY5NDk4NX0.LONG_STRING_HERE
   ```

2. **Copy the `service_role` `secret` key** (optional, but recommended)

## Step 2: Get Your Database Password

1. In the Supabase dashboard sidebar, click **"Settings"** > **"Database"**
2. Scroll to **"Connection string"** section
3. Click **"URI"** tab
4. You'll see something like:
   ```
   postgresql://postgres.icuoxubgxpqzhrmbysxy:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
5. **Copy the password** (the part after the `:` and before the `@`)

OR if you don't have it:
- Click **"Reset database password"**
- Copy the new password immediately (you can't see it again!)

## Step 3: Update Your `.env` File

Open `/Users/iannjenga/Desktop/rada/.env` and replace these values:

```bash
# Replace NEXT_PUBLIC_SUPABASE_ANON_KEY with the full JWT token from Step 1
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_FULL_TOKEN_HERE"

# Replace YOUR_DATABASE_PASSWORD with the password from Step 2
DATABASE_URL="postgresql://postgres.icuoxubgxpqzhrmbysxy:YOUR_DATABASE_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.icuoxubgxpqzhrmbysxy:YOUR_DATABASE_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# Optional but recommended
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY_HERE"
```

## Step 4: Test & Deploy to Supabase

After updating `.env`, run these commands:

```bash
# Test connection
node test-supabase.js

# Create tables in Supabase
npx prisma db push

# Seed with sample data
npx tsx prisma/seed.ts

# Test again
node test.js

# Start the app
npm run dev
```

## ✅ Expected Success Output

After running `node test-supabase.js`, you should see:

```
✅ Supabase connection successful!
✅ Database tables exist
✅ Prisma connected! Found X users
```

## 🚨 Common Issues

### Issue: "Invalid API key"
**Cause**: The anon key is incomplete or incorrect
**Fix**: Copy the FULL key from the dashboard (it's very long, ~300 characters)

### Issue: "password authentication failed"
**Cause**: Wrong database password
**Fix**: Reset your password in Supabase dashboard and update .env

### Issue: "relation does not exist"
**Cause**: Tables not created yet
**Fix**: Run `npx prisma db push`

## 📍 Direct Links

- **API Keys**: https://supabase.com/dashboard/project/icuoxubgxpqzhrmbysxy/settings/api
- **Database Settings**: https://supabase.com/dashboard/project/icuoxubgxpqzhrmbysxy/settings/database
- **Your Project**: https://supabase.com/dashboard/project/icuoxubgxpqzhrmbysxy

## 💡 What You Currently Have

✅ Supabase URL: `https://icuoxubgxpqzhrmbysxy.supabase.co`
❌ Anon Key: Incomplete (needs full JWT token)
❌ Database Password: Not set yet

---

**Once you have the credentials**, just paste them into `.env` and run:
```bash
node test-supabase.js
```

Let me know when you have the keys and I'll help you complete the setup! 🚀
