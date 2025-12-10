import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create a test artist user
  const hashedPassword = await bcrypt.hash('password123', 10)

  const artistUser = await prisma.user.create({
    data: {
      phoneNumber: '254712345678',
      email: 'nviiri@example.com',
      name: 'Nviiri the Storyteller',
      role: 'ARTIST',
      password: hashedPassword,
      verified: true,
    },
  })

  // Create artist profile
  const artist = await prisma.artist.create({
    data: {
      userId: artistUser.id,
      stageName: 'Nviiri the Storyteller',
      slug: 'nviiri',
      bio: 'Award-winning Kenyan artist and songwriter. Member of Sol Generation.',
      genre: ['Afro-Pop', 'R&B', 'Soul'],
      location: 'Nairobi, Kenya',
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
      themeColor: '#8B5CF6',
      bookingWhatsApp: '254712345678',
      instagram: 'nviirithestoryteller',
      twitter: 'nviiri_',
      spotify: 'https://open.spotify.com/artist/example',
      youtube: 'https://youtube.com/@nviiri',
      skizaTuneCode: '123456',
      isVerified: true,
      isPro: true,
    },
  })

  // Create custom links
  await prisma.customLink.createMany({
    data: [
      {
        artistId: artist.id,
        title: '🎵 Latest Album - "Kitenge"',
        url: 'https://open.spotify.com/album/example',
        icon: '🎵',
        order: 1,
      },
      {
        artistId: artist.id,
        title: '📸 Follow on Instagram',
        url: 'https://instagram.com/nviirithestoryteller',
        icon: '📸',
        order: 2,
      },
      {
        artistId: artist.id,
        title: '🎬 Watch "Pombe Sigara" Video',
        url: 'https://youtube.com/watch?v=example',
        icon: '🎬',
        order: 3,
      },
    ],
  })

  // Create an upcoming event
  const event = await prisma.event.create({
    data: {
      artistId: artist.id,
      title: 'Nviiri Live at The Alchemist',
      slug: 'nviiri-alchemist-dec-2025',
      description: 'An intimate evening with Nviiri the Storyteller. Experience his greatest hits and new music.',
      coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200',
      venue: 'The Alchemist Bar',
      address: 'Muthangari Drive, Westlands',
      city: 'Nairobi',
      coordinates: '-1.2674,36.8025',
      startDate: new Date('2025-12-15T20:00:00Z'),
      endDate: new Date('2025-12-15T23:59:59Z'),
      doors: '7:00 PM',
      totalCapacity: 200,
      isPublished: true,
      isFeatured: true,
      allowGuestList: true,
    },
  })

  // Create ticket types
  await prisma.ticketType.createMany({
    data: [
      {
        eventId: event.id,
        name: 'Early Bird',
        description: 'Limited early bird tickets',
        price: 1500,
        quantity: 50,
        isActive: true,
        salesStart: new Date('2025-11-20T00:00:00Z'),
        salesEnd: new Date('2025-11-30T23:59:59Z'),
      },
      {
        eventId: event.id,
        name: 'General Admission',
        description: 'Standard entry ticket',
        price: 2000,
        quantity: 100,
        isActive: true,
        salesStart: new Date('2025-11-20T00:00:00Z'),
        salesEnd: new Date('2025-12-15T18:00:00Z'),
      },
      {
        eventId: event.id,
        name: 'VIP',
        description: 'VIP section with complimentary drink',
        price: 3500,
        quantity: 50,
        isActive: true,
        salesStart: new Date('2025-11-20T00:00:00Z'),
        salesEnd: new Date('2025-12-15T18:00:00Z'),
      },
    ],
  })

  // Create another artist
  const artistUser2 = await prisma.user.create({
    data: {
      phoneNumber: '254722345678',
      email: 'sauti@example.com',
      name: 'Sauti Sol',
      role: 'ARTIST',
      password: hashedPassword,
      verified: true,
    },
  })

  const artist2 = await prisma.artist.create({
    data: {
      userId: artistUser2.id,
      stageName: 'Sauti Sol',
      slug: 'sautisol',
      bio: 'Multi-award winning Kenyan afro-pop band formed in Nairobi.',
      genre: ['Afro-Pop', 'Afro-Soul'],
      location: 'Nairobi, Kenya',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200',
      themeColor: '#F59E0B',
      bookingWhatsApp: '254722345678',
      instagram: 'sautisol',
      twitter: 'sautisol',
      spotify: 'https://open.spotify.com/artist/sautisol',
      isVerified: true,
    },
  })

  await prisma.customLink.createMany({
    data: [
      {
        artistId: artist2.id,
        title: '🎤 Book Us for Your Event',
        url: 'https://wa.me/254722345678',
        icon: '🎤',
        order: 1,
      },
      {
        artistId: artist2.id,
        title: '🎧 Stream "Midnight Train"',
        url: 'https://open.spotify.com/album/example',
        icon: '🎧',
        order: 2,
      },
    ],
  })

  // Create a fan user
  const fanUser = await prisma.user.create({
    data: {
      phoneNumber: '254733445566',
      email: 'fan@example.com',
      name: 'Jane Wanjiku',
      role: 'FAN',
      password: hashedPassword,
      verified: true,
    },
  })

  // Create a Drop (submission campaign)
  const drop = await prisma.drop.create({
    data: {
      artistId: artist.id,
      title: 'Pombe Sigara Challenge',
      slug: 'pombe-sigara-challenge',
      description: 'Show us your best dance moves to "Pombe Sigara"! Winner gets VIP tickets to the next show.',
      coverImage: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800',
      isActive: true,
      requiresApproval: true,
      allowedTypes: ['video', 'link'],
      opensAt: new Date('2025-11-20T00:00:00Z'),
      closesAt: new Date('2025-12-31T23:59:59Z'),
      prize: '2x VIP Tickets + Meet & Greet',
    },
  })

  // Create merchandise
  await prisma.merchandise.createMany({
    data: [
      {
        artistId: artist.id,
        name: 'Nviiri T-Shirt',
        description: 'Official Nviiri merchandise',
        price: 1200,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'],
        stock: 50,
        isDigital: false,
        isActive: true,
      },
      {
        artistId: artist.id,
        name: 'Signed Album Download',
        description: 'Digitally signed album with exclusive tracks',
        price: 800,
        images: ['https://images.unsplash.com/photo-1619983081563-430f63602796?w=600'],
        isDigital: true,
        isActive: true,
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log('\n📊 Created:')
  console.log('  - 3 users (2 artists, 1 fan)')
  console.log('  - 2 artists (Nviiri, Sauti Sol)')
  console.log('  - 1 event (Nviiri at The Alchemist)')
  console.log('  - 3 ticket types (Early Bird, GA, VIP)')
  console.log('  - 5 custom links')
  console.log('  - 1 drop (Pombe Sigara Challenge)')
  console.log('  - 2 merchandise items')
  console.log('\n🌐 Test URLs:')
  console.log('  - http://localhost:3000/nviiri')
  console.log('  - http://localhost:3000/sautisol')
  console.log('\n🔐 Test Login:')
  console.log('  - Phone: 254712345678')
  console.log('  - Password: password123')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
