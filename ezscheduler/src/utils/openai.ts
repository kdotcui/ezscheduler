import OpenAI from 'openai';
import type { GoogleCalendarEvent } from '@/types/calendar';

// Define JSON schema for calendar event (OpenAI Structured Outputs format)
const calendarEventSchema = {
  type: "object",
  properties: {
    summary: {
      type: "string",
      description: "The title/name of the event"
    },
    location: {
      type: ["string", "null"],
      description: "The location of the event"
    },
    description: {
      type: ["string", "null"],
      description: "A description of the event"
    },
    start: {
      type: "object",
      properties: {
        dateTime: {
          type: "string",
          description: "ISO 8601 formatted start date and time (e.g., 2015-05-28T09:00:00-07:00)"
        },
        timeZone: {
          type: ["string", "null"],
          description: "IANA time zone name (e.g., America/Los_Angeles)"
        }
      },
      required: ["dateTime", "timeZone"],
      additionalProperties: false
    },
    end: {
      type: "object",
      properties: {
        dateTime: {
          type: "string",
          description: "ISO 8601 formatted end date and time (e.g., 2015-05-28T17:00:00-07:00)"
        },
        timeZone: {
          type: ["string", "null"],
          description: "IANA time zone name (e.g., America/Los_Angeles)"
        }
      },
      required: ["dateTime", "timeZone"],
      additionalProperties: false
    },
    recurrence: {
      type: ["array", "null"],
      items: {
        type: "string"
      },
      description: "Array of RRULE strings for recurring events (e.g., ['RRULE:FREQ=DAILY;COUNT=2'])"
    },
    attendees: {
      type: ["array", "null"],
      items: {
        type: "object",
        properties: {
          email: {
            type: "string"
          }
        },
        required: ["email"],
        additionalProperties: false
      },
      description: "List of attendee email addresses"
    },
    reminders: {
      type: ["object", "null"],
      properties: {
        useDefault: {
          type: "boolean"
        },
        overrides: {
          type: ["array", "null"],
          items: {
            type: "object",
            properties: {
              method: {
                type: "string",
                enum: ["email", "popup"]
              },
              minutes: {
                type: "number"
              }
            },
            required: ["method", "minutes"],
            additionalProperties: false
          }
        }
      },
      required: ["useDefault", "overrides"],
      additionalProperties: false
    }
  },
  required: ["summary", "location", "description", "start", "end", "recurrence", "attendees", "reminders"],
  additionalProperties: false
} as const;

export interface ParseEventOptions {
  apiKey: string;
  model?: string;
  prompt: string;
}

export interface ParseEventResult {
  success: boolean;
  event?: GoogleCalendarEvent;
  error?: string;
}

/**
 * Parse natural language event description into Google Calendar event structure
 */
export async function parseEventFromNaturalLanguage(
  options: ParseEventOptions
): Promise<ParseEventResult> {
  const { apiKey, model = 'gpt-5-nano', prompt } = options;

  if (!apiKey || apiKey.trim() === '') {
    return {
      success: false,
      error: 'API key is not configured. Please add your OpenAI API key in settings.',
    };
  }

  try {
    const client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, 
    });

    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that extracts calendar event information from natural language descriptions. 
Extract all relevant details including date, time, location, attendees, and any other event information.
For dates and times, use ISO 8601 format with timezone offset (e.g., 2015-05-28T09:00:00-07:00).
If no specific time is mentioned, use reasonable defaults (e.g., 9:00 AM for meetings).
If no end time is specified, assume a 1-hour duration.
If timezone is not specified, use America/Los_Angeles as default.
Current date and time for reference: ${new Date().toISOString()}.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "calendar_event",
          strict: true,
          schema: calendarEventSchema,
        },
      },
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      return {
        success: false,
        error: 'No response from the API.',
      };
    }

    const parsedEvent = JSON.parse(responseContent) as GoogleCalendarEvent;

    return {
      success: true,
      event: parsedEvent,
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: `Failed to parse event: ${errorMessage}`,
    };
  }
}

