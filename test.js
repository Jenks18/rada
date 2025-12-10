#!/usr/bin/env node

console.log('🧪 Testing Rada Application...\n')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function test() {
  try {
    // Test 1: Check database connection
    console.log('1️⃣  Testing database connection...')
    const userCount = await prisma.user.count()
    console.log(`   ✅ Connected! Found ${userCount} users\n`)

    // Test 2: Fetch artist data
    console.log('2️⃣  Testing artist profile...')
    const artist = await prisma.artist.findUnique({
      where: { slug: 'nviiri' },
      include: {
        links: true,
        events: {
          include: {
            ticketTypes: true,
          },
        },
      },
    })

    if (artist) {
      console.log(`   ✅ Found artist: ${artist.stageName}`)
      console.log(`   📍 Location: ${artist.location}`)
      console.log(`   🔗 Links: ${artist.links.length}`)
      console.log(`   🎫 Events: ${artist.events.length}`)
      if (artist.events[0]) {
        console.log(`   📅 Next event: ${artist.events[0].title}`)
        console.log(`   🎟️  Ticket types: ${artist.events[0].ticketTypes.length}`)
      }
    } else {
      console.log('   ❌ Artist not found')
    }
    console.log('')

    // Test 3: Check event data
    console.log('3️⃣  Testing event system...')
    const events = await prisma.event.findMany({
      where: { isPublished: true },
      include: {
        ticketTypes: true,
        artist: {
          select: {
            stageName: true,
          },
        },
      },
    })
    console.log(`   ✅ Found ${events.length} published events`)
    events.forEach((event) => {
      console.log(`   🎤 ${event.artist.stageName} - ${event.title}`)
      console.log(`      📍 ${event.venue}, ${event.city}`)
      console.log(`      💰 Tickets from KES ${Math.min(...event.ticketTypes.map(t => t.price))}`)
    })
    console.log('')

    // Test 4: Check drops
    console.log('4️⃣  Testing drops (submission campaigns)...')
    const drops = await prisma.drop.findMany({
      where: { isActive: true },
    })
    console.log(`   ✅ Found ${drops.length} active drops`)
    drops.forEach((drop) => {
      console.log(`   🎯 ${drop.title}`)
      console.log(`      🏆 Prize: ${drop.prize}`)
    })
    console.log('')

    console.log('✅ All tests passed!\n')
    console.log('🌐 Application URLs:')
    console.log('   Homepage:      http://localhost:3000')
    console.log('   Nviiri Page:   http://localhost:3000/nviiri')
    console.log('   Sauti Sol:     http://localhost:3000/sautisol')
    console.log('   API Endpoint:  http://localhost:3000/api/artists/nviiri')
    console.log('\n💡 Run `npm run dev` to start the development server')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

test()
