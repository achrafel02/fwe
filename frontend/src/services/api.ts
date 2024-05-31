import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface Travel {
  id: string;
  name: string;
  description: string;
  destinations: Destination[];
  startDate: string;
  endDate: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  startDate: string; 
  endDate: string; 
  travels: Travel[];
  location: {
    type: string;
    coordinates: [number, number];
  };
}

export const getTravels = async (): Promise<Travel[]> => {
  const response = await axios.get(`${API_URL}/travels`);
  const travels = response.data;

  // Load full destination details for each travel
  const travelWithDestinations = await Promise.all(travels.map(async (travel: any) => {
    const destinations = await Promise.all(travel.destinations.map(async (destinationId: string) => {
      try {
        const destinationResponse = await axios.get(`${API_URL}/destinations/${destinationId}`);
        return destinationResponse.data;
      } catch (error) {
        console.error(`Failed to fetch destination with ID ${destinationId}:`, error);
        return { id: destinationId, name: 'Unknown Destination', travels: [] };
      }
    }));
    return { ...travel, destinations };
  }));

  return travelWithDestinations;
};

export const getTravelById = async (id: string): Promise<Travel> => {
  const response = await axios.get(`${API_URL}/travels/${id}`);
  return response.data;
};

export const createTravel = async (travel: Travel): Promise<Travel> => {
  const response = await axios.post(`${API_URL}/travels`, travel);
  return response.data;
};

export const updateTravel = async (id: string, travel: Travel): Promise<Travel> => {
  const response = await axios.put(`${API_URL}/travels/${id}`, travel);
  return response.data;
};

export const deleteTravel = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/travels/${id}`);
};

export const addDestinationToTravel = async (travelId: string, destinationId: string): Promise<void> => {
  await axios.post(`${API_URL}/travels/${travelId}/destinations/${destinationId}`);
};

export const removeDestinationFromTravel = async (travelId: string, destinationId: string): Promise<void> => {
  await axios.delete(`${API_URL}/travels/${travelId}/destinations/${destinationId}`);
};

export const getDestinations = async (): Promise<Destination[]> => {
  const response = await axios.get(`${API_URL}/destinations`);
  return response.data;
};

export const getDestinationById = async (id: string): Promise<Destination> => {
  const response = await axios.get(`${API_URL}/destinations/${id}`);
  return response.data;
};

export const createDestination = async (destination: Destination): Promise<Destination> => {
  const response = await axios.post(`${API_URL}/destinations`, destination);
  return response.data;
};

export const updateDestination = async (id: string, destination: Destination): Promise<Destination> => {
  const response = await axios.put(`${API_URL}/destinations/${id}`, destination);
  return response.data;
};

export const deleteDestination = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/destinations/${id}`);
};

export const searchTravels = async (name: string, startDate: string, endDate: string): Promise<Travel[]> => {
  const response = await axios.get(`${API_URL}/travels/search`, {
    params: { name, startDate, endDate },
  });
  return response.data;
};