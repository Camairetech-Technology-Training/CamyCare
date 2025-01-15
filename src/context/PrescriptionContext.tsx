import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchPrescriptionsByPharmacyId } from '../services/prescriptionService';
import { Prescription } from '../models/pescription';
import { useUser } from './UserContext';

interface PrescriptionContextProps {
  prescriptions: Prescription[];
  setPrescriptions: React.Dispatch<React.SetStateAction<Prescription[]>>;
  addNewPrescription: (newPrescription: Prescription) => void;
}

const PrescriptionContext = createContext<PrescriptionContextProps | undefined>(undefined);

export const usePrescriptionContext = (): PrescriptionContextProps => {
  const context = useContext(PrescriptionContext);
  if (!context) {
    throw new Error('usePrescriptionContext must be used within a PrescriptionProvider');
  }
  return context;
};

interface PrescriptionProviderProps {
  children: ReactNode;
}

export const PrescriptionProvider: React.FC<PrescriptionProviderProps> = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const { pharmacyData } = useUser();

  useEffect(() => {
    const loadPrescriptions = async () => {
      if (pharmacyData && pharmacyData.id) {
        try {
          const fetchedPrescriptions = await fetchPrescriptionsByPharmacyId(pharmacyData.id);
          setPrescriptions(fetchedPrescriptions);
        } catch (error) {
          console.error('Error fetching prescriptions:', error);
        }
      }
    };

    if (pharmacyData?.id) {
      loadPrescriptions();
    }
  }, [pharmacyData]);

  const addNewPrescription = (newPrescription: Prescription) => {
    setPrescriptions((prevPrescriptions) => [...prevPrescriptions, newPrescription]);
  };

  return (
    <PrescriptionContext.Provider value={{ prescriptions, setPrescriptions, addNewPrescription }}>
      {children}
    </PrescriptionContext.Provider>
  );
};
