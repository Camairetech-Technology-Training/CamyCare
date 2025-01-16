import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchPatientsByPharmacyId } from '../services/patientService';
import { useUser } from './UserContext';
import { Patient } from '../models/patient';

interface PatientContextProps {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  addNewPatient: (newPatient: Patient) => void;
}

const PatientContext = createContext<PatientContextProps | undefined>(undefined);

export const usePatientContext = (): PatientContextProps => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatientContext must be used within a PatientProvider');
  }
  return context;
};

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const { pharmacyData } = useUser();

  useEffect(() => {
    const loadPatients = async () => {
      if (pharmacyData && pharmacyData.id) {
        try {
          const fetchedPatients = await fetchPatientsByPharmacyId(pharmacyData.id);
          setPatients(fetchedPatients);
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      }
    };

    if (patients.length === 0 && pharmacyData?.id) {
      loadPatients();
    }
  }, [patients, pharmacyData]);

  const addNewPatient = (newPatient: Patient) => {
    setPatients((prevPatients) => [...prevPatients, newPatient]);
  };

  return (
    <PatientContext.Provider value={{ patients, setPatients, addNewPatient }}>
      {children}
    </PatientContext.Provider>
  );
};
