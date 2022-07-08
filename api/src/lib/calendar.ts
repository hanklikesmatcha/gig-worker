import ical from 'ical-generator'

export interface InvitationProps {
  startTime: Date
  endTime: Date
  description: string
  location: string
}

export function createInvitation({
  startTime,
  endTime,
  description,
  location,
}: InvitationProps) {
  const calendar = ical({ name: 'Invitation from Talents' })
  calendar.createEvent({
    start: startTime,
    end: endTime,
    summary: 'Example Event',
    description: description,
    location: location,
    url: 'https://www.linkedin.com/in/szuhan-eng/',
  })

  return calendar
}
