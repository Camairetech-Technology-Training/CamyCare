import { useState } from 'react';
import { Prescription } from '../types/prescription';
import { Drug } from '../types/drug';
import { Patient } from '../types/patient';
import { PrescribedDrug } from '../types/prescribedDrug';

import { patientsData } from '../data/patientData';

export const usePrescriptionLogic = (addPrescription: (prescription: Prescription) => void, closeModal: () => void) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patients, setPatients] = useState<Patient[]>(patientsData);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Separate states for drugs and prescribed drugs
  const [drugs, setDrugs] = useState<Drug[]>([]); // For the available drugs in the pharmacy
  const [prescribedDrugs, setPrescribedDrugs] = useState<PrescribedDrug[]>([]); // For drugs that have been prescribed
  const [newDrug, setNewDrug] = useState<PrescribedDrug>({
    id: 0, 
    name: '',
    dosage: '',
    frequency: '',
    duration: 0,
    prescriptionId: 0,
    pharmacyDrugId: 0,
  });
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [isAddNewPatient, setIsAddNewPatient] = useState(false);
  const [isRegisterNewButton, setIsRegisterNewButton] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (value.trim() !== '') {
      const filtered = patients.filter((patient) => patient.phoneNumber.includes(value));
      setFilteredPatients(filtered);

      if (filtered.length === 0) {
        if (value.length === 9) {
          setIsNewPatient(true);
          setIsRegisterNewButton(true);
          setIsAddNewPatient(false);
        }
      } else {
        setIsNewPatient(false);
        setSelectedPatient(null);
      }
    } else {
      setFilteredPatients([]);
      setIsNewPatient(false);
    }
  };

  // Add prescribed drug to the prescription list
  const addDrugToPrescription = () => {
    const finalDosage = newDrug.dosage; 
    const finalFrequency = newDrug.frequency;

    // Add the new prescribed drug to the list
    setPrescribedDrugs([
      ...prescribedDrugs,
      {
        id: prescribedDrugs.length + 1,
        name: newDrug.name,
        dosage: finalDosage,
        frequency: finalFrequency,
        duration: newDrug.duration,
        prescriptionId: Date.now(),
        pharmacyDrugId: 0,
      },
    ]);
    // Reset the new drug input after adding
    setNewDrug({
      id: 0,
      name: '',
      dosage: '',
      frequency: '',
      duration: 0,
      prescriptionId: 0,
      pharmacyDrugId: 0,
    });
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setPhoneNumber(patient.phoneNumber);
    setFilteredPatients([]);
  };

  const handleRegisterNewPatient = () => {
    if (phoneNumber.length === 9) {
      if (newPatientName.trim()) {
        const newPatient: Patient = {
          id: Date.now(),
          name: newPatientName,
          phoneNumber,
          registrationDate: new Date(),
        };
        setPatients((prevPatients) => [...prevPatients, newPatient]);
        setSelectedPatient(newPatient);
        setPhoneNumber('');
        setNewPatientName('');
        setIsNewPatient(false);
        setIsAddNewPatient(false);
      } else {
        alert('Please enter a valid name for the new patient.');
      }
    }
  };

  const handleSubmit = () => {
    const newPrescription: Prescription = {
      id: Date.now(),
      patientName: selectedPatient?.name ?? 'Unknown',
      drugs: prescribedDrugs.map((drug) => drug.name), // Map to the names of prescribed drugs
      status: 'In Progress',
      creationDate: new Date().toISOString().split('T')[0],
      phoneNumber: selectedPatient?.phoneNumber ?? '',
    };

    addPrescription(newPrescription);
    closeModal();
  };

  return {
    phoneNumber,
    setPhoneNumber,
    patients,
    setPatients,
    filteredPatients,
    setFilteredPatients,
    selectedPatient,
    setSelectedPatient,
    drugs,
    setDrugs,
    prescribedDrugs, // Add prescribedDrugs to return
    setPrescribedDrugs, // Expose setter for prescribed drugs
    newDrug,
    setNewDrug,
    isNewPatient,
    setIsNewPatient,
    isAddNewPatient,
    setIsAddNewPatient,
    isRegisterNewButton,
    setIsRegisterNewButton,
    newPatientName,
    setNewPatientName,
    handlePhoneNumberChange,
    addDrugToPrescription,
    handleSelectPatient,
    handleRegisterNewPatient,
    handleSubmit,
  };
};
