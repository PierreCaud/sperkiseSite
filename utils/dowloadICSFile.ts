export type CalendarEvent = {
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
}

const formatICSDate = (date: Date) => {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

const escapeICSValue = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')

export const getNextFirstFriday = (from = new Date()) => {
  const year = from.getFullYear()
  const month = from.getMonth()

  const firstFriday = (targetYear: number, targetMonth: number) => {
    const date = new Date(targetYear, targetMonth, 1)
    while (date.getDay() !== 5) {
      date.setDate(date.getDate() + 1)
    }
    return date
  }

  const thisMonthFriday = firstFriday(year, month)
  if (thisMonthFriday > from) {
    return thisMonthFriday
  }

  return firstFriday(year, month + 1)
}

export const getCalendarEvent = (eventId: string): CalendarEvent | null => {
  if (eventId === 'bourse') {
    return {
      title: 'Bourse aux Minéraux et Fossiles Wasquehal',
      description:
        'Bourse aux minéraux et fossiles à Wasquehal. Dates prévisionnelles, confirmation par mail du président avant venue.',
      location: 'Salle Pierre Herman, 5 Rue Jean Macé, 59290 Wasquehal',
      startDate: new Date(2026, 8, 26, 9, 30),
      endDate: new Date(2026, 8, 27, 18, 0),
    }
  }

  if (eventId === 'reunion') {
    const nextMeeting = getNextFirstFriday()
    return {
      title: 'Réunion mensuelle du Club de Minéralogie et Paléontologie',
      description:
        'Réunion mensuelle du club. Dates prévisionnelles, confirmation par mail du président avant venue si vous n’êtes pas déjà dans la mailing list.',
      location: '11 Av. du Molinel, 59290 Wasquehal',
      startDate: new Date(
        nextMeeting.getFullYear(),
        nextMeeting.getMonth(),
        nextMeeting.getDate(),
        19,
        45,
      ),
      endDate: new Date(
        nextMeeting.getFullYear(),
        nextMeeting.getMonth(),
        nextMeeting.getDate(),
        21,
        30,
      ),
    }
  }

  return null
}

export const buildICSContent = (event: CalendarEvent) => {
  const now = new Date()

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sperkise Events//NONSGML v1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${now.toISOString()}-${event.title.replace(/\s+/g, '-').toLowerCase()}@sperkise
DTSTAMP:${formatICSDate(now)}
DTSTART:${formatICSDate(event.startDate)}
DTEND:${formatICSDate(event.endDate)}
SUMMARY:${escapeICSValue(event.title)}
LOCATION:${escapeICSValue(event.location)}
DESCRIPTION:${escapeICSValue(event.description)}
END:VEVENT
END:VCALENDAR`
}
