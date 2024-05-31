// travelWarningController.ts

import axios from 'axios';

export const getTravelWarningById = async (id: string) => {
  try {
    const response = await axios.get(`https://www.auswaertiges-amt.de/opendata/travelwarning/${id}`, {
      headers: {
        'accept': 'text/json;charset=UTF-8'
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching travel warning:', error);
    throw error;
  }
};
