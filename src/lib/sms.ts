import axios from 'axios'

interface SMSParams {
  to: string[]
  message: string
  from?: string
}

class SMSService {
  private apiKey: string
  private username: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.AFRICAS_TALKING_API_KEY!
    this.username = process.env.AFRICAS_TALKING_USERNAME!
    this.baseUrl = 'https://api.africastalking.com/version1'
  }

  /**
   * Format phone number for Africa's Talking (must start with +254)
   */
  private formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/[\s\-]/g, '')

    if (cleaned.startsWith('0')) {
      cleaned = '+254' + cleaned.substring(1)
    } else if (cleaned.startsWith('254')) {
      cleaned = '+' + cleaned
    } else if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
      cleaned = '+254' + cleaned
    }

    return cleaned
  }

  /**
   * Send SMS to one or multiple recipients
   */
  async sendSMS(params: SMSParams) {
    const formattedNumbers = params.to.map((phone) => this.formatPhoneNumber(phone))

    const payload = new URLSearchParams({
      username: this.username,
      to: formattedNumbers.join(','),
      message: params.message,
      ...(params.from && { from: params.from }),
    })

    try {
      const response = await axios.post(
        `${this.baseUrl}/messaging`,
        payload.toString(),
        {
          headers: {
            apiKey: this.apiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      return {
        success: true,
        recipients: response.data.SMSMessageData.Recipients,
        message: response.data.SMSMessageData.Message,
      }
    } catch (error: any) {
      console.error('SMS Send Error:', error.response?.data || error.message)
      return {
        success: false,
        error: error.response?.data?.Message || 'Failed to send SMS',
      }
    }
  }

  /**
   * Send ticket via SMS with QR code link
   */
  async sendTicket(phoneNumber: string, ticketNumber: string, eventName: string, qrUrl: string) {
    const message = `Your ticket for ${eventName}\nTicket #: ${ticketNumber}\nShow QR code at entry: ${qrUrl}\n\nPowered by Rada`

    return this.sendSMS({
      to: [phoneNumber],
      message,
    })
  }

  /**
   * Send broadcast to multiple fans
   */
  async sendBroadcast(phoneNumbers: string[], message: string, artistName?: string) {
    const fullMessage = artistName 
      ? `${artistName}: ${message}\n\nReply STOP to unsubscribe`
      : message

    // Split into batches of 100 (Africa's Talking limit)
    const batchSize = 100
    const batches = []
    
    for (let i = 0; i < phoneNumbers.length; i += batchSize) {
      batches.push(phoneNumbers.slice(i, i + batchSize))
    }

    const results = await Promise.all(
      batches.map((batch) =>
        this.sendSMS({
          to: batch,
          message: fullMessage,
        })
      )
    )

    const totalSent = results.reduce((sum, result) => {
      return sum + (result.success ? result.recipients?.length || 0 : 0)
    }, 0)

    return {
      success: true,
      totalSent,
      totalBatches: batches.length,
    }
  }
}

export const smsService = new SMSService()
