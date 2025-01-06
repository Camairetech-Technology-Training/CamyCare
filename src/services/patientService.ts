import { apiCall } from '../api/api';
import { Patient } from '../models/patient'
import { BASE_URL, ENDPOINTS } from '../api/urls';

const API_URL = `${BASE_URL}${ENDPOINTS.GET_PATIENTS}`;

export const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const response = await apiCall<null, Patient[]>({
      url: API_URL,
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};
