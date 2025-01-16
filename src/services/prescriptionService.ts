import { Prescription } from '../models/pescription';
import { BASE_URL, ENDPOINTS } from '../api/urls';
import { apiCall } from '../api/api';
import axios from 'axios';
import LocalStorageService from './localStorageService';
import { Pharmacy } from '../models/pharmacy';

const ADD_PRESCRIPTION_URL = `${BASE_URL}${ENDPOINTS.ADD_PRESCRIPTION}`;
const GET_PRESCRIPTION_URL = `${BASE_URL}${ENDPOINTS.GET_PRESCRIPTION}`;
const GET_PRESCRIPTIONS_BY_PHARMACY_URL = `${BASE_URL}${ENDPOINTS.GET_PRESCRIPTIONS_BY_PHARMACY}`;

export const fetchPrescriptionsByPharmacyId = async (pharmacyId: string): Promise<Prescription[]> => {
  if (!pharmacyId) {
    throw new Error('Pharmacy ID is required');
  }

  try {
    const response = await apiCall<null, Prescription[]>({
      url: `${GET_PRESCRIPTIONS_BY_PHARMACY_URL}/${pharmacyId}`,
      method: 'GET',
    });
    console.log(`Fetched prescriptions for pharmacy ${pharmacyId}:`, response);
    return response;
  } catch (error) {
    console.error('Error fetching prescriptions by pharmacy ID:', error);
    throw error;
  }
};


export const fetchPrescriptions = async (): Promise<Prescription[]> => {
  try {
    const response = await apiCall<null, Prescription[]>({
      url: GET_PRESCRIPTION_URL,
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    throw error;
  }
};

export const savePrescription = async (prescription: Prescription) => {
  const pharmacyData = LocalStorageService.getItem<Pharmacy>('pharmacyData');

  if (!pharmacyData || !pharmacyData.id) {
    throw new Error('Pharmacy data is missing or invalid in local storage');
  }

  const data = JSON.stringify({
    ...prescription,
    pharmacyId: pharmacyData.id,
  });

  console.log(data)

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: ADD_PRESCRIPTION_URL,
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
