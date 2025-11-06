import { useState, useCallback } from 'react';
import type { CalendarView } from '@/components/Calendar/CalendarView.types';
import { addMonths, addWeeks } from '@/utils/date.utils';

export const useCalendar = (initialDate?: Date, initialView: CalendarView = 'month') => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate || new Date());
  const [view, setView] = useState<CalendarView>(initialView);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const goToNext = useCallback(() => {
    setCurrentDate((prev) => {
      return view === 'month' ? addMonths(prev, 1) : addWeeks(prev, 1);
    });
  }, [view]);

  const goToPrevious = useCallback(() => {
    setCurrentDate((prev) => {
      return view === 'month' ? addMonths(prev, -1) : addWeeks(prev, -1);
    });
  }, [view]);

  const changeView = useCallback((newView: CalendarView) => {
    setView(newView);
  }, []);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const clearSelectedDate = useCallback(() => {
    setSelectedDate(undefined);
  }, []);

  return {
    currentDate,
    view,
    selectedDate,
    goToToday,
    goToNext,
    goToPrevious,
    changeView,
    selectDate,
    clearSelectedDate,
  };
};
