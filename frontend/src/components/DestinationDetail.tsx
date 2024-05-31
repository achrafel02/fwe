import React from 'react';
import { Destination } from '../services/api';

interface DestinationDetailProps {
  destination: Destination | null;
}

const DestinationDetail: React.FC<DestinationDetailProps> = ({ destination }) => {
  if (!destination) return <div>Loading...</div>;

  return (
    <div>
      <h1>{destination.name}</h1>
      <p>{destination.description}</p>
      {/* Weitere Details des Reiseziels anzeigen */}
    </div>
  );
};

export default DestinationDetail;
