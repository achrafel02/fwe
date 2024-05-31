import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTravelById, Travel } from '../services/api';
import TravelDetail from '../components/TravelDetail';

const TravelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [travel, setTravel] = useState<Travel | null>(null);

  useEffect(() => {
    const fetchTravel = async () => {
      if (id) {
        const data = await getTravelById(id);
        setTravel(data);
      }
    };
    fetchTravel();
  }, [id]);

  return <TravelDetail travel={travel} />;
};

export default TravelDetailPage;
