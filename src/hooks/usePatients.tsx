import { useState, useEffect } from 'react';
import { fetchPatientsByPharmacyId } from '../services/patientService';
import { Patient } from '../models/patient';
import LocalStorageService from '../services/localStorageService';

interface PharmacyData {
  id: string;
  name: string;
  phoneNumber: string;
}

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pharmacyData = LocalStorageService.getItem<PharmacyData>('pharmacyData');

    if (!pharmacyData || !pharmacyData.id) {
      setError('Pharmacy data is missing or invalid in local storage');
      return;
    }

    const pharmacyId = pharmacyData.id;

    const fetchPatientsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPatientsByPharmacyId(pharmacyId);
        setPatients(data);
      } catch (err) {
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientsData();
  }, [])

  const addNewPatient = (newPatient: Patient) => {
    setPatients((prevPatients) => [newPatient, ...prevPatients]);
  };

  return { patients, loading, error, addNewPatient };
};

export default usePatients;
