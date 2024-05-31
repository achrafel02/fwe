import React, { useState } from 'react';

interface AddDestinationDialogProps {
  onAdd: (destination: { name: string; description: string; startDate: string; endDate: string }) => void;
  onClose: () => void;
}

const AddDestinationDialog: React.FC<AddDestinationDialogProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    const startDate = '2024-07-01';
    const endDate = '2024-07-10';
    if (name && description) {
      onAdd({ name, description, startDate, endDate });
      onClose();
    }
  };

  return (
    <div className="dialog">
      <h2>Add New Destination</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleAdd}>Add Destination</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddDestinationDialog;
