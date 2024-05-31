import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TravelPage from './pages/TravelPage';
import TravelDetailPage from './pages/TravelDetailPage';
import DestinationPage from './pages/DestinationPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import Header from './components/Header';
import AddTravelDialog from './components/AddTravelDialog';
import AddDestinationDialog from './components/AddDestinationDialog';
import { createTravel, createDestination, Travel, Destination } from './services/api';

const App: React.FC = () => {
  const [query, setQuery] = useState({ name: '', startDate: '', endDate: '' });
  const [showTravelDialog, setShowTravelDialog] = useState(false);
  const [showDestinationDialog, setShowDestinationDialog] = useState(false);
  const destinationPageRef = useRef<{ fetchDestinations: () => void } | null>(null);

  const handleSearch = (name: string, startDate: string, endDate: string) => {
    setQuery({ name, startDate, endDate });
  };

  const handleAddTravel = async (travel: { name: string, description: string, startDate: string, endDate: string }) => {
    await createTravel(travel as Travel);
    setShowTravelDialog(false);
  };

  const handleAddDestination = async (destination: { name: string, description: string, startDate: string, endDate: string }) => {
    const newDestination: Destination = {
      ...destination,
      id: '',
      travels: [],
      location: {
        type: "Point",
        coordinates: [0, 0] // Standardwerte
      }
    };
    await createDestination(newDestination);
    setShowDestinationDialog(false);
    destinationPageRef.current?.fetchDestinations();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header
              onSearch={handleSearch}
              showSearch={true}
              switchTo="Switch to Destination-Page"
              switchToPath="/destinations"
              onAddTravel={() => setShowTravelDialog(true)}
              showAddTravelButton={true}
            />
            <TravelPage searchQuery={query} />
          </>
        } />
        <Route path="/travels/:id" element={<TravelDetailPage />} />
        <Route path="/destinations" element={
          <>
            <Header
              showSearch={false}
              switchTo="Switch to Travel-Page"
              switchToPath="/"
              onAddDestination={() => setShowDestinationDialog(true)}
              showAddDestinationButton={true}
            />
            <DestinationPage ref={destinationPageRef} />
          </>
        } />
        <Route path="/destinations/:id" element={<DestinationDetailPage />} />
      </Routes>
      {showTravelDialog && <AddTravelDialog onAdd={handleAddTravel} onClose={() => setShowTravelDialog(false)} />}
      {showDestinationDialog && <AddDestinationDialog onAdd={handleAddDestination} onClose={() => setShowDestinationDialog(false)} />}
    </Router>
  );
};

export default App;
