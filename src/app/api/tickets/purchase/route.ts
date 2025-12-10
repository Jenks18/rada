import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mpesaService } from '@/lib/mpesa'
import { generateTicketNumber, generateTicketQR } from '@/lib/tickets'
import { smsService } from '@/lib/sms'

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

    // Get event and ticket type
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        artist: true,
        ticketTypes: true,
      },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const ticketType = event.ticketTypes.find((tt) => tt.id === ticketTypeId)

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

      const ticket = await prisma.ticket.create({
        data: {
          eventId,
          ticketTypeId,
          userId,
          phoneNumber,
          amount: ticketType.price,
          ticketNumber,
          qrCode,
          paymentStatus: 'PENDING',
        },
      })

      tickets.push(ticket)
    }

    // Initiate M-Pesa STK Push
    const mpesaResponse = await mpesaService.initiateSTKPush({
      phoneNumber,
      amount: totalAmount,
      accountReference: `TICKET-${tickets[0].ticketNumber}`,
      transactionDesc: `${event.title} - ${ticketType.name}`,
    })

    if (!mpesaResponse.success) {
      // Delete pending tickets if payment initiation fails
      await prisma.ticket.deleteMany({
        where: {
          id: { in: tickets.map((t) => t.id) },
        },
      })

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
