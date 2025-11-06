import { CalendarView } from '@/components/Calendar/CalendarView';
import type { CalendarEvent } from '@/components/Calendar/CalendarView.types';

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team sync-up',
    startTime: new Date(2025, 9, 29, 9, 0),
    endTime: new Date(2025, 9, 29, 10, 0),
    color: 'bg-blue-500',
  },
  {
    id: '2',
    title: 'Lunch Break',
    description: 'Team lunch',
    startTime: new Date(2025, 9, 29, 12, 0),
    endTime: new Date(2025, 9, 29, 13, 0),
    color: 'bg-green-500',
  },
  {
    id: '3',
    title: 'Project Review',
    description: 'Q4 project review meeting',
    startTime: new Date(2025, 9, 30, 14, 0),
    endTime: new Date(2025, 9, 30, 16, 0),
    color: 'bg-purple-500',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CalendarView
        events={sampleEvents}
        onEventClick={(event) => console.log('Event clicked:', event)}
        onAddEvent={(event) => console.log('Event added:', event)}
        onEditEvent={(event) => console.log('Event edited:', event)}
        onDeleteEvent={(id) => console.log('Event deleted:', id)}
      />
    </div>
  );
}

export default App;
