import type { CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { getDateKey, isSameDay } from './date.utils';

export const indexEventsByDay = (
  events: CalendarEvent[]
): Map<string, CalendarEvent[]> => {
  const eventMap = new Map<string, CalendarEvent[]>();

  events.forEach((event) => {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);

    const currentDate = new Date(startDate);
    currentDate.setHours(0, 0, 0, 0);

    while (currentDate <= endDate) {
      const dateKey = getDateKey(currentDate);

      if (!eventMap.has(dateKey)) {
        eventMap.set(dateKey, []);
      }

      eventMap.get(dateKey)!.push(event);

      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return eventMap;
};

export const sortEventsByTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });
};

export const filterEventsByDate = (
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] => {
  return events.filter((event) => {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate >= startDate && targetDate <= endDate;
  });
};

export const filterEventsByDateRange = (
  events: CalendarEvent[],
  startDate: Date,
  endDate: Date
): CalendarEvent[] => {
  return events.filter((event) => {
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);

    return (
      (eventStart >= startDate && eventStart <= endDate) ||
      (eventEnd >= startDate && eventEnd <= endDate) ||
      (eventStart <= startDate && eventEnd >= endDate)
    );
  });
};

export const getEventsForDay = (
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] => {
  return sortEventsByTime(filterEventsByDate(events, date));
};

export const hasEventOnDay = (events: CalendarEvent[], date: Date): boolean => {
  return events.some((event) => {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate >= startDate && targetDate <= endDate;
  });
};

export const getDefaultEventColor = (index: number): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
  ];
  return colors[index % colors.length];
};
