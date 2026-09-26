import { NextRequest, NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RATE_LIMIT_MS = 60_000
const MAX_FIELD_LENGTH = 200
const MAX_GUESS_LENGTH = 80

const rateLimit = new Map<string, number>()

const normalizeText = (value: unknown, maxLength: number) => {
  if (typeof value !== 'string') {
    return ''
  }

  const cleaned = value.trim().replace(/\s+/g, ' ')
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'
    const now = Date.now()
    const lastRequestAt = rateLimit.get(ip)

    if (lastRequestAt && now - lastRequestAt < RATE_LIMIT_MS) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trop de soumissions. Réessayez dans une minute.',
        },
        { status: 429 },
      )
    }

    const body = await request.json().catch(() => null)

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Formulaire invalide.' },
        { status: 400 },
      )
    }

    const firstName = normalizeText(body.firstName, MAX_FIELD_LENGTH)
    const lastName = normalizeText(body.lastName, MAX_FIELD_LENGTH)
    const email = normalizeText(body.email, MAX_FIELD_LENGTH).toLowerCase()
    const phone = normalizeText(body.phone, MAX_FIELD_LENGTH)
    const guess = normalizeText(body.guess, MAX_GUESS_LENGTH)
    const consentGame = body.consentGame === true || body.consentGame === 'true'
    const consentNextYear =
      body.consentNextYear === true || body.consentNextYear === 'true'

    if (!firstName || !lastName || !email || !guess) {
      return NextResponse.json(
        { success: false, error: 'Champs obligatoires manquants.' },
        { status: 400 },
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Adresse e-mail invalide.' },
        { status: 400 },
      )
    }

    if (!consentGame) {
      return NextResponse.json(
        {
          success: false,
          error: 'Le consentement pour le jeu est obligatoire.',
        },
        { status: 400 },
      )
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      guess,
      consentGame,
      consentNextYear,
      submittedAt: new Date().toISOString(),
      secret: process.env.JEU_PIERRE_SECRET ?? '',
    }

    const sheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL
    console.log(
      'Google Sheet URL présente:',
      Boolean(process.env.GOOGLE_SHEET_WEBAPP_URL),
    )
    console.log('Secret présent:', Boolean(process.env.JEU_PIERRE_SECRET))

    if (sheetUrl) {
      const scriptResponse = await fetch(sheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const responseText = await scriptResponse.text()

      if (!scriptResponse.ok) {
        console.error('Google Apps Script error:', responseText)
        return NextResponse.json(
          { success: false, error: 'Erreur lors de l’enregistrement.' },
          { status: 502 },
        )
      }
    }

    rateLimit.set(ip, now)

    return NextResponse.json({ success: true, stored: Boolean(sheetUrl) })
  } catch (error) {
    console.error('Erreur API jeu pierre:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur inattendue est survenue.' },
      { status: 500 },
    )
  }
}
