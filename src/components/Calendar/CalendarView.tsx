import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Select } from '@/components/primitives/Select';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { useCalendar } from '@/hooks/useCalendar';
import { useEventManager } from '@/hooks/useEventManager';
import { formatMonthYear } from '@/utils/date.utils';
import type { CalendarViewProps, CalendarEvent } from './CalendarView.types';

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialDate,
  initialView = 'month',
  events: initialEvents = [],
  onEventClick,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const {
    currentDate,
    view,
    selectedDate,
    goToToday,
    goToNext,
    goToPrevious,
    changeView,
    selectDate,
    clearSelectedDate,
  } = useCalendar(initialDate, initialView);

  const { events, addEvent, updateEvent, deleteEvent } = useEventManager(initialEvents);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();

  const handleDateClick = (date: Date) => {
    selectDate(date);
    setSelectedEvent(undefined);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    if (onEventClick) {
      onEventClick(event);
    }
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'> | CalendarEvent) => {
    if ('id' in eventData) {
      updateEvent(eventData);
      if (onEditEvent) {
        onEditEvent(eventData);
      }
    } else {
      const newEvent = addEvent(eventData);
      if (onAddEvent) {
        onAddEvent(eventData);
      }
    }
    setIsModalOpen(false);
    setSelectedEvent(undefined);
    clearSelectedDate();
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    if (onDeleteEvent) {
      onDeleteEvent(eventId);
    }
    setIsModalOpen(false);
    setSelectedEvent(undefined);
  };

  const handleAddNew = () => {
    setSelectedEvent(undefined);
    selectDate(new Date());
    setIsModalOpen(true);
  };

  const viewOptions = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={goToPrevious}>
              <ChevronLeft size={20} />
            </Button>
            <Button variant="ghost" size="sm" onClick={goToNext}>
              <ChevronRight size={20} />
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {formatMonthYear(currentDate)}
          </h1>
          <Button variant="secondary" size="sm" onClick={goToToday}>
            <Calendar size={16} className="mr-1" />
            Today
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Select
            options={viewOptions}
            value={view}
            onChange={(e) => changeView(e.target.value as 'month' | 'week')}
            className="w-32"
          />
          <Button variant="primary" size="md" onClick={handleAddNew}>
            <Plus size={16} className="mr-1" />
            Add Event
          </Button>
        </div>
      </div>

      {view === 'month' ? (
        <MonthView
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          selectedDate={selectedDate}
        />
      ) : (
        <WeekView
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          selectedDate={selectedDate}
        />
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(undefined);
          clearSelectedDate();
        }}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};
