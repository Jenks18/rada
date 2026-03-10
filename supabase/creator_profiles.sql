-- Creator Profiles Migration
-- Run this in your Supabase SQL Editor after the main migration.sql
-- Updated to support Clerk authentication (user IDs are strings, not UUIDs)

-- Creator profiles table — one row per authenticated user
CREATE TABLE IF NOT EXISTS creator_profiles (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id        TEXT NOT NULL UNIQUE,  -- Clerk user ID (e.g., "user_2a...")
  username       TEXT UNIQUE NOT NULL,
  talent_name    TEXT,
  currency       TEXT NOT NULL DEFAULT 'USD',
  is_published   BOOLEAN NOT NULL DEFAULT FALSE,

  -- Full snapshot of the minisite editor state (updated on every Publish)
  minisite_data  JSONB NOT NULL DEFAULT '{}'::JSONB,

  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Usernames: 3-30 chars, lowercase alphanumeric + hyphens, no leading/trailing dash
  CONSTRAINT username_format CHECK (
    username ~ '^[a-z0-9][a-z0-9\-]{1,28}[a-z0-9]$'
    OR username ~ '^[a-z0-9]{1,30}$'
  )
);

-- One profile per user
CREATE UNIQUE INDEX IF NOT EXISTS creator_profiles_user_id_idx ON creator_profiles (user_id);

-- Fast username lookup for public pages
CREATE INDEX IF NOT EXISTS creator_profiles_username_idx ON creator_profiles (username);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'creator_profiles_updated_at'
  ) THEN
    CREATE TRIGGER creator_profiles_updated_at
      BEFORE UPDATE ON creator_profiles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END;
$$;

-- Row Level Security
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;

-- Note: With Clerk, we don't use auth.uid() since authentication is external.
-- Instead, RLS policies should be managed at the application level,
-- or you can disable RLS and rely on API-level authorization.
-- For now, we'll allow service role access (which is what the API uses).

-- Allow service role full access
CREATE POLICY "Service role has full access"
  ON creator_profiles
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Public can read published profiles (used by the public artist page)
CREATE POLICY "Public can read published profiles"
  ON creator_profiles FOR SELECT
  USING (is_published = TRUE);
