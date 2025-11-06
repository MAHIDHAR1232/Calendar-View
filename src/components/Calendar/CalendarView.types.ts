export type CalendarView = 'month' | 'week';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  color?: string;
}

export interface CalendarViewProps {
  initialDate?: Date;
  initialView?: CalendarView;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onAddEvent?: (event: Omit<CalendarEvent, 'id'>) => void;
  onEditEvent?: (event: CalendarEvent) => void;
  onDeleteEvent?: (eventId: string) => void;
}

export interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  selectedDate?: Date;
}

export interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  selectedDate?: Date;
}

export interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
  isSelected: boolean;
  onClick: () => void;
  onEventClick: (event: CalendarEvent) => void;
}

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'> | CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
  event?: CalendarEvent;
  selectedDate?: Date;
}
