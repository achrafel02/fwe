import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (name) query.append('name', name);
    if (startDate) query.append('startDate', startDate);
    if (endDate) query.append('endDate', endDate);
    onSearch(query.toString());
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Reisen suchen..."
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Startdatum"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="Enddatum"
      />
      <button onClick={handleSearch}>Suchen</button>
    </div>
  );
};

export default SearchBar;
