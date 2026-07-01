import {
  buildICSContent,
  getCalendarEvent,
} from '../../../../utils/dowloadICSFile'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await params
  const event = getCalendarEvent(eventId)

  if (!event) {
    return new Response('Event not found', { status: 404 })
  }

  const icsContent = buildICSContent(event)

  return new Response(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="${event.title}.ics"`,
      'Cache-Control': 'no-store',
    },
  })
}
