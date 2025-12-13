-- Rada Database Migration for Supabase
-- Run this SQL in Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- Create custom types
CREATE TYPE user_role AS ENUM ('ARTIST', 'MANAGER', 'FAN', 'ADMIN');
CREATE TYPE event_status AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED');
CREATE TYPE ticket_status AS ENUM ('ACTIVE', 'USED', 'CANCELLED', 'REFUNDED');
CREATE TYPE submission_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE broadcast_status AS ENUM ('DRAFT', 'SCHEDULED', 'SENT', 'FAILED');

-- Storage Buckets Setup
-- Run this in Supabase Dashboard > Storage:
-- 1. Create bucket: avatars (public)
-- 2. Create bucket: covers (public)
-- 3. Create bucket: events (public)
-- 4. Create bucket: submissions (private)

-- RLS Policies for Storage
-- Avatars: Anyone can read, authenticated users can upload their own
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Covers: Anyone can read, artists can upload
CREATE POLICY "Cover images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'covers');

CREATE POLICY "Artists can upload covers"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'covers' AND auth.role() = 'authenticated');

-- Events: Anyone can read, authenticated users can upload
CREATE POLICY "Event images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'events');

CREATE POLICY "Authenticated users can upload event images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'events' AND auth.role() = 'authenticated');

-- Submissions: Only owner can read
CREATE POLICY "Users can view their own submissions"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'submissions' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload submissions"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'submissions'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
