'use client';

import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LocationFilterProps {
  selectedLocation: string | null;
  onLocationChange: (location: string | null) => void;
}

const KENYAN_LOCATIONS = [
  { id: 'all', name: 'All Areas', icon: '🇰🇪' },
  { id: 'westlands', name: 'Westlands', icon: '🏙️' },
  { id: 'kilimani', name: 'Kilimani', icon: '🌆' },
  { id: 'karen', name: 'Karen', icon: '🌳' },
  { id: 'cbd', name: 'CBD', icon: '🏢' },
  { id: 'south-b', name: 'South B', icon: '🏘️' },
  { id: 'south-c', name: 'South C', icon: '🏘️' },
  { id: 'mombasa', name: 'Mombasa', icon: '🏖️' },
  { id: 'kisumu', name: 'Kisumu', icon: '🌊' },
  { id: 'nakuru', name: 'Nakuru', icon: '🦩' },
];

export function LocationFilter({ selectedLocation, onLocationChange }: LocationFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <MapPin className="w-4 h-4" />
        <span>Filter by Location</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {KENYAN_LOCATIONS.map((location) => {
          const isSelected = selectedLocation === location.id || 
                           (location.id === 'all' && !selectedLocation);
          
          return (
            <Button
              key={location.id}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => onLocationChange(location.id === 'all' ? null : location.id)}
              className={`
                transition-all duration-200
                ${isSelected 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0' 
                  : 'hover:border-purple-400'
                }
              `}
            >
              <span className="mr-1.5">{location.icon}</span>
              {location.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
