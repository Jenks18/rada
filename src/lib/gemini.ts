/**
 * Google Gemini helper for Instagram story-reply auto-responses
 * Uses gemini-2.0-flash (free tier via AI Studio)
 * Get your key: https://aistudio.google.com/apikey
 */

const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

export async function generateStoryReply({
  artistName,
  fanMessage,
  customSystemPrompt,
}: {
  artistName: string
  fanMessage: string
  customSystemPrompt?: string | null
}): Promise<string> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY
  if (!apiKey) throw new Error('GOOGLE_GEMINI_API_KEY is not set')

  const systemPrompt =
    customSystemPrompt ??
    `You are the social media assistant for ${artistName}, a music artist/creator.
A fan just replied to one of their Instagram Stories.
Write a warm, authentic, and brief DM reply (1-3 sentences max) that:
- Feels personal and genuine, not robotic
- Matches the energy of the fan's message
- Builds connection and makes them feel seen
- Reflects a creative/artist personality
- Never mentions you are an AI
Do not include quotes, labels, or any preamble — just the reply text.`

  const res = await fetch(`${GEMINI_API}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [
        {
          role: 'user',
          parts: [{ text: `Fan's story reply: "${fanMessage}"` }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.85,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error: ${err}`)
  }

  const data = await res.json()
  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  if (!text) throw new Error('Gemini returned an empty response')
  return text.trim()
}
