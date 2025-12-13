# Vercel Deployment Guide for Rada

## Prerequisites

- GitHub repository connected to Vercel
- Supabase project created and configured
- Environment variables ready

## Step 1: Configure Vercel Project

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `github.com/Jenks18/rada`
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `prisma generate && npm run build`
   - **Output Directory**: `.next`

## Step 2: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

### Required Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres?schema=public
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres?schema=public

# App
NEXT_PUBLIC_APP_URL=https://rada.vercel.app
```

### Optional (Add when ready)

```bash
# M-Pesa
MPESA_CONSUMER_KEY=your-key
MPESA_CONSUMER_SECRET=your-secret
MPESA_PASSKEY=your-passkey
MPESA_SHORTCODE=174379
MPESA_ENVIRONMENT=sandbox
MPESA_CALLBACK_URL=https://rada.vercel.app/api/mpesa/callback

# SMS
AFRICAS_TALKING_API_KEY=your-key
AFRICAS_TALKING_USERNAME=your-username

# Social APIs
SPOTIFY_CLIENT_ID=your-id
SPOTIFY_CLIENT_SECRET=your-secret
YOUTUBE_API_KEY=your-key
```

## Step 3: Configure Build Settings

In `vercel.json` (already created):

```json
{
  "buildCommand": "prisma generate && next build",
  "regions": ["sin1"],
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

## Step 4: Configure Supabase for Production

1. In Supabase Dashboard → **Authentication** → **URL Configuration**:
   - Add your Vercel domain: `https://rada.vercel.app`
   - Add redirects: `https://rada.vercel.app/**`

2. In **API Settings**:
   - Enable **Auto Schema Diff** (optional)
   - Set **JWT expiry** to 3600 seconds

3. In **Database** → **Webhooks** (optional):
   - Create webhook for `/api/webhooks/ticket-sold`
   - Trigger on INSERT to Ticket table

## Step 5: Deploy

1. Push code to GitHub:
```bash
git add -A
git commit -m "Add Supabase integration"
git push origin main
```

2. Vercel will automatically:
   - Detect changes
   - Run build
   - Deploy to production

3. Monitor deployment:
   - Go to Vercel Dashboard
   - Check build logs
   - Verify deployment URL

## Step 6: Test Production

Visit your deployment:

1. **Homepage**: `https://rada.vercel.app`
2. **Artist page**: `https://rada.vercel.app/nviiri` (after seeding)
3. **Discover**: `https://rada.vercel.app/discover`
4. **Studio**: `https://rada.vercel.app/studio`

## Step 7: Custom Domain (Optional)

1. In Vercel → Settings → Domains
2. Add your domain: `rada.to` or `rada.co.ke`
3. Update DNS records:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

4. Update Supabase redirect URLs with new domain

## Troubleshooting

### Build fails with "Prisma generate error"
- Check DATABASE_URL is set correctly
- Try adding SHADOW_DATABASE_URL
- Run build locally first

### "Invalid Supabase credentials"
- Double-check environment variables
- No spaces or quotes around values
- Regenerate keys if needed

### Database connection timeout
- Use DIRECT_URL for better performance
- Check Supabase connection pooler settings
- Consider Prisma connection pooling

### API routes timeout
- Increase maxDuration in vercel.json
- Optimize database queries
- Add indexes to frequently queried columns

## Performance Optimization

1. **Enable Edge Functions** (faster responses):
   ```typescript
   export const runtime = 'edge'
   ```

2. **Add ISR** for artist pages:
   ```typescript
   export const revalidate = 60 // Revalidate every 60 seconds
   ```

3. **Image Optimization**:
   ```typescript
   import Image from 'next/image'
   <Image src={url} width={400} height={300} />
   ```

4. **Database Indexes**:
   ```sql
   CREATE INDEX idx_artist_slug ON "Artist"(slug);
   CREATE INDEX idx_event_date ON "Event"(date);
   ```

## Monitoring

1. **Vercel Analytics**: Built-in, tracks Web Vitals
2. **Supabase Logs**: Track database queries
3. **Error Tracking**: Add Sentry (optional)

## Scaling

Free tier includes:
- 100GB bandwidth/month
- Unlimited requests
- 100GB image optimization

Pro tier ($20/mo):
- 1TB bandwidth
- Faster builds
- Preview deployments

## Security Checklist

- [x] Environment variables set
- [x] Database has RLS policies
- [x] API routes validate input
- [x] Storage buckets have access policies
- [x] CORS configured in Supabase
- [ ] Rate limiting enabled (optional)
- [ ] DDoS protection (Cloudflare)

## Post-Deployment

1. Seed database with test data
2. Test ticket purchase flow
3. Test SMS notifications
4. Monitor error logs
5. Set up analytics

---

**Deployment Time**: 5-10 minutes
**Downtime**: 0 seconds (zero-downtime deployments)
