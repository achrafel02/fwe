import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (name: string, startDate: string, endDate: string) => void;
  showSearch: boolean;
  switchTo: string;
  switchToPath: string;
  onAddTravel?: () => void;
  onAddDestination?: () => void;
  showAddTravelButton?: boolean;
  showAddDestinationButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  showSearch,
  switchTo,
  switchToPath,
  onAddTravel,
  onAddDestination,
  showAddTravelButton,
  showAddDestinationButton,
}) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(name, startDate, endDate);
    }
  };

  return (
    <div className="header">
      <div className="header-content">
        <h1>Travel Planner</h1>
        <Link to={switchToPath}>
          <button className="switch-btn">{switchTo}</button>
        </Link>
        {showAddTravelButton && (
          <button className="add-btn" onClick={onAddTravel}>Add new travel</button>
        )}
        {showAddDestinationButton && (
          <button className="add-btn" onClick={onAddDestination}>Add new destination</button>
        )}
      </div>
      {showSearch && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            placeholder="Start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </div>
  );
};

export default Header;
