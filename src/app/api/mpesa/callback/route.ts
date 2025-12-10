import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { smsService } from '@/lib/sms'

/**
 * POST /api/mpesa/callback
 * Handle M-Pesa payment callback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('M-Pesa Callback:', JSON.stringify(body, null, 2))

    const { Body } = body

    if (!Body || !Body.stkCallback) {
      return NextResponse.json({ error: 'Invalid callback data' }, { status: 400 })
    }

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } =
      Body.stkCallback

    // ResultCode 0 means success
    const isSuccess = ResultCode === 0

    // Extract M-Pesa receipt number
    let mpesaCode = null
    if (isSuccess && CallbackMetadata?.Item) {
      const receiptItem = CallbackMetadata.Item.find(
        (item: any) => item.Name === 'MpesaReceiptNumber'
      )
      mpesaCode = receiptItem?.Value || null
    }

    // Find tickets by account reference (we need to store CheckoutRequestID)
    // For now, we'll update all PENDING tickets matching the phone number
    // In production, you'd want to track CheckoutRequestID in the ticket record

    if (isSuccess) {
      // Get phone number from callback
      const phoneItem = CallbackMetadata?.Item?.find(
        (item: any) => item.Name === 'PhoneNumber'
      )
      const phoneNumber = phoneItem?.Value?.toString()

      if (phoneNumber) {
        // Update all pending tickets for this phone number from the last 10 minutes
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)

        const tickets = await prisma.ticket.findMany({
          where: {
            phoneNumber: phoneNumber,
            paymentStatus: 'PENDING',
            createdAt: {
              gte: tenMinutesAgo,
            },
          },
          include: {
            event: {
              include: {
                artist: true,
              },
            },
            ticketType: true,
            user: true,
          },
        })

        for (const ticket of tickets) {
          // Update ticket to COMPLETED
          await prisma.ticket.update({
            where: { id: ticket.id },
            data: {
              paymentStatus: 'COMPLETED',
              mpesaCode,
            },
          })

          // Update sold count
          await prisma.ticketType.update({
            where: { id: ticket.ticketTypeId },
            data: {
              sold: {
                increment: 1,
              },
            },
          })

          await prisma.event.update({
            where: { id: ticket.eventId },
            data: {
              soldTickets: {
                increment: 1,
              },
              totalRevenue: {
                increment: ticket.amount,
              },
            },
          })

          // Update or create fan profile
          await prisma.fanProfile.upsert({
            where: {
              userId_artistId: {
                userId: ticket.userId,
                artistId: ticket.event.artistId,
              },
            },
            create: {
              userId: ticket.userId,
              artistId: ticket.event.artistId,
              totalSpent: ticket.amount,
              ticketsPurchased: 1,
              lastInteraction: new Date(),
            },
            update: {
              totalSpent: {
                increment: ticket.amount,
              },
              ticketsPurchased: {
                increment: 1,
              },
              lastInteraction: new Date(),
            },
          })

          // Mark as superfan if they've spent over KES 5000
          const fanProfile = await prisma.fanProfile.findUnique({
            where: {
              userId_artistId: {
                userId: ticket.userId,
                artistId: ticket.event.artistId,
              },
            },
          })

          if (fanProfile && fanProfile.totalSpent >= 5000 && !fanProfile.isSuperfan) {
            await prisma.fanProfile.update({
              where: { id: fanProfile.id },
              data: { isSuperfan: true },
            })
          }

          // Send SMS with ticket
          const qrUrl = `https://rada.to/ticket/${ticket.ticketNumber}`
          await smsService.sendTicket(
            ticket.phoneNumber,
            ticket.ticketNumber,
            ticket.event.title,
            qrUrl
          )
        }
      }
    } else {
      // Payment failed - update tickets
      // You'd need to track CheckoutRequestID properly in production
      console.error('M-Pesa payment failed:', ResultDesc)
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' })
  } catch (error: any) {
    console.error('M-Pesa callback error:', error)
    return NextResponse.json({ ResultCode: 1, ResultDesc: 'Failed' })
  }
}
