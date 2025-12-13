import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { mpesaService } from '@/lib/mpesa'
import { generateTicketNumber, generateTicketQR } from '@/lib/tickets'
import { smsService } from '@/lib/sms'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * POST /api/tickets/purchase
 * Initiate ticket purchase with M-Pesa STK Push
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, ticketTypeId, userId, phoneNumber, quantity = 1 } = body

    // Validate input
    if (!eventId || !ticketTypeId || !userId || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get event with artist
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select(`
        *,
        artist:artists(*),
        ticket_types:ticket_types(*)
      `)
      .eq('id', eventId)
      .single()

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const ticketType = event.ticket_types?.find((tt: any) => tt.id === ticketTypeId)

    if (!ticketType) {
      return NextResponse.json({ error: 'Ticket type not found' }, { status: 404 })
    }

    // Check availability
    if (ticketType.sold + quantity > ticketType.quantity) {
      return NextResponse.json(
        { error: 'Not enough tickets available' },
        { status: 400 }
      )
    }

    // Check if sales are active
    if (!ticketType.isActive) {
      return NextResponse.json(
        { error: 'Ticket sales are not active' },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = ticketType.price * quantity

    // Create tickets (in PENDING state)
    const tickets = []
    for (let i = 0; i < quantity; i++) {
      const ticketNumber = generateTicketNumber()
      const qrCode = await generateTicketQR(eventId, ticketNumber)

      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          event_id: eventId,
          ticket_type_id: ticketTypeId,
          user_id: userId,
          phone_number: phoneNumber,
          amount: ticketType.price,
          ticket_number: ticketNumber,
          qr_code: qrCode,
          payment_status: 'PENDING',
        })
        .select()
        .single()

      if (ticketError || !ticket) {
        console.error('Error creating ticket:', ticketError)
        throw new Error('Failed to create ticket')
      }

      tickets.push(ticket)
    }

    // Initiate M-Pesa STK Push
    const mpesaResponse = await mpesaService.initiateSTKPush({
      phoneNumber,
      amount: totalAmount,
      accountReference: `TICKET-${tickets[0].ticket_number}`,
      transactionDesc: `${event.title} - ${ticketType.name}`,
    })

    if (!mpesaResponse.success) {
      // Delete pending tickets if payment initiation fails
      const ticketIds = tickets.map((t) => t.id)
      await supabase
        .from('tickets')
        .delete()
        .in('id', ticketIds)

      return NextResponse.json(
        { error: mpesaResponse.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      tickets: tickets.map((t) => t.id),
      checkoutRequestId: mpesaResponse.checkoutRequestId,
      message: 'Please complete payment on your phone',
    })
  } catch (error: any) {
    console.error('Ticket purchase error:', error)
    return NextResponse.json(
      { error: 'Failed to process ticket purchase' },
      { status: 500 }
    )
  }
}
