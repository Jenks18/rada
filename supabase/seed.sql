-- Seed data for Rada (Nviiri the Storyteller test data)
-- Run this in Supabase SQL Editor after running migration.sql

-- Insert test user (for Nviiri)
INSERT INTO users (id, phone_number, email, role, created_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', '+254712345678', 'nviiri@rada.to', 'ARTIST', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Nviiri artist profile
INSERT INTO artists (
  id,
  user_id,
  stage_name,
  slug,
  bio,
  genre,
  location,
  cover_image,
  avatar_image,
  theme_color,
  booking_whatsapp,
  instagram,
  tiktok,
  twitter,
  spotify,
  apple_music,
  youtube,
  skiza_tune_code,
  is_verified,
  page_views,
  created_at
)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'Nviiri the Storyteller',
  'nviiri',
  'Award-winning Kenyan artist and songwriter. Member of Sol Generation. Known for hits like "Pombe Sigara" and "Niko Sawa".',
  ARRAY['Afrobeat', 'R&B', 'Gengetone'],
  'Nairobi, Kenya',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop',
  '#8B5CF6',
  '+254712345678',
  'https://instagram.com/nviiri_thestoryteller',
  'https://tiktok.com/@nviiri',
  'https://twitter.com/nviiri_',
  'https://open.spotify.com/artist/nviiri',
  'https://music.apple.com/artist/nviiri',
  'https://youtube.com/@nviiri',
  '123456',
  true,
  0,
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  stage_name = EXCLUDED.stage_name,
  bio = EXCLUDED.bio,
  theme_color = EXCLUDED.theme_color;

-- Insert custom links for Nviiri
INSERT INTO custom_links (id, artist_id, title, url, icon, "order", is_active, created_at)
VALUES
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 'Latest Album - "Kitenge"', 'https://open.spotify.com/album/kitenge', '🎵', 1, true, NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 'Watch "Pombe Sigara" Video', 'https://youtube.com/watch?v=example', '📸', 2, true, NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 'Book Me for Events', 'https://wa.me/254712345678', '📹', 3, true, NOW())
ON CONFLICT DO NOTHING;

-- Insert upcoming event
INSERT INTO events (
  id,
  artist_id,
  title,
  slug,
  description,
  venue,
  city,
  location_lat,
  location_lng,
  start_date,
  end_date,
  cover_image,
  is_published,
  total_revenue,
  total_tickets_sold,
  created_at
)
VALUES (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000002',
  'Nviiri Live at The Alchemist',
  'nviiri-alchemist-dec-2025',
  'Experience an intimate evening with Nviiri the Storyteller. Live performances of all your favorite hits plus new unreleased music.',
  'The Alchemist Bar',
  'Nairobi',
  -1.2921,
  36.8219,
  '2025-12-20T20:00:00Z',
  '2025-12-21T02:00:00Z',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=600&fit=crop',
  true,
  0,
  0,
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- Insert ticket types for the event
INSERT INTO ticket_types (
  id,
  event_id,
  name,
  description,
  price,
  quantity,
  sold,
  is_active,
  created_at
)
VALUES
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000003',
    'Early Bird',
    'Limited early bird tickets - Save 500 KES',
    1500,
    50,
    0,
    true,
    NOW()
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000003',
    'General Admission',
    'Standard entry ticket',
    2000,
    200,
    0,
    true,
    NOW()
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000003',
    'VIP',
    'VIP section with premium seating and meet & greet',
    5000,
    30,
    0,
    true,
    NOW()
  )
ON CONFLICT DO NOTHING;

-- Insert merchandise
INSERT INTO merchandise (
  id,
  artist_id,
  name,
  description,
  price,
  stock,
  images,
  is_active,
  created_at
)
VALUES
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000002',
    'Nviiri T-Shirt',
    'Official Nviiri the Storyteller merch. 100% cotton.',
    1500,
    50,
    ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'],
    true,
    NOW()
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000002',
    'Kitenge Album Hoodie',
    'Limited edition hoodie from Kitenge album era.',
    3500,
    25,
    ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop'],
    true,
    NOW()
  )
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Seed data inserted successfully! Visit /nviiri to see the test artist page.' as message;
