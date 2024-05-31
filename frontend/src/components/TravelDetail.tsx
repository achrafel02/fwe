import React from 'react';
import { Travel } from '../services/api';

interface TravelDetailProps {
  travel: Travel | null;
}

const TravelDetail: React.FC<TravelDetailProps> = ({ travel }) => {
  if (!travel) return <div>Loading...</div>;

  return (
    <div>
      <h1>{travel.name}</h1>
      <p>{travel.description}</p>
      {/* Weitere Details der Reise anzeigen */}
    </div>
  );
};

export default TravelDetail;
