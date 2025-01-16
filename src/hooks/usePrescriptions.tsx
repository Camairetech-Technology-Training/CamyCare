import { useState, useEffect } from 'react';
import { Prescription } from '../models/pescription';
import { fetchPrescriptions } from '../services/prescriptionService';

const usePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prescriptions.length === 0) {
      const fetchPrescriptionsData = async () => {
        setLoading(true);
        try {
          const data = await fetchPrescriptions();
          console.log(data);
          setPrescriptions(data);
        } catch (err) {
          setError('Failed to load prescriptions');
        } finally {
          setLoading(false);
        }
      };

      fetchPrescriptionsData();
    }
  }, [prescriptions]);

  const addNewPrescription = (newPrescription: Prescription) => {
    setPrescriptions((prevPrescriptions) => [newPrescription, ...prevPrescriptions]);
  };

  return { prescriptions, loading, error, addNewPrescription };
};

export default usePrescriptions;