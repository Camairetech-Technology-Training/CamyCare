import { useState, useEffect } from 'react';
import { fetchPatients } from '../services/patientService';
import { Patient } from '../models/patient';

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch patients when the component mounts
  useEffect(() => {
    const fetchPatientsData = async () => {
      setLoading(true);
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err) {
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientsData();
  }, []);

  // Add a new patient
  const addNewPatient = (newPatient: Patient) => {
    setPatients((prevPatients) => [newPatient, ...prevPatients]);
  };

  return { patients, loading, error, addNewPatient };
};

export default usePatients;
