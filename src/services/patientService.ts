import { apiCall } from '../api/api';
import { Patient } from '../models/patient';
import { BASE_URL, ENDPOINTS } from '../api/urls';
import axios from 'axios';

const GET_PATIENT_URL = `${BASE_URL}${ENDPOINTS.GET_PATIENTS}`
const ADD_PATIENT_URL = `${BASE_URL}${ENDPOINTS.ADD_PATIENT}`;

export const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const response = await apiCall<null, Patient[]>({
      url: GET_PATIENT_URL,
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const addPatient = async (fullName: string, phoneNumber: string): Promise<Patient> => {
  const data = JSON.stringify({
    fullName,
    phoneNumber,
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: ADD_PATIENT_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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
