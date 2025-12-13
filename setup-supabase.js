#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

require('dotenv').config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function setupSupabase() {
  console.log('🚀 Setting up Rada on Supabase...\n')
  console.log('⚠️  Note: Tables must be created via SQL Editor first')
  console.log('    Opening SQL Editor now...\n')
  
  // Open SQL editor
  const { exec } = require('child_process')
  exec('open "https://supabase.com/dashboard/project/icuoxubgxpqzhrmbysxy/sql/new"')
  
  console.log('📋 STEP 1: Copy this schema and run in SQL Editor:')
  console.log('─'.repeat(60))
  console.log('File: supabase-schema.sql')
  console.log('─'.repeat(60))
  
  // Wait for user
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  await new Promise(resolve => {
    readline.question('\nPress Enter after running the schema...', () => {
      readline.close()
      resolve()
    })
  })
  
  console.log('\n🌱 Inserting sample data...')
  
  try {
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    // Insert users
    console.log('Creating users...')
    const { data: users, error: userError } = await supabase
      .from('users')
      .insert([
        {
          phone_number: '254712345678',
          email: 'nviiri@example.com',
          name: 'Nviiri the Storyteller',
          role: 'ARTIST',
          password: hashedPassword,
          verified: true
        },
        {
          phone_number: '254722345678',
          email: 'sauti@example.com',
          name: 'Sauti Sol',
          role: 'ARTIST',
          password: hashedPassword,
          verified: true
        },
        {
          phone_number: '254733445566',
          email: 'fan@example.com',
          name: 'Jane Wanjiku',
          role: 'FAN',
          password: hashedPassword,
          verified: true
        }
      ])
      .select()
    
    if (userError) throw userError
    console.log('✅ Users created')
    
    // Insert artists
    console.log('Creating artists...')
    const { data: artists, error: artistError } = await supabase
      .from('artists')
      .insert([
        {
          user_id: users[0].id,
          stage_name: 'Nviiri the Storyteller',
          slug: 'nviiri',
          bio: 'Award-winning Kenyan artist and songwriter. Member of Sol Generation.',
          genre: ['Afro-Pop', 'R&B', 'Soul'],
          location: 'Nairobi, Kenya',
          cover_image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
          theme_color: '#8B5CF6',
          booking_whatsapp: '254712345678',
          instagram: 'nviirithestoryteller',
          twitter: 'nviiri_',
          spotify: 'https://open.spotify.com/artist/example',
          youtube: 'https://youtube.com/@nviiri',
          skiza_tune_code: '123456',
          is_verified: true,
          is_pro: true
        },
        {
          user_id: users[1].id,
          stage_name: 'Sauti Sol',
          slug: 'sautisol',
          bio: 'Multi-award winning Kenyan afro-pop band formed in Nairobi.',
          genre: ['Afro-Pop', 'Afro-Soul'],
          location: 'Nairobi, Kenya',
          cover_image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200',
          theme_color: '#F59E0B',
          booking_whatsapp: '254722345678',
          instagram: 'sautisol',
          twitter: 'sautisol',
          spotify: 'https://open.spotify.com/artist/sautisol',
          is_verified: true
        }
      ])
      .select()
    
    if (artistError) throw artistError
    console.log('✅ Artists created')
    
    // Insert custom links
    console.log('Creating custom links...')
    await supabase.from('custom_links').insert([
      {
        artist_id: artists[0].id,
        title: '🎵 Latest Album - "Kitenge"',
        url: 'https://open.spotify.com/album/example',
        icon: '🎵',
        order: 1
      },
      {
        artist_id: artists[0].id,
        title: '📸 Follow on Instagram',
        url: 'https://instagram.com/nviirithestoryteller',
        icon: '📸',
        order: 2
      },
      {
        artist_id: artists[0].id,
        title: '🎬 Watch "Pombe Sigara" Video',
        url: 'https://youtube.com/watch?v=example',
        icon: '🎬',
        order: 3
      },
      {
        artist_id: artists[1].id,
        title: '🎤 Book Us for Your Event',
        url: 'https://wa.me/254722345678',
        icon: '🎤',
        order: 1
      },
      {
        artist_id: artists[1].id,
        title: '🎧 Stream "Midnight Train"',
        url: 'https://open.spotify.com/album/example',
        icon: '🎧',
        order: 2
      }
    ])
    console.log('✅ Custom links created')
    
    // Insert event
    console.log('Creating event...')
    const { data: events, error: eventError } = await supabase
      .from('events')
      .insert([{
        artist_id: artists[0].id,
        title: 'Nviiri Live at The Alchemist',
        slug: 'nviiri-alchemist-dec-2025',
        description: 'An intimate evening with Nviiri the Storyteller.',
        cover_image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200',
        venue: 'The Alchemist Bar',
        address: 'Muthangari Drive, Westlands',
        city: 'Nairobi',
        coordinates: '-1.2674,36.8025',
        start_date: '2025-12-15T20:00:00Z',
        end_date: '2025-12-15T23:59:59Z',
        doors: '7:00 PM',
        total_capacity: 200,
        is_published: true,
        is_featured: true
      }])
      .select()
    
    if (eventError) throw eventError
    console.log('✅ Event created')
    
    // Insert ticket types
    console.log('Creating ticket types...')
    await supabase.from('ticket_types').insert([
      {
        event_id: events[0].id,
        name: 'Early Bird',
        description: 'Limited early bird tickets',
        price: 1500,
        quantity: 50,
        is_active: true
      },
      {
        event_id: events[0].id,
        name: 'General Admission',
        description: 'Standard entry ticket',
        price: 2000,
        quantity: 100,
        is_active: true
      },
      {
        event_id: events[0].id,
        name: 'VIP',
        description: 'VIP section with complimentary drink',
        price: 3500,
        quantity: 50,
        is_active: true
      }
    ])
    console.log('✅ Ticket types created')
    
    // Insert drop
    console.log('Creating drop...')
    await supabase.from('drops').insert([{
      artist_id: artists[0].id,
      title: 'Pombe Sigara Challenge',
      slug: 'pombe-sigara-challenge',
      description: 'Show us your best dance moves!',
      cover_image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800',
      is_active: true,
      requires_approval: true,
      allowed_types: ['video', 'link'],
      prize: '2x VIP Tickets + Meet & Greet'
    }])
    console.log('✅ Drop created')
    
    // Insert merchandise
    console.log('Creating merchandise...')
    await supabase.from('merchandise').insert([
      {
        artist_id: artists[0].id,
        name: 'Nviiri T-Shirt',
        description: 'Official Nviiri merchandise',
        price: 1200,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'],
        stock: 50,
        is_active: true
      },
      {
        artist_id: artists[0].id,
        name: 'Signed Album Download',
        description: 'Digitally signed album',
        price: 800,
        images: ['https://images.unsplash.com/photo-1619983081563-430f63602796?w=600'],
        is_digital: true,
        is_active: true
      }
    ])
    console.log('✅ Merchandise created')
    
    console.log('\n🎉 Setup complete!')
    console.log('\n🌐 Test your app:')
    console.log('   http://localhost:3000/nviiri')
    console.log('   http://localhost:3000/sautisol')
    
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.log('\nMake sure you ran the schema SQL first!')
  }
}

setupSupabase()
