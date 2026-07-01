type CalendarEventInput = {
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
}

const formatGoogleDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}T${hours}${minutes}${seconds}`
}

export const buildGoogleCalendarUrl = (event: CalendarEventInput) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    ctz: 'Europe/Paris',
    dates: `${formatGoogleDate(event.startDate)}/${formatGoogleDate(event.endDate)}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export const buildAndroidCalendarIntent = (event: CalendarEventInput) => {
  const googleCalendarUrl = buildGoogleCalendarUrl(event)
  return `intent://${googleCalendarUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.google.android.calendar;S.browser_fallback_url=${encodeURIComponent(googleCalendarUrl)};end`
}
