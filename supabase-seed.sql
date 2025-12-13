-- Seed data for Rada (Supabase)
-- Run this after running supabase-schema.sql

-- Insert test users
INSERT INTO users (id, phone_number, email, name, role, password, verified) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '254712345678', 'nviiri@example.com', 'Nviiri the Storyteller', 'ARTIST', '$2a$10$rZ9qH8qQ7Q7Q7Q7Q7Q7Q7Q', true),
  ('550e8400-e29b-41d4-a716-446655440002', '254722345678', 'sauti@example.com', 'Sauti Sol', 'ARTIST', '$2a$10$rZ9qH8qQ7Q7Q7Q7Q7Q7Q7Q', true),
  ('550e8400-e29b-41d4-a716-446655440003', '254733445566', 'fan@example.com', 'Jane Wanjiku', 'FAN', '$2a$10$rZ9qH8qQ7Q7Q7Q7Q7Q7Q7Q', true);

-- Insert artists
INSERT INTO artists (id, user_id, stage_name, slug, bio, genre, location, cover_image, theme_color, booking_whatsapp, instagram, twitter, spotify, youtube, skiza_tune_code, is_verified, is_pro) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Nviiri the Storyteller', 'nviiri', 'Award-winning Kenyan artist and songwriter. Member of Sol Generation.', ARRAY['Afro-Pop', 'R&B', 'Soul'], 'Nairobi, Kenya', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200', '#8B5CF6', '254712345678', 'nviirithestoryteller', 'nviiri_', 'https://open.spotify.com/artist/example', 'https://youtube.com/@nviiri', '123456', true, true),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Sauti Sol', 'sautisol', 'Multi-award winning Kenyan afro-pop band formed in Nairobi.', ARRAY['Afro-Pop', 'Afro-Soul'], 'Nairobi, Kenya', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200', '#F59E0B', '254722345678', 'sautisol', 'sautisol', 'https://open.spotify.com/artist/sautisol', 'https://youtube.com/@sautisol', '789012', true, false);

-- Insert custom links
INSERT INTO custom_links (artist_id, title, url, icon, "order") VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '🎵 Latest Album - "Kitenge"', 'https://open.spotify.com/album/example', '🎵', 1),
  ('660e8400-e29b-41d4-a716-446655440001', '📸 Follow on Instagram', 'https://instagram.com/nviirithestoryteller', '📸', 2),
  ('660e8400-e29b-41d4-a716-446655440001', '🎬 Watch "Pombe Sigara" Video', 'https://youtube.com/watch?v=example', '🎬', 3),
  ('660e8400-e29b-41d4-a716-446655440002', '🎤 Book Us for Your Event', 'https://wa.me/254722345678', '🎤', 1),
  ('660e8400-e29b-41d4-a716-446655440002', '🎧 Stream "Midnight Train"', 'https://open.spotify.com/album/example', '🎧', 2);

-- Insert event
INSERT INTO events (id, artist_id, title, slug, description, cover_image, venue, address, city, coordinates, start_date, end_date, doors, total_capacity, is_published, is_featured, allow_guest_list) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'Nviiri Live at The Alchemist', 'nviiri-alchemist-dec-2025', 'An intimate evening with Nviiri the Storyteller. Experience his greatest hits and new music.', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200', 'The Alchemist Bar', 'Muthangari Drive, Westlands', 'Nairobi', '-1.2674,36.8025', '2025-12-15 20:00:00+00', '2025-12-15 23:59:59+00', '7:00 PM', 200, true, true, true);

-- Insert ticket types
INSERT INTO ticket_types (event_id, name, description, price, quantity, is_active, sales_start, sales_end) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'Early Bird', 'Limited early bird tickets', 1500.00, 50, true, '2025-11-20 00:00:00+00', '2025-11-30 23:59:59+00'),
  ('770e8400-e29b-41d4-a716-446655440001', 'General Admission', 'Standard entry ticket', 2000.00, 100, true, '2025-11-20 00:00:00+00', '2025-12-15 18:00:00+00'),
  ('770e8400-e29b-41d4-a716-446655440001', 'VIP', 'VIP section with complimentary drink', 3500.00, 50, true, '2025-11-20 00:00:00+00', '2025-12-15 18:00:00+00');

-- Insert drop
INSERT INTO drops (artist_id, title, slug, description, cover_image, is_active, requires_approval, allowed_types, opens_at, closes_at, prize) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Pombe Sigara Challenge', 'pombe-sigara-challenge', 'Show us your best dance moves to "Pombe Sigara"! Winner gets VIP tickets to the next show.', 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800', true, true, ARRAY['video', 'link'], '2025-11-20 00:00:00+00', '2025-12-31 23:59:59+00', '2x VIP Tickets + Meet & Greet');

-- Insert merchandise
INSERT INTO merchandise (artist_id, name, description, price, images, stock, is_digital, is_active) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Nviiri T-Shirt', 'Official Nviiri merchandise', 1200.00, ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'], 50, false, true),
  ('660e8400-e29b-41d4-a716-446655440001', 'Signed Album Download', 'Digitally signed album with exclusive tracks', 800.00, ARRAY['https://images.unsplash.com/photo-1619983081563-430f63602796?w=600'], NULL, true, true);
