import React from 'react';
import TravelItem from './TravelItem';
import { Travel } from '../services/api';

interface TravelListProps {
  travels: Travel[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onAddDestination: (id: string) => void;
  onRemoveDestination: (travelId: string, destinationId: string) => void;
}

const TravelList: React.FC<TravelListProps> = ({ travels, onUpdate, onDelete, onAddDestination, onRemoveDestination }) => {
  return (
    <div>
      {travels.map((travel) => (
        <TravelItem
          key={travel.id}
          travel={travel}
          onUpdate={() => onUpdate(travel.id)}
          onDelete={() => onDelete(travel.id)}
          onAddDestination={() => onAddDestination(travel.id)}
          onRemoveDestination={(destinationId: string) => travel.id && onRemoveDestination(travel.id, destinationId)}
        />
      ))}
    </div>
  );
};

export default TravelList;
