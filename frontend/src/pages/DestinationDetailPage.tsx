import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDestinationById, Destination } from '../services/api';
import DestinationDetail from '../components/DestinationDetail';

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      if (id) {
        const data = await getDestinationById(id);
        setDestination(data);
      }
    };
    fetchDestination();
  }, [id]);

  return <DestinationDetail destination={destination} />;
};

export default DestinationDetailPage;
