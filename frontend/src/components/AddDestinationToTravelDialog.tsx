import React, { useEffect, useState } from 'react';
import { getDestinations, Destination } from '../services/api';

interface AddDestinationDialogProps {
  onAdd: (destinationId: string) => void;
  onClose: () => void;
}

const AddDestinationDialog: React.FC<AddDestinationDialogProps> = ({ onAdd, onClose }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('');

  useEffect(() => {
    const fetchDestinations = async () => {
      const data = await getDestinations();
      setDestinations(data);
    };

    fetchDestinations();
  }, []);

  const handleAdd = () => {
    if (selectedDestination) {
      onAdd(selectedDestination);
      onClose();
    }
  };

  return (
    <div className="dialog">
      <h2>Select Destination to Add</h2>
      <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)}>
        <option value="" disabled>Select a destination</option>
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.id}>
            {destination.name}
          </option>
        ))}
      </select>
      <button onClick={handleAdd}>Add Destination</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddDestinationDialog;
