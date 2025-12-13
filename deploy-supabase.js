#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

require('dotenv').config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Using admin key
)

async function deploySchema() {
  console.log('🚀 Deploying Rada schema to Supabase...\n')

  try {
    // Read the SQL schema file
    const schema = fs.readFileSync('supabase-schema.sql', 'utf8')
    
    console.log('📝 Running schema migration...')
    const { data, error } = await supabase.rpc('exec_sql', { sql: schema })
    
    if (error) {
      // Try direct query instead
      console.log('⚡ Executing schema directly...')
      const { error: execError } = await supabase.from('_sql').insert({ query: schema })
      
      if (execError) {
        throw new Error(`Schema migration failed: ${execError.message}`)
      }
    }
    
    console.log('✅ Schema created successfully!\n')
    
    // Now seed the data
    console.log('🌱 Seeding sample data...')
    const seed = fs.readFileSync('supabase-seed.sql', 'utf8')
    
    const { error: seedError } = await supabase.rpc('exec_sql', { sql: seed })
    
    if (seedError) {
      throw new Error(`Seeding failed: ${seedError.message}`)
    }
    
    console.log('✅ Data seeded successfully!\n')
    
    // Verify
    console.log('🔍 Verifying tables...')
    const { data: artists, error: verifyError } = await supabase
      .from('artists')
      .select('stage_name, slug')
      .limit(5)
    
    if (verifyError) {
      throw new Error(`Verification failed: ${verifyError.message}`)
    }
    
    console.log('✅ Found artists:')
    artists.forEach(a => console.log(`   - ${a.stage_name} (/${a.slug})`))
    
    console.log('\n🎉 Deployment complete!')
    console.log('\n🌐 Test your app:')
    console.log('   http://localhost:3000/nviiri')
    console.log('   http://localhost:3000/sautisol')
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message)
    console.log('\n💡 Manual deployment required:')
    console.log('   1. Open: https://supabase.com/dashboard/project/icuoxubgxpqzhrmbysxy/sql/new')
    console.log('   2. Copy contents of: supabase-schema.sql')
    console.log('   3. Paste and run')
    console.log('   4. Repeat with: supabase-seed.sql')
  }
}

deploySchema()
