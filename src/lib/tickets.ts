import QRCode from 'qrcode'

/**
 * Generate QR code for ticket
 */
export async function generateTicketQR(ticketId: string, ticketNumber: string): Promise<string> {
  // The QR code contains verification data
  const qrData = JSON.stringify({
    id: ticketId,
    ticket: ticketNumber,
    timestamp: Date.now(),
  })

  try {
    // Generate QR code as data URL
    const qrCodeUrl = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })

    return qrCodeUrl
  } catch (error) {
    console.error('QR Code generation error:', error)
    throw new Error('Failed to generate QR code')
  }
}

/**
 * Verify QR code data
 */
export function verifyTicketQR(qrData: string): { id: string; ticket: string } | null {
  try {
    const data = JSON.parse(qrData)
    if (data.id && data.ticket) {
      return { id: data.id, ticket: data.ticket }
    }
    return null
  } catch {
    return null
  }
}

/**
 * Generate unique ticket number
 */
export function generateTicketNumber(): string {
  const prefix = 'RD'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${timestamp}${random}`
}
