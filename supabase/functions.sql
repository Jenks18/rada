-- Helper functions for M-Pesa callback
-- Run these in Supabase SQL Editor

-- Function to increment ticket type sold count
CREATE OR REPLACE FUNCTION increment_ticket_type_sold(ticket_type_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE "TicketType"
  SET sold = sold + 1
  WHERE id = ticket_type_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment event stats
CREATE OR REPLACE FUNCTION increment_event_stats(event_id uuid, amount integer)
RETURNS void AS $$
BEGIN
  UPDATE "Event"
  SET 
    "soldTickets" = "soldTickets" + 1,
    "totalRevenue" = "totalRevenue" + amount
  WHERE id = event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
