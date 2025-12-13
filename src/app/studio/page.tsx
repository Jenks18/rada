import { StudioDashboard } from '@/components/studio/StudioDashboard';

export default function StudioPage() {
  const mockData = {
    overview: {
      totalRevenue: 45000,
      revenueChange: '+12.5%',
      totalFans: 2500,
      fansChange: '+8.2%',
      pageViews: 15000,
      pageViewsChange: '+15.3%',
      upcomingEvents: 3
    },
    recentEvents: [
      {
        id: '1',
        title: 'Summer Vibes Festival',
        date: '2025-07-15',
        venue: 'Nairobi Arena',
        soldTickets: 450,
        totalCapacity: 500,
        revenue: 22500
      },
      {
        id: '2',
        title: 'Acoustic Night',
        date: '2025-08-20',
        venue: 'The Jazz Club',
        soldTickets: 180,
        totalCapacity: 200,
        revenue: 9000
      }
    ],
    topFans: [
      {
        id: '1',
        name: 'John Doe',
        totalSpent: 1200
      },
      {
        id: '2',
        name: 'Jane Smith',
        totalSpent: 950
      }
    ],
    recentActivities: [
      {
        id: '1',
        type: 'ticket_sale',
        description: 'New ticket purchased for Summer Vibes Festival',
        timestamp: new Date().toISOString()
      }
    ]
  };

  return <StudioDashboard data={mockData} />;
}
