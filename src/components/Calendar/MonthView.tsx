import React, { useMemo } from 'react';
import { CalendarCell } from './CalendarCell';
import type { MonthViewProps } from './CalendarView.types';
import { getCalendarGrid, isSameMonth, isToday, isSameDay, getDateKey } from '@/utils/date.utils';
import { indexEventsByDay } from '@/utils/event.utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
  selectedDate,
}) => {
  const calendarGrid = useMemo(() => getCalendarGrid(currentDate), [currentDate]);
  const eventsByDay = useMemo(() => indexEventsByDay(events), [events]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-7 gap-0 border-b border-gray-200">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {calendarGrid.map((date, index) => {
          const dateKey = getDateKey(date);
          const dayEvents = eventsByDay.get(dateKey) || [];

          return (
            <CalendarCell
              key={index}
              date={date}
              events={dayEvents}
              isToday={isToday(date)}
              isCurrentMonth={isSameMonth(date, currentDate)}
              isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
              onClick={() => onDateClick(date)}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
};
