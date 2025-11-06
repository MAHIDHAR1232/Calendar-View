# Calendar View

A complete, production-ready calendar component library built with React, TypeScript, TailwindCSS, and Storybook.

## Features

- **Multiple Views**: Switch between Month and Week views
- **Event Management**: Add, edit, and delete events with a beautiful modal interface
- **Interactive UI**: Click on dates to add events, click on events to view/edit them
- **Responsive Design**: Fully responsive and works on all screen sizes
- **Type-Safe**: Built with TypeScript for complete type safety
- **Customizable**: Easy to customize colors, styles, and behavior
- **Well-Documented**: Complete Storybook documentation with multiple examples

## Project Structure

```
calendar-component/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── .storybook/
│   ├── main.ts
│   └── preview.ts
└── src/
    ├── components/
    │   ├── Calendar/
    │   │   ├── CalendarView.tsx
    │   │   ├── CalendarView.stories.tsx
    │   │   ├── CalendarView.types.ts
    │   │   ├── MonthView.tsx
    │   │   ├── WeekView.tsx
    │   │   ├── CalendarCell.tsx
    │   │   └── EventModal.tsx
    │   └── primitives/
    │       ├── Button.tsx
    │       ├── Modal.tsx
    │       └── Select.tsx
    ├── hooks/
    │   ├── useCalendar.ts
    │   └── useEventManager.ts
    ├── utils/
    │   ├── date.utils.ts
    │   └── event.utils.ts
    └── styles/
        └── globals.css
```

## Installation

```bash
npm install
```

## Usage

### Running the Application

```bash
npm run dev
```

### Running Storybook

```bash
npm run storybook
```

### Building for Production

```bash
npm run build
```

### Building Storybook

```bash
npm run build-storybook
```

## Quick Start

```tsx
import { CalendarView } from '@/components/Calendar/CalendarView';
import type { CalendarEvent } from '@/components/Calendar/CalendarView.types';

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly sync-up',
    startTime: new Date(2025, 9, 29, 9, 0),
    endTime: new Date(2025, 9, 29, 10, 0),
    color: 'bg-blue-500',
  },
];

function App() {
  return (
    <CalendarView
      events={events}
      onEventClick={(event) => console.log('Event clicked:', event)}
      onAddEvent={(event) => console.log('Event added:', event)}
      onEditEvent={(event) => console.log('Event edited:', event)}
      onDeleteEvent={(id) => console.log('Event deleted:', id)}
    />
  );
}
```

## Components

### CalendarView

The main calendar component that orchestrates all functionality.

**Props:**
- `initialDate?: Date` - Initial date to display (defaults to today)
- `initialView?: 'month' | 'week'` - Initial view mode (defaults to 'month')
- `events?: CalendarEvent[]` - Array of events to display
- `onEventClick?: (event: CalendarEvent) => void` - Callback when an event is clicked
- `onAddEvent?: (event: Omit<CalendarEvent, 'id'>) => void` - Callback when a new event is added
- `onEditEvent?: (event: CalendarEvent) => void` - Callback when an event is edited
- `onDeleteEvent?: (eventId: string) => void` - Callback when an event is deleted

### MonthView

Displays a traditional month calendar grid.

### WeekView

Displays a weekly schedule with hourly time slots.

### CalendarCell

Individual day cell in the month view that shows up to 2 events and a "+ more" indicator.

### EventModal

Form-based modal for adding and editing events with validation.

## Primitive Components

### Button

Reusable button component with multiple variants:
- `primary` - Blue primary button
- `secondary` - Gray secondary button
- `ghost` - Transparent ghost button
- `danger` - Red danger button

Sizes: `sm`, `md`, `lg`

### Modal

Flexible modal component with keyboard support (ESC to close).

Sizes: `sm`, `md`, `lg`, `xl`

### Select

Styled select dropdown with label and error support.

## Hooks

### useCalendar

Manages calendar state including current date, view mode, and navigation.

**Returns:**
- `currentDate: Date` - Currently displayed date
- `view: 'month' | 'week'` - Current view mode
- `selectedDate?: Date` - Currently selected date
- `goToToday()` - Navigate to today
- `goToNext()` - Navigate to next month/week
- `goToPrevious()` - Navigate to previous month/week
- `changeView(view)` - Change view mode
- `selectDate(date)` - Select a date
- `clearSelectedDate()` - Clear selected date

### useEventManager

Manages event state with CRUD operations.

**Returns:**
- `events: CalendarEvent[]` - Array of all events
- `addEvent(event)` - Add a new event
- `updateEvent(event)` - Update an existing event
- `deleteEvent(eventId)` - Delete an event
- `getEventById(eventId)` - Get event by ID

## Utilities

### date.utils.ts

Helper functions for date manipulation:
- `getCalendarGrid(date)` - Get 42-day grid for month view
- `getWeekGrid(date)` - Get 7-day grid for week view
- `isSameDay(date1, date2)` - Check if two dates are the same day
- `isToday(date)` - Check if a date is today
- `isSameMonth(date, month)` - Check if a date is in the same month
- `formatDate(date)` - Format date as readable string
- `formatTime(date)` - Format time as readable string
- `formatMonthYear(date)` - Format month and year
- `addMonths(date, months)` - Add months to a date
- `addWeeks(date, weeks)` - Add weeks to a date
- `getDateKey(date)` - Get unique key for a date

### event.utils.ts

Helper functions for event management:
- `indexEventsByDay(events)` - Index events by day for efficient lookup
- `sortEventsByTime(events)` - Sort events by start time
- `filterEventsByDate(events, date)` - Get events for a specific date
- `filterEventsByDateRange(events, start, end)` - Get events in a date range
- `getEventsForDay(events, date)` - Get sorted events for a day
- `hasEventOnDay(events, date)` - Check if a day has any events
- `getDefaultEventColor(index)` - Get a default color for an event

## TypeScript Support

All components and utilities are fully typed with TypeScript. Import types as needed:

```tsx
import type {
  CalendarEvent,
  CalendarView,
  CalendarViewProps,
  MonthViewProps,
  WeekViewProps,
  CalendarCellProps,
  EventModalProps,
} from '@/components/Calendar/CalendarView.types';
```

## Customization

### Colors

Events support custom Tailwind color classes:

```tsx
const event: CalendarEvent = {
  id: '1',
  title: 'My Event',
  startTime: new Date(),
  endTime: new Date(),
  color: 'bg-purple-500', // Any Tailwind background color
};
```

### Styling

All components use Tailwind CSS and can be customized by:
1. Modifying the component classes directly
2. Extending the Tailwind theme in `tailwind.config.js`
3. Adding custom CSS in `src/index.css`

## Storybook

View all components and their variants in Storybook:

```bash
npm run storybook
```

Available stories:
- **Calendar/CalendarView** - Main calendar with multiple scenarios
- **Primitives/Button** - Button variants and sizes
- **Primitives/Modal** - Modal examples
- **Primitives/Select** - Select dropdown examples

## Browser Support

Works in all modern browsers that support:
- ES2020
- CSS Grid
- Flexbox
- CSS Custom Properties

## License

MIT
