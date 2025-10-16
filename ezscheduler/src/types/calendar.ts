/**
 * Type definitions for Google Calendar API event structure
 */

export interface CalendarEventDateTime {
  dateTime: string;
  timeZone: string | null;
}

export interface CalendarEventAttendee {
  email: string;
}

export interface CalendarEventReminder {
  method: 'email' | 'popup';
  minutes: number;
}

export interface CalendarEventReminders {
  useDefault: boolean;
  overrides: CalendarEventReminder[] | null;
}

export interface GoogleCalendarEvent {
  summary: string;
  location: string | null;
  description: string | null;
  start: CalendarEventDateTime;
  end: CalendarEventDateTime;
  recurrence: string[] | null;
  attendees: CalendarEventAttendee[] | null;
  reminders: CalendarEventReminders | null;
}

