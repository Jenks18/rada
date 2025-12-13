#!/usr/bin/env node

console.log('🔧 Testing Supabase Connection...\n')

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('📋 Configuration Check:')
console.log('  Supabase URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
console.log('  Anon Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
console.log('')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('🔌 Testing Supabase connection...')
    
    // Test basic connection
    const { data, error } = await supabase.from('User').select('count').limit(1)
    
    if (error) {
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('⚠️  Connection successful but tables not created yet')
        console.log('   Run: npx prisma db push')
        return
      }
      throw error
    }
    
    console.log('✅ Supabase connection successful!')
    console.log('✅ Database tables exist')
    console.log('')
    
    // Test Prisma connection
    console.log('🗄️  Testing Prisma connection...')
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    
    const userCount = await prisma.user.count()
    console.log(`✅ Prisma connected! Found ${userCount} users`)
    
    await prisma.$disconnect()
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    console.log('')
    console.log('💡 Troubleshooting:')
    console.log('   1. Check your DATABASE_URL has the correct password')
    console.log('   2. Go to: https://supabase.com/dashboard/project/icuoxubgxpqzhrmbysxy/settings/database')
    console.log('   3. Copy the connection string with password')
    console.log('   4. Update DATABASE_URL and DIRECT_URL in .env')
    console.log('   5. Run: npx prisma db push')
    process.exit(1)
  }
}

testConnection()
