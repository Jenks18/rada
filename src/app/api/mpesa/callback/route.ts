import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { smsService } from '@/lib/sms'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

    if (isSuccess) {
      // Get phone number from callback
      const phoneItem = CallbackMetadata?.Item?.find(
        (item: any) => item.Name === 'PhoneNumber'
      )
      const phoneNumber = phoneItem?.Value?.toString()

      if (phoneNumber) {
        // Update all pending tickets for this phone number from the last 10 minutes
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)

        const { data: tickets } = await supabase
          .from('tickets')
          .select(`
            *,
            event:events(*, artist:artists(*)),
            ticket_type:ticket_types(*),
            user:users(*)
          `)
          .eq('phone_number', phoneNumber)
          .eq('payment_status', 'PENDING')
          .gte('created_at', tenMinutesAgo.toISOString())

        for (const ticket of tickets || []) {
          // Update ticket to COMPLETED
          await supabase
            .from('tickets')
            .update({
              payment_status: 'COMPLETED',
              mpesa_code: mpesaCode,
            })
            .eq('id', ticket.id)

          // Update sold count
          await supabase.rpc('increment_ticket_type_sold', {
            ticket_type_id: ticket.ticket_type_id,
          })

          await supabase.rpc('increment_event_stats', {
            event_id: ticket.event_id,
            amount: ticket.amount,
          })

          // Update or create fan profile
          const { data: existingProfile } = await supabase
            .from('fan_profiles')
            .select('*')
            .eq('user_id', ticket.user_id)
            .eq('artist_id', ticket.event.artist_id)
            .single()

          if (existingProfile) {
            const newTotalSpent = existingProfile.total_spent + ticket.amount
            await supabase
              .from('fan_profiles')
              .update({
                total_spent: newTotalSpent,
                tickets_purchased: existingProfile.tickets_purchased + 1,
                last_interaction: new Date().toISOString(),
                is_superfan: newTotalSpent >= 5000 ? true : existingProfile.is_superfan,
              })
              .eq('id', existingProfile.id)
          } else {
            await supabase.from('fan_profiles').insert({
              user_id: ticket.user_id,
              artist_id: ticket.event.artist_id,
              total_spent: ticket.amount,
              tickets_purchased: 1,
              last_interaction: new Date().toISOString(),
              is_superfan: false,
            })
          }

          // Send SMS with ticket
          const qrUrl = `https://rada.to/ticket/${ticket.ticket_number}`
          await smsService.sendTicket(
            ticket.phone_number,
            ticket.ticket_number,
            ticket.event.title,
            qrUrl
          )
        }
      }
    } else {
      // Payment failed
      console.error('M-Pesa payment failed:', ResultDesc)
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' })
  } catch (error: any) {
    console.error('M-Pesa callback error:', error)
    return NextResponse.json({ ResultCode: 1, ResultDesc: 'Failed' })
  }
}
