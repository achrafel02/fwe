import React, { useState } from 'react';

interface AddTravelDialogProps {
  onAdd: (travel: { name: string; description: string; startDate: string; endDate: string }) => void;
  onClose: () => void;
}

const AddTravelDialog: React.FC<AddTravelDialogProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAdd = () => {
    if (name && description && startDate && endDate) {
      onAdd({ name, description, startDate, endDate });
      onClose();
    }
  };

  return (
    <div className="dialog">
      <h2>Add New Travel</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleAdd}>Add Travel</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddTravelDialog;
