-- Rada Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User roles enum
CREATE TYPE user_role AS ENUM ('ARTIST', 'MANAGER', 'FAN', 'ADMIN');
CREATE TYPE ticket_status AS ENUM ('VALID', 'USED', 'CANCELLED', 'REFUNDED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
CREATE TYPE submission_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'FEATURED');
CREATE TYPE broadcast_type AS ENUM ('SMS', 'WHATSAPP', 'BOTH');
CREATE TYPE broadcast_status AS ENUM ('DRAFT', 'SCHEDULED', 'SENDING', 'SENT', 'FAILED');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  name TEXT NOT NULL,
  role user_role DEFAULT 'FAN',
  password TEXT NOT NULL,
  avatar TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_email ON users(email);

-- Artists table
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  stage_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  genre TEXT[],
  location TEXT,
  booking_whatsapp TEXT,
  instagram TEXT,
  tiktok TEXT,
  twitter TEXT,
  spotify TEXT,
  apple_music TEXT,
  youtube TEXT,
  cover_image TEXT,
  theme_color TEXT DEFAULT '#000000',
  custom_domain TEXT UNIQUE,
  skiza_tune_code TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_pro BOOLEAN DEFAULT false,
  pro_expires_at TIMESTAMPTZ,
  page_views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_artists_slug ON artists(slug);
CREATE INDEX idx_artists_location ON artists(location);

-- Custom links table
CREATE TABLE custom_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_custom_links_artist ON custom_links(artist_id);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  venue TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  coordinates TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  doors TEXT,
  total_capacity INTEGER,
  sold_tickets INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  allow_guest_list BOOLEAN DEFAULT true,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_artist ON events(artist_id);
CREATE INDEX idx_events_city ON events(city);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_slug ON events(slug);

-- Ticket types table
CREATE TABLE ticket_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  sold INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  sales_start TIMESTAMPTZ,
  sales_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ticket_types_event ON ticket_types(event_id);

-- Tickets table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id),
  ticket_type_id UUID REFERENCES ticket_types(id),
  user_id UUID REFERENCES users(id),
  qr_code TEXT UNIQUE NOT NULL,
  ticket_number TEXT UNIQUE NOT NULL,
  status ticket_status DEFAULT 'VALID',
  phone_number TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  mpesa_code TEXT,
  payment_status payment_status DEFAULT 'PENDING',
  checked_in BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMPTZ,
  checked_in_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_tickets_user ON tickets(user_id);
CREATE INDEX idx_tickets_qr ON tickets(qr_code);
CREATE INDEX idx_tickets_phone ON tickets(phone_number);

-- Fan profiles table
CREATE TABLE fan_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  total_spent DECIMAL(10,2) DEFAULT 0,
  tickets_purchased INTEGER DEFAULT 0,
  last_interaction TIMESTAMPTZ DEFAULT NOW(),
  is_superfan BOOLEAN DEFAULT false,
  tags TEXT[],
  sms_opt_in BOOLEAN DEFAULT true,
  whatsapp_opt_in BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, artist_id)
);

CREATE INDEX idx_fan_profiles_artist ON fan_profiles(artist_id);
CREATE INDEX idx_fan_profiles_superfan ON fan_profiles(is_superfan);

-- Drops table
CREATE TABLE drops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  is_active BOOLEAN DEFAULT true,
  requires_approval BOOLEAN DEFAULT true,
  max_submissions INTEGER,
  allowed_types TEXT[],
  opens_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  prize TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_drops_artist ON drops(artist_id);
CREATE INDEX idx_drops_slug ON drops(slug);

-- Submissions table
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  drop_id UUID REFERENCES drops(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  content_type TEXT NOT NULL,
  content_url TEXT NOT NULL,
  caption TEXT,
  thumbnail TEXT,
  status submission_status DEFAULT 'PENDING',
  reviewed_at TIMESTAMPTZ,
  review_note TEXT,
  views INTEGER DEFAULT 0,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_drop ON submissions(drop_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_status ON submissions(status);

-- Merchandise table
CREATE TABLE merchandise (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  images TEXT[],
  stock INTEGER,
  is_digital BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_merchandise_artist ON merchandise(artist_id);

-- Broadcasts table
CREATE TABLE broadcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type broadcast_type NOT NULL,
  segment TEXT,
  recipients INTEGER DEFAULT 0,
  status broadcast_status DEFAULT 'DRAFT',
  sent_at TIMESTAMPTZ,
  delivered INTEGER DEFAULT 0,
  failed INTEGER DEFAULT 0,
  clicked INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_broadcasts_artist ON broadcasts(artist_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE fan_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcasts ENABLE ROW LEVEL SECURITY;

-- Public read policies (for artist pages)
CREATE POLICY "Artists are viewable by everyone" ON artists FOR SELECT USING (true);
CREATE POLICY "Custom links are viewable by everyone" ON custom_links FOR SELECT USING (is_active = true);
CREATE POLICY "Published events are viewable by everyone" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Active ticket types are viewable by everyone" ON ticket_types FOR SELECT USING (is_active = true);
CREATE POLICY "Active merchandise is viewable by everyone" ON merchandise FOR SELECT USING (is_active = true);
CREATE POLICY "Active drops are viewable by everyone" ON drops FOR SELECT USING (is_active = true);

-- Users can view their own tickets
CREATE POLICY "Users can view their own tickets" ON tickets FOR SELECT USING (auth.uid()::text = user_id::text);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers
CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_drops_updated_at BEFORE UPDATE ON drops FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_merchandise_updated_at BEFORE UPDATE ON merchandise FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fan_profiles_updated_at BEFORE UPDATE ON fan_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
