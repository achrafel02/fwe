import React, { useEffect, useState } from 'react';
import { getTravels, searchTravels, addDestinationToTravel, deleteTravel, Travel } from '../services/api';
import TravelList from '../components/TravelList';
import AddDestinationDialog from '../components/AddDestinationToTravelDialog';

interface TravelPageProps {
  searchQuery: { name: string; startDate: string; endDate: string };
}

const TravelPage: React.FC<TravelPageProps> = ({ searchQuery }) => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentTravelId, setCurrentTravelId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTravels = async () => {
      const { name, startDate, endDate } = searchQuery;
      const data = name || (startDate && endDate) 
        ? await searchTravels(name, startDate, endDate)
        : await getTravels();
      setTravels(data);
    };

    fetchTravels();
  }, [searchQuery]);

  const handleUpdate = (id: string) => {
    console.log(`Update travel: ${id}`);
    // Implement update functionality
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTravel(id);
      setTravels(travels.filter(travel => travel.id !== id));
    } catch (error) {
      console.error('Failed to delete travel:', error);
    }
  };

  const handleAddDestination = (id: string) => {
    setCurrentTravelId(id);
    setShowDialog(true);
  };

  const handleRemoveDestination = async (travelId: string, destinationId: string) => {
    console.log(`Remove destination ${destinationId} from travel ${travelId}`);
    // Implement remove destination functionality
  };

  const handleAdd = async (destinationId: string) => {
    if (currentTravelId) {
      await addDestinationToTravel(currentTravelId, destinationId);
      const updatedTravels = await getTravels();
      setTravels(updatedTravels);
    }
  };

  return (
    <>
      <TravelList 
        travels={travels} 
        onUpdate={handleUpdate} 
        onDelete={handleDelete} 
        onAddDestination={handleAddDestination} 
        onRemoveDestination={handleRemoveDestination} 
      />
      {showDialog && (
        <AddDestinationDialog 
          onAdd={handleAdd} 
          onClose={() => setShowDialog(false)} 
        />
      )}
    </>
  );
};

export default TravelPage;