import React from 'react';
import type { CalendarCellProps } from './CalendarView.types';

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  events,
  isToday,
  isCurrentMonth,
  isSelected,
  onClick,
  onEventClick,
}) => {
  const visibleEvents = events.slice(0, 2);
  const remainingCount = events.length - visibleEvents.length;

  return (
    <div
      className={`min-h-[100px] border border-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-50 ${
        !isCurrentMonth ? 'bg-gray-50' : 'bg-white'
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={`text-sm font-medium ${
            isToday
              ? 'bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center'
              : isCurrentMonth
              ? 'text-gray-900'
              : 'text-gray-400'
          }`}
        >
          {date.getDate()}
        </span>
      </div>
      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <div
            key={event.id}
            className={`text-xs px-2 py-1 rounded text-white truncate cursor-pointer hover:opacity-80 ${
              event.color || 'bg-blue-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
          >
            {event.title}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="text-xs text-gray-600 px-2">
            +{remainingCount} more
          </div>
        )}
      </div>
    </div>
  );
};
