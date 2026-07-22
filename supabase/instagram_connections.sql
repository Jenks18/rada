-- Instagram Connections Migration
-- Run this in Supabase SQL Editor after creator_profiles.sql
-- Stores OAuth tokens for Instagram Business accounts connected by creators

CREATE TABLE IF NOT EXISTS instagram_connections (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id               TEXT NOT NULL UNIQUE,          -- Clerk user ID
  ig_user_id            TEXT NOT NULL,                  -- Instagram user ID
  ig_username           TEXT,                           -- Instagram @username
  access_token          TEXT NOT NULL,                  -- Long-lived token (60 days)
  token_expires_at      TIMESTAMPTZ,                    -- When to refresh
  auto_reply_enabled    BOOLEAN NOT NULL DEFAULT TRUE,
  -- Custom system prompt override (NULL = use smart default)
  custom_system_prompt  TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS instagram_connections_user_id_idx
  ON instagram_connections (user_id);

CREATE INDEX IF NOT EXISTS instagram_connections_ig_user_id_idx
  ON instagram_connections (ig_user_id);

-- Auto-update updated_at (reuse function from creator_profiles.sql)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'instagram_connections_updated_at'
  ) THEN
    CREATE TRIGGER instagram_connections_updated_at
      BEFORE UPDATE ON instagram_connections
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END;
$$;

ALTER TABLE instagram_connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role has full access" ON instagram_connections;

CREATE POLICY "Service role has full access"
  ON instagram_connections
  FOR ALL
  USING (true)
  WITH CHECK (true);
