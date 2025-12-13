import { supabase } from './client'

/**
 * M-Pesa STK Push Integration with Supabase
 */

interface STKPushRequest {
  phoneNumber: string
  amount: number
  accountReference: string // e.g., "TICKET-123"
  transactionDesc: string
}

interface STKPushResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

// Initiate M-Pesa payment
export async function initiateMpesaPayment(data: STKPushRequest): Promise<STKPushResponse> {
  const response = await fetch('/api/mpesa/stk-push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error('Payment initiation failed')
  return response.json()
}

// Save transaction to database
export async function createTransaction(data: {
  checkoutRequestId: string
  phoneNumber: string
  amount: number
  ticketId?: string
  eventId?: string
  userId: string
}) {
  const { data: transaction, error } = await supabase
    .from('Transaction')
    .insert({
      ...data,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return transaction
}

// Update transaction status
export async function updateTransactionStatus(
  checkoutRequestId: string,
  status: 'SUCCESS' | 'FAILED' | 'CANCELLED',
  mpesaReceiptNumber?: string
) {
  const { error } = await supabase
    .from('Transaction')
    .update({
      status,
      mpesaReceiptNumber,
      updatedAt: new Date().toISOString(),
    })
    .eq('checkoutRequestId', checkoutRequestId)

  if (error) throw error
}

// Query transaction status
export async function getTransaction(checkoutRequestId: string) {
  const { data, error } = await supabase
    .from('Transaction')
    .select('*')
    .eq('checkoutRequestId', checkoutRequestId)
    .single()

  if (error) throw error
  return data
}

/**
 * SMS Integration (Africa's Talking)
 */

interface SendSMSRequest {
  to: string[] // Phone numbers
  message: string
}

export async function sendSMS(data: SendSMSRequest) {
  const response = await fetch('/api/sms/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error('SMS sending failed')
  return response.json()
}

// Send ticket confirmation SMS
export async function sendTicketSMS(phoneNumber: string, ticketCode: string, eventName: string) {
  const message = `Your ticket for ${eventName} is confirmed! Code: ${ticketCode}. Show this at the entrance. Powered by Rada.`
  
  return sendSMS({
    to: [phoneNumber],
    message,
  })
}

// Send broadcast to fans
export async function sendBroadcast(artistId: string, message: string, segment: 'all' | 'superfans' | 'recent') {
  // Get fan phone numbers based on segment
  const { data: fans } = await supabase
    .from('FanProfile')
    .select('user:User(phoneNumber)')
    .eq('artistId', artistId)
  
  if (!fans) return

  const phoneNumbers = fans
    .map(f => f.user?.phoneNumber)
    .filter(Boolean) as string[]

  // Save broadcast record
  const { data: broadcast } = await supabase
    .from('Broadcast')
    .insert({
      artistId,
      message,
      segment,
      recipientCount: phoneNumbers.length,
      status: 'SENT',
      sentAt: new Date().toISOString(),
    })
    .select()
    .single()

  // Send SMS
  await sendSMS({ to: phoneNumbers, message })

  return broadcast
}
