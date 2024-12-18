import { prescriptionsData } from '../data/prescriptionsData';
import { Prescription } from '../types/prescription';

export const addPrescription = (newPrescription: Prescription) => {
  prescriptionsData.push(newPrescription);
  console.log('Prescription added:', newPrescription);
};
