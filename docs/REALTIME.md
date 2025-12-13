# Rada - Real-time Features with Supabase

This document outlines real-time subscriptions for live updates across the platform.

## Available Subscriptions

### 1. Live Ticket Sales

Subscribe to ticket sales in real-time for event organizers:

```typescript
import { supabase } from '@/lib/supabase/client'

// Subscribe to ticket sales for a specific event
const subscription = supabase
  .channel('ticket-sales')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'Ticket',
      filter: `eventId=eq.${eventId}`,
    },
    (payload) => {
      console.log('New ticket sold!', payload.new)
      // Update UI with new sale
    }
  )
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

### 2. Live Event Check-ins

Track who's checking in to your event in real-time:

```typescript
const subscription = supabase
  .channel('checkins')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'Ticket',
      filter: `eventId=eq.${eventId}`,
    },
    (payload) => {
      if (payload.new.checkedIn && !payload.old.checkedIn) {
        console.log('Guest checked in:', payload.new)
        // Update attendance counter
      }
    }
  )
  .subscribe()
```

### 3. Drop Submissions

Get notified when fans submit to your drops:

```typescript
const subscription = supabase
  .channel('submissions')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'Submission',
      filter: `dropId=eq.${dropId}`,
    },
    (payload) => {
      console.log('New submission!', payload.new)
      // Show notification
    }
  )
  .subscribe()
```

### 4. Broadcast Delivery Status

Track SMS/WhatsApp broadcast delivery:

```typescript
const subscription = supabase
  .channel('broadcasts')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'Broadcast',
      filter: `id=eq.${broadcastId}`,
    },
    (payload) => {
      console.log('Broadcast status:', payload.new.status)
      // Update delivery stats
    }
  )
  .subscribe()
```

### 5. Fan Activity Feed

Real-time feed of fan interactions:

```typescript
const subscription = supabase
  .channel('fan-activity')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'FanProfile',
      filter: `artistId=eq.${artistId}`,
    },
    (payload) => {
      console.log('Fan activity:', payload)
      // Update CRM dashboard
    }
  )
  .subscribe()
```

## Usage in Components

### Example: Live Ticket Counter

```typescript
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export function LiveTicketCounter({ eventId }: { eventId: string }) {
  const [ticketCount, setTicketCount] = useState(0)

  useEffect(() => {
    // Get initial count
    const fetchCount = async () => {
      const { count } = await supabase
        .from('Ticket')
        .select('*', { count: 'exact', head: true })
        .eq('eventId', eventId)
      
      setTicketCount(count || 0)
    }
    fetchCount()

    // Subscribe to new tickets
    const subscription = supabase
      .channel(`tickets-${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Ticket',
          filter: `eventId=eq.${eventId}`,
        },
        () => {
          setTicketCount(prev => prev + 1)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [eventId])

  return (
    <div className="text-2xl font-bold">
      {ticketCount} tickets sold
    </div>
  )
}
```

## Presence

Track online users (who's viewing your page):

```typescript
const channel = supabase.channel('online-users', {
  config: {
    presence: {
      key: userId,
    },
  },
})

channel
  .on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState()
    console.log('Online users:', Object.keys(state).length)
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({ user_id: userId, online_at: new Date().toISOString() })
    }
  })
```

## Broadcast

Send messages between browser tabs:

```typescript
const channel = supabase.channel('notifications')

// Send
channel.send({
  type: 'broadcast',
  event: 'new-notification',
  payload: { message: 'New ticket sold!' },
})

// Receive
channel.on('broadcast', { event: 'new-notification' }, (payload) => {
  console.log('Received:', payload)
})
```

## Best Practices

1. **Always unsubscribe** when component unmounts
2. **Use specific filters** to reduce bandwidth
3. **Batch updates** if receiving many events
4. **Handle reconnections** gracefully
5. **Use channel names** that won't conflict

## Performance

- Free tier: 200 concurrent connections
- Pro tier: Unlimited connections
- Each subscription uses 1 connection
- Close unused subscriptions
