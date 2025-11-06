import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import type { CalendarEvent } from './CalendarView.types';

const meta: Meta<typeof CalendarView> = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team sync-up',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
    color: 'bg-blue-500',
  },
  {
    id: '2',
    title: 'Lunch with Client',
    description: 'Discuss project requirements',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
    color: 'bg-green-500',
  },
  {
    id: '3',
    title: 'Project Deadline',
    description: 'Submit final deliverables',
    startTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 17, 0),
    endTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 18, 0),
    color: 'bg-red-500',
  },
  {
    id: '4',
    title: 'Workshop',
    description: 'React Advanced Patterns',
    startTime: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 14, 0),
    endTime: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 17, 0),
    color: 'bg-purple-500',
  },
  {
    id: '5',
    title: 'Conference Call',
    description: 'Q4 Planning',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0),
    color: 'bg-yellow-500',
  },
];

export const EmptyCalendar: Story = {
  args: {
    initialView: 'month',
  },
};

export const MonthViewWithEvents: Story = {
  args: {
    initialView: 'month',
    events: sampleEvents,
  },
};

export const WeekViewWithEvents: Story = {
  args: {
    initialView: 'week',
    events: sampleEvents,
  },
};

export const WithCallbacks: Story = {
  args: {
    initialView: 'month',
    events: sampleEvents,
    onEventClick: (event) => {
      console.log('Event clicked:', event);
    },
    onAddEvent: (event) => {
      console.log('Event added:', event);
    },
    onEditEvent: (event) => {
      console.log('Event edited:', event);
    },
    onDeleteEvent: (eventId) => {
      console.log('Event deleted:', eventId);
    },
  },
};

const manyEvents: CalendarEvent[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + Math.floor(i / 3));
  const hour = 9 + (i % 8);

  return {
    id: `event-${i}`,
    title: `Event ${i + 1}`,
    description: `Description for event ${i + 1}`,
    startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 0),
    endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 1, 0),
    color: ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'][
      i % 5
    ],
  };
});

export const BusyCalendar: Story = {
  args: {
    initialView: 'month',
    events: manyEvents,
  },
};

export const CustomInitialDate: Story = {
  args: {
    initialDate: new Date(2024, 11, 25),
    initialView: 'month',
    events: [
      {
        id: 'christmas',
        title: 'Christmas Day',
        description: 'Holiday celebration',
        startTime: new Date(2024, 11, 25, 0, 0),
        endTime: new Date(2024, 11, 25, 23, 59),
        color: 'bg-red-500',
      },
    ],
  },
};
