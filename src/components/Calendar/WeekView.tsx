import React, { useMemo } from 'react';
import type { WeekViewProps } from './CalendarView.types';
import { getWeekGrid, isToday, isSameDay, getDateKey, formatTime } from '@/utils/date.utils';
import { indexEventsByDay } from '@/utils/event.utils';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
  selectedDate,
}) => {
  const weekGrid = useMemo(() => getWeekGrid(currentDate), [currentDate]);
  const eventsByDay = useMemo(() => indexEventsByDay(events), [events]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="py-3 px-4 text-sm font-semibold text-gray-700 border-r border-gray-200">
          Time
        </div>
        {weekGrid.map((date, index) => {
          const dateKey = getDateKey(date);
          const dayEvents = eventsByDay.get(dateKey) || [];

          return (
            <div
              key={index}
              className={`py-3 px-2 text-center border-r border-gray-200 last:border-r-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedDate && isSameDay(date, selectedDate) ? 'bg-blue-50' : ''
              }`}
              onClick={() => onDateClick(date)}
            >
              <div className="text-xs font-medium text-gray-600">
                {WEEKDAYS[date.getDay()]}
              </div>
              <div
                className={`text-lg font-semibold mt-1 ${
                  isToday(date)
                    ? 'bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto'
                    : 'text-gray-900'
                }`}
              >
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-y-auto max-h-[600px]">
        {HOURS.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-200 min-h-[60px]">
            <div className="py-2 px-4 text-xs text-gray-600 border-r border-gray-200">
              {hour.toString().padStart(2, '0')}:00
            </div>
            {weekGrid.map((date, dayIndex) => {
              const dateKey = getDateKey(date);
              const dayEvents = eventsByDay.get(dateKey) || [];
              const hourEvents = dayEvents.filter((event) => {
                const eventHour = new Date(event.startTime).getHours();
                return eventHour === hour;
              });

              return (
                <div
                  key={dayIndex}
                  className="border-r border-gray-200 last:border-r-0 p-1 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onDateClick(date)}
                >
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-2 py-1 rounded text-white mb-1 cursor-pointer hover:opacity-80 ${
                        event.color || 'bg-blue-500'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs opacity-90">
                        {formatTime(new Date(event.startTime))} - {formatTime(new Date(event.endTime))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
