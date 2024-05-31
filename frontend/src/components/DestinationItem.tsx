import React, { useState } from 'react';
import { Destination } from '../services/api';

interface DestinationItemProps {
  destination: Destination;
  onUpdate: () => void;
  onDelete: () => void;
}

const DestinationItem: React.FC<DestinationItemProps> = ({ destination, onUpdate, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="destination-item">
      <h3 onClick={() => setShowDetails(!showDetails)}>
        {destination.name}
      </h3>
      <div className="destination-buttons">
        <button className="update-btn" onClick={onUpdate}>Reiseziel bearbeiten</button>
        <button className="delete-btn" onClick={onDelete}>Reiseziel löschen</button>
      </div>
      {showDetails && (
        <div>
          <p>{destination.description}</p>
        </div>
      )}
    </div>
  );
};

export default DestinationItem;
