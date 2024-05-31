import React from 'react';
import { Destination } from '../services/api';
import DestinationItem from './DestinationItem';

interface DestinationListProps {
  destinations: Destination[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const DestinationList: React.FC<DestinationListProps> = ({ destinations, onUpdate, onDelete }) => {
  return (
    <div>
      {destinations.map((destination) => (
        <DestinationItem 
          key={destination.id} 
          destination={destination} 
          onUpdate={() => onUpdate(destination.id)} 
          onDelete={() => onDelete(destination.id)} 
        />
      ))}
    </div>
  );
};

export default DestinationList;
