# Database Setup Guide

Your Rada app is deployed and working! But the database is empty. Follow these steps to add data.

## Quick Setup (5 minutes)

### 1. Go to Supabase SQL Editor

Open your Supabase project: https://app.supabase.com/project/_/sql

### 2. Run the Migration (If not done already)

Copy and paste the contents of `supabase/migration.sql` into the SQL Editor and click **RUN**.

This creates all the tables.

### 3. Run the Seed Data

Copy and paste the contents of `supabase/seed.sql` into the SQL Editor and click **RUN**.

This creates:
- ✅ Nviiri the Storyteller artist profile
- ✅ Custom links (Spotify, YouTube, WhatsApp)
- ✅ An upcoming event at The Alchemist (Dec 20, 2025)
- ✅ 3 ticket types (Early Bird, General, VIP)
- ✅ 2 merchandise items (T-shirt, Hoodie)

### 4. Visit Your Artist Page

After running the seed, visit:
👉 **https://rada-tau.vercel.app/nviiri**

You should now see:
- Artist bio and social links
- Custom link buttons
- Upcoming event with ticket prices
- Merchandise items

## What's Working Now

✅ **Deployment** - App is live on Vercel  
✅ **API Routes** - All endpoints working  
✅ **Supabase** - Database connected  
⏳ **Data** - Needs to be added (run seed.sql)

## Next Steps

1. **Run the seed** to see the demo working
2. **Add your Supabase credentials** to `.env.local` for local development
3. **Test ticket purchases** (M-Pesa sandbox)
4. **Add more artists** through SQL or build the admin UI

## Database Tables Created

- `users` - User accounts
- `artists` - Artist profiles
- `custom_links` - Artist custom link buttons
- `events` - Concert/show listings
- `ticket_types` - Different ticket tiers
- `tickets` - Individual purchased tickets
- `merchandise` - Artist merch items
- `fan_profiles` - CRM data per artist
- `drops` - Content submission campaigns
- `broadcasts` - SMS/WhatsApp campaigns
- `submissions` - Fan-submitted content
- `transactions` - Payment records

## Troubleshooting

**"Artist not found" error**
- Run `migration.sql` first, then `seed.sql`

**"Column does not exist" error**
- Check table names use snake_case (e.g., `stage_name` not `stageName`)
- Make sure migration.sql ran successfully

**Page still empty after seed**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check Supabase logs for errors

---

Need help? Check the Supabase dashboard logs or API response in browser DevTools.
