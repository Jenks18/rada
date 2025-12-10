# Rada - The Operating System for Kenyan Artists

Rada is an all-in-one digital infrastructure built for modern Kenyan musicians. It combines a beautiful landing page builder (Komi), powerful event ticketing with M-Pesa (Posh), and deep fan analytics (Cobrand) into one cohesive platform.

## 🎯 Features

### For Artists (Studio Dashboard)
- **Smart Landing Pages**: Mobile-optimized "Link-in-Bio" pages with Skiza Tune integration
- **Event Management**: Create events, manage tickets, track sales
- **M-Pesa Ticketing**: Native mobile money integration - no credit cards needed
- **Fan CRM**: Track spending, identify superfans, build phone number database
- **Broadcast Tools**: Send SMS/WhatsApp messages to fan segments
- **Drops (Submission Portal)**: Run challenges, collect fan content, A&R submissions
- **Channel Manager**: Aggregate stats from Spotify, YouTube, TikTok, Instagram
- **Analytics**: Real-time insights on ticket sales, page views, fan behavior

### For Fans (Discovery App)
- **Event Feed**: Discover concerts happening in Nairobi, Mombasa, Kisumu
- **One-Tap Tickets**: Buy via M-Pesa, receive QR codes via SMS/WhatsApp
- **Artist Profiles**: Beautiful mobile-first artist pages
- **Submit to Drops**: Participate in challenges and contests

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Payments**: Safaricom M-Pesa (Daraja API)
- **SMS**: Africa's Talking
- **File Storage**: Cloudinary
- **Authentication**: NextAuth.js

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- M-Pesa Developer Account (Safaricom Daraja)
- Africa's Talking Account
- Cloudinary Account

### Installation

1. **Clone the repository**
```bash
cd /Users/iannjenga/Desktop/rada
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:
- Database connection string
- M-Pesa API credentials (from Daraja portal)
- Africa's Talking API key
- Cloudinary credentials
- Social media API keys (optional)

4. **Set up the database**
```bash
npm run db:push
```

This will create all tables in your PostgreSQL database.

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📱 M-Pesa Integration Setup

### 1. Register on Daraja Portal
- Go to https://developer.safaricom.co.ke/
- Create an account and create a new app
- Get your Consumer Key and Consumer Secret

### 2. Configure STK Push
- In your app, enable Lipa Na M-Pesa Online (STK Push)
- Get your Passkey from the Daraja portal
- Note your Business Shortcode (174379 for sandbox)

### 3. Set up Callback URL
Your callback URL should be publicly accessible:
```
https://yourdomain.com/api/mpesa/callback
```

For local development, use ngrok:
```bash
ngrok http 3000
```

Then update your `.env`:
```
MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/mpesa/callback
```

### 4. Test with Sandbox
Use these test credentials:
- Phone: 254708374149
- PIN: Any 4 digits in sandbox mode

## 📨 SMS Integration (Africa's Talking)

1. Sign up at https://africastalking.com/
2. Get your API Key and Username
3. Buy SMS credits (Kenya rates: ~KES 0.80 per SMS)
4. Add credentials to `.env`

## 🗄️ Database Schema

The database includes these main models:

- **User**: Accounts (artists, managers, fans)
- **Artist**: Artist profiles with customization
- **Event**: Concerts and shows
- **Ticket**: Individual tickets with QR codes
- **FanProfile**: CRM data for each fan-artist relationship
- **Drop**: Content submission campaigns
- **Broadcast**: SMS/WhatsApp campaigns
- **SocialStats**: Social media metrics

## 🎨 Customizing Artist Pages

Artists can customize their pages at `rada.to/[slug]`:

```typescript
// Example: rada.to/nviiri
{
  stageName: "Nviiri the Storyteller",
  slug: "nviiri",
  themeColor: "#8B5CF6", // Purple theme
  coverImage: "https://...",
  bio: "Award-winning Kenyan artist...",
  bookingWhatsApp: "254712345678",
  skizaTuneCode: "123456",
  links: [
    { title: "New Album", url: "https://spotify.com/...", icon: "🎵" },
    { title: "Instagram", url: "https://instagram.com/nviiri", icon: "📸" }
  ]
}
```

## 🎫 Ticket Purchase Flow

1. Fan browses artist page or event feed
2. Selects ticket type and quantity
3. Clicks "Buy with M-Pesa"
4. Enters phone number
5. Receives STK Push prompt on phone
6. Enters M-Pesa PIN
7. Payment processed
8. Ticket delivered via SMS with QR code
9. Fan shows QR at venue for check-in

## 📊 Analytics & CRM

Artists can:
- View total revenue and tickets sold
- See which fans spend the most (superfans)
- Track page views and link clicks
- Send targeted messages to fan segments
- Export fan phone numbers for marketing

Superfan identification:
- Automatically flagged when fan spends > KES 5,000
- Can be manually tagged by artist
- Eligible for VIP perks and early access

## 🔒 Security Features

- Phone number verification for tickets
- QR codes with tamper-proof data
- Offline QR scanning capability for venues
- M-Pesa transaction verification
- Rate limiting on APIs
- CORS protection

## 🌍 Kenya-Specific Optimizations

- **Mobile-First**: Optimized for 3G/4G networks
- **Data-Lite Mode**: Compressed images, lazy loading
- **Phone Numbers**: Primary identifier (not email)
- **M-Pesa Native**: No credit card barriers
- **SMS Delivery**: Works on feature phones
- **Kiswahili Support**: Ready for localization
- **Nairobi Time**: EAT (UTC+3) timezone

## 📁 Project Structure

```
rada/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── artists/       # Artist endpoints
│   │   │   ├── tickets/       # Ticketing endpoints
│   │   │   └── mpesa/         # M-Pesa callbacks
│   │   ├── [slug]/            # Dynamic artist pages
│   │   ├── studio/            # Artist dashboard (TODO)
│   │   ├── discover/          # Fan discovery feed (TODO)
│   │   └── layout.tsx         # Root layout
│   └── lib/
│       ├── prisma.ts          # Database client
│       ├── mpesa.ts           # M-Pesa integration
│       ├── sms.ts             # SMS service
│       └── tickets.ts         # Ticket utilities
├── public/
│   └── manifest.json          # PWA manifest
└── package.json
```

## 🚧 TODO / Roadmap

### Phase 1: MVP (Current)
- [x] Database schema
- [x] M-Pesa integration
- [x] SMS delivery
- [x] Artist landing pages
- [x] Basic ticketing API
- [ ] Authentication system
- [ ] Artist dashboard
- [ ] Event creation UI
- [ ] Fan discovery feed

### Phase 2: Growth
- [ ] WhatsApp Business API integration
- [ ] Advanced analytics dashboard
- [ ] Merchandise store
- [ ] Pre-save campaigns
- [ ] Social media OAuth (Spotify, etc.)
- [ ] Mobile apps (React Native)
- [ ] Offline ticket scanning app

### Phase 3: Scale
- [ ] Multi-currency support (expand to Uganda, Tanzania)
- [ ] Affiliate program for promoters
- [ ] Artist verification badges
- [ ] Trend radar (TikTok monitoring)
- [ ] AI-powered fan insights
- [ ] Print-at-home tickets (PDF)

## 💰 Monetization

- **Free Tier**: Basic landing page, 50 tickets/month
- **Pro Tier**: KES 1,500/month
  - Unlimited tickets
  - Advanced analytics
  - Custom branding
  - Priority support
- **Transaction Fees**: 5-7% on paid tickets
- **Merchandise**: Commission on sales

## 🤝 Contributing

This is a commercial project, but we welcome feedback and bug reports.

## 📄 License

Proprietary - All Rights Reserved

## 🆘 Support

- Email: support@rada.ke
- WhatsApp: +254 XXX XXX XXX
- Docs: https://docs.rada.ke

## 🎉 Made in Kenya

Built with ❤️ in Nairobi for the Kenyan music industry.

---

**Rada** - Own your audience. Sell out shows. Look world-class.
