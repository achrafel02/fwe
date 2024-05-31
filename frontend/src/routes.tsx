import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TravelPage from './pages/TravelPage';
import TravelDetailPage from './pages/TravelDetailPage';
import DestinationPage from './pages/DestinationPage';
import DestinationDetailPage from './pages/DestinationDetailPage';

interface AppRoutesProps {
  searchQuery: { name: string; startDate: string; endDate: string };
}

const AppRoutes: React.FC<AppRoutesProps> = ({ searchQuery }) => (
  <Routes>
    <Route path="/" element={<TravelPage searchQuery={searchQuery} />} />
    <Route path="/travels/:id" element={<TravelDetailPage />} />
    <Route path="/destinations" element={<DestinationPage />} />
    <Route path="/destinations/:id" element={<DestinationDetailPage />} />
  </Routes>
);

export default AppRoutes;
