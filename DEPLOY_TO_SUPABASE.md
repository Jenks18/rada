# 🚀 Deploy Rada to Supabase

## Step 1: Run Schema Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/icuoxubgxpqzhrmbysxy
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**
4. Copy the entire contents of `supabase-schema.sql`
5. Paste it into the SQL editor
6. Click **"Run"** (or press Cmd/Ctrl + Enter)

You should see: ✅ Success. No rows returned

## Step 2: Seed Sample Data

1. Still in the SQL Editor, click **"New query"** again
2. Copy the entire contents of `supabase-seed.sql`
3. Paste it into the SQL editor
4. Click **"Run"**

You should see: ✅ Success

## Step 3: Verify Tables Created

1. Click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - users
   - artists
   - custom_links
   - events
   - ticket_types
   - tickets
   - fan_profiles
   - drops
   - submissions
   - merchandise
   - broadcasts

## Step 4: Test the Connection

Run this in your terminal:

```bash
node test-supabase.js
```

Expected output:
```
✅ Supabase connection successful!
✅ Database tables exist
```

## Step 5: Start Your App

```bash
npm run dev
```

Then visit:
- http://localhost:3000/nviiri
- http://localhost:3000/sautisol

## ✅ What's Changed

✅ **Removed Prisma** - No more `prisma` imports
✅ **Using Supabase Client** - Direct database access
✅ **Native SQL** - Tables created with SQL migrations
✅ **Row Level Security** - Built-in security policies
✅ **Real-time Ready** - Can add subscriptions later

## 📊 Sample Data

After seeding, you'll have:
- 3 users (2 artists, 1 fan)
- 2 artists (Nviiri, Sauti Sol)
- 1 event with 3 ticket types
- 5 custom links
- 1 active drop
- 2 merchandise items

## 🔧 If Something Goes Wrong

### Tables already exist?
Run this in SQL Editor to drop all tables:
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```
Then run the schema again.

### Can't connect?
Check your `.env` file has:
```
NEXT_PUBLIC_SUPABASE_URL=https://icuoxubgxpqzhrmbysxy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_38ySFPoGUmKP38VuXK17dQ_WUTs_S2J
```

## 🎯 Next: Remove Prisma Dependencies

```bash
npm uninstall prisma @prisma/client
rm -rf prisma/
rm test.js
```

Your app now runs 100% on Supabase! 🎉
