import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { CalendarEvent } from '@/components/Calendar/CalendarView.types';

export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: uuidv4(),
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  }, []);

  const updateEvent = useCallback((updatedEvent: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  const getEventById = useCallback(
    (eventId: string): CalendarEvent | undefined => {
      return events.find((event) => event.id === eventId);
    },
    [events]
  );

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
  };
};
