import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../api/urls';

const SIGNUP_PHARMACY_URL = `${BASE_URL}${ENDPOINTS.SIGNUP_PHARMACY}`;
const GET_PHARMACY_URL = `${BASE_URL}${ENDPOINTS.GET_PHARMACY}`;

interface Pharmacy {
  name: string;
  phoneNumber: string;
  password: string;
}

export const signUpPharmacy = async (pharmacyData: Pharmacy) => {
  const data = JSON.stringify(pharmacyData);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: SIGNUP_PHARMACY_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('Pharmacy signed up successfully:', response.data);
    return response.data;  // This should contain the qrCode
  } catch (error) {
    console.error('Error signing up pharmacy:', error);
    throw error;
  }
};

// Function to fetch pharmacy by ID
export const getPharmacyById = async (id: string) => {
  const url = `${GET_PHARMACY_URL}/${id}`;

  try {
    const response = await axios.get(url);
    console.log('Fetched pharmacy data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching pharmacy by ID:', error);
    throw error;
  }
};
