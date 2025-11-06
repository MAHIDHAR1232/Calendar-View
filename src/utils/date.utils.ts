export const getCalendarGrid = (activeDate: Date): Date[] => {
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const grid: Date[] = [];

  for (let i = 0; i < startDay; i++) {
    const date = new Date(year, month, -startDay + i + 1);
    grid.push(date);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    grid.push(new Date(year, month, i));
  }

  const remainingDays = 42 - grid.length;
  for (let i = 1; i <= remainingDays; i++) {
    grid.push(new Date(year, month + 1, i));
  }

  return grid;
};

export const getWeekGrid = (activeDate: Date): Date[] => {
  const day = activeDate.getDay();
  const diff = activeDate.getDate() - day;

  const weekStart = new Date(activeDate);
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0);

  const grid: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    grid.push(date);
  }

  return grid;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isSameMonth = (date: Date, month: Date): boolean => {
  return (
    date.getFullYear() === month.getFullYear() &&
    date.getMonth() === month.getMonth()
  );
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
};

export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

export const addWeeks = (date: Date, weeks: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + weeks * 7);
  return newDate;
};

export const getDateKey = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
