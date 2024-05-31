import React, { useState } from 'react';
import { Travel } from '../services/api';

interface TravelItemProps {
  travel: Travel;
  onUpdate: () => void;
  onDelete: () => void;
  onAddDestination: () => void;
  onRemoveDestination: (destinationId: string) => void;
}

const TravelItem: React.FC<TravelItemProps> = ({ travel, onUpdate, onDelete, onAddDestination, onRemoveDestination }) => {
  const [showDestinations, setShowDestinations] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="travel-item">
      <h3 onClick={() => setShowDestinations(!showDestinations)}>
        {travel.name} ({formatDate(travel.startDate)} - {formatDate(travel.endDate)})
      </h3>
      {showDestinations && (
        <ul>
          {travel.destinations.map((destination) => (
            <li key={destination.id}>
              {destination.name}
              <button className="remove-btn" onClick={() => onRemoveDestination(destination.id)}>
                Remove Destination from Travel
              </button>
            </li>
          ))}
        </ul>
      )}
      <button className="update-btn" onClick={onUpdate}>Update Travel</button>
      <button className="delete-btn" onClick={onDelete}>Delete Travel</button>
      <button className="add-btn" onClick={onAddDestination}>Add Destination to Travel</button>
    </div>
  );
};

export default TravelItem;