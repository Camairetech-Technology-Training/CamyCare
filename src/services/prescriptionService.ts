import { Prescription } from '../models/pescription';
import { BASE_URL, ENDPOINTS } from '../api/urls';
// import { apiCall } from '../api/api';
import axios from 'axios';

const ADD_PRESCRIPTION_URL = `${BASE_URL}${ENDPOINTS.ADD_PRESCRIPTION}`;

export const savePrescription = async (prescription: Prescription) => {

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: ADD_PRESCRIPTION_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: prescription,
  };

  try {
    const response = await axios.request(config);
    console.log('Patient added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};
