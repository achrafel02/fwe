import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { getDestinations, Destination } from '../services/api';
import DestinationList from '../components/DestinationList';

const DestinationPage = forwardRef((props, ref) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const fetchDestinations = async () => {
    const data = await getDestinations();
    setDestinations(data);
  };

  const handleUpdate = (id: string) => {
    console.log('Update destination:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete destination:', id);
  };

  useImperativeHandle(ref, () => ({
    fetchDestinations,
  }));

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div>
      <DestinationList 
        destinations={destinations} 
        onUpdate={handleUpdate} 
        onDelete={handleDelete} 
      />
    </div>
  );
});

export default DestinationPage;
