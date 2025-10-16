import type { GoogleCalendarEvent } from '@/types/calendar';

export interface Message {
  id: string;
  type: 'user' | 'ai' | 'error';
  content: string;
  event?: GoogleCalendarEvent;
  timestamp: Date;
}

