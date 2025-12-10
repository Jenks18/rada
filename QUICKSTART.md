# 🚀 Rada - Quick Start Guide

## ✅ Current Status: RUNNING!

Your Rada application is live at: **http://localhost:3000**

## 📍 What You Can See Right Now

### 1. Homepage
```
http://localhost:3000
```
- Marketing landing page
- Call-to-action buttons
- Feature showcase

### 2. Nviiri's Artist Page
```
http://localhost:3000/nviiri
```
✨ **Live Demo Features**:
- Purple gradient theme
- Cover image with profile
- Nairobi location badge
- Social media icons (Instagram, Twitter, YouTube)
- WhatsApp booking button
- Skiza Tune widget (*811*123456#)
- 3 custom links:
  - 🎵 Latest Album - "Kitenge"
  - 📸 Follow on Instagram
  - 🎬 Watch "Pombe Sigara" Video
- Upcoming event card:
  - Nviiri Live at The Alchemist
  - December 15, 2025
  - From KES 1,500
- Merchandise section (2 items)

### 3. Sauti Sol's Page
```
http://localhost:3000/sautisol
```
- Orange theme
- 2 custom links
- Different artist style

## 🎯 Test Scenarios

### Scenario 1: Browse as a Fan
1. Go to http://localhost:3000/nviiri
2. Scroll through the page
3. Click on custom links (open in new tab)
4. See the event details
5. Check merchandise

### Scenario 2: View Event
1. On Nviiri's page, find "Nviiri Live at The Alchemist"
2. See ticket prices (KES 1,500 - 3,500)
3. Note: Clicking will try to go to `/events/nviiri-alchemist-dec-2025` (needs UI)

### Scenario 3: Mobile View
1. Open http://localhost:3000/nviiri
2. Resize browser to mobile size (375px)
3. Notice:
   - Single column layout
   - Touch-friendly buttons (44px minimum)
   - Optimized images
   - Fast loading

### Scenario 4: Different Artist
1. Go to http://localhost:3000/sautisol
2. See completely different theme (orange vs purple)
3. Different content and links

## 🧪 Testing the APIs

### Test 1: Fetch Artist Data
```bash
curl http://localhost:3000/api/artists/nviiri | python3 -m json.tool
```

Expected: JSON with artist profile, links, events, merchandise

### Test 2: Test Database
```bash
node test.js
```

Expected: All green checkmarks ✅

### Test 3: View Database in Browser
```bash
npx prisma studio
```

Opens: http://localhost:5555
- Browse all tables
- Edit data visually
- See relationships

## 📱 Mobile Testing (Responsive Design)

The page adapts to these breakpoints:
- **Mobile**: < 768px (default, mobile-first)
- **Tablet**: 768px - 1024px (md:)
- **Desktop**: > 1024px (lg:)

Test by resizing browser or using DevTools (F12 → Toggle Device Toolbar)

## 🎨 Customization Demo

Want to see theme changes? Edit the database:

```bash
npx prisma studio
```

1. Go to "Artist" table
2. Find Nviiri
3. Change `themeColor` from `#8B5CF6` to:
   - `#EF4444` (Red)
   - `#10B981` (Green)
   - `#F59E0B` (Orange)
4. Refresh http://localhost:3000/nviiri

## 📊 What's in the Database

Run `node test.js` to see:

```
✅ 3 users (2 artists, 1 fan)
✅ 2 artist profiles
✅ 1 published event
✅ 3 ticket types (Early Bird, GA, VIP)
✅ 5 custom links
✅ 1 active drop
✅ 2 merchandise items
```

## 🔥 Hot Features You Can Test

### 1. Artist Profile System ✅
- Unique slugs (rada.to/[slug])
- Custom themes
- Social integration
- Skiza Tune codes

### 2. Event Display ✅
- Event cards on artist pages
- Multiple ticket types
- Price display
- Venue information

### 3. Custom Links ✅
- Drag-and-drop ordering (via `order` field)
- Click tracking (API ready)
- Icon/emoji support
- External links

### 4. Merchandise Showcase ✅
- Product cards
- Image galleries
- Price display
- Digital vs physical products

### 5. Mobile Optimization ✅
- Data-lite mode
- Fast loading on 3G
- Touch-friendly UI
- WhatsApp integration

## 🎯 What Works vs What Needs UI

### ✅ Working End-to-End
- Artist profile pages
- Event information display
- Link aggregation
- Responsive design
- Database queries
- API endpoints

### 🔧 API Ready (Needs UI)
- Ticket purchasing (M-Pesa integration exists)
- Fan registration (user system exists)
- SMS notifications (service configured)
- Analytics tracking (database tables ready)
- Broadcast system (API endpoints ready)

## 💡 Pro Tips

### Tip 1: Use Prisma Studio
```bash
npx prisma studio
```
Visual database editor - much easier than SQL!

### Tip 2: Check Logs
The terminal running `npm run dev` shows:
- Compilation status
- API requests
- Errors (if any)

### Tip 3: Hot Reload
Edit any file and save - the page updates automatically!

### Tip 4: Test on Phone
1. Get your IP: `ifconfig | grep inet`
2. Open `http://[YOUR_IP]:3000/nviiri` on phone
3. Connect to same WiFi network

## 🚨 If Something Breaks

### Problem: Page won't load
**Solution**: 
```bash
# Restart the server
# Press Ctrl+C in terminal
npm run dev
```

### Problem: Database error
**Solution**:
```bash
# Regenerate Prisma client
npx prisma generate

# Check database is running
brew services list | grep postgresql
```

### Problem: "Artist not found"
**Solution**:
```bash
# Reseed the database
npx tsx prisma/seed.ts
```

## 📚 Learn More

- `README.md` - Full documentation
- `DEVELOPMENT.md` - Developer guide
- `STATUS.md` - What's working
- `prisma/schema.prisma` - Database structure

## 🎊 You're All Set!

Your Rada platform is:
- ✅ Running on http://localhost:3000
- ✅ Connected to PostgreSQL
- ✅ Populated with sample data
- ✅ Ready for development

### Next Actions:
1. Browse http://localhost:3000/nviiri
2. Explore the artist page features
3. Check responsive design (resize browser)
4. View database in Prisma Studio
5. Start building new features!

---

**Need Help?** Check the logs in the terminal running `npm run dev`

**Everything Working?** Start building the dashboard UI! 🚀
