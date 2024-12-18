import React, { useState } from 'react';
import { Prescription } from '../../types/prescription';
import { PrescribedDrug } from '../../types/prescribedDrug';
import { Patient } from '../../types/entities';

import { patientsData } from '../../data/patientData';
import { drugList } from '../../data/drugData';
import { predefinedDosages } from '../../data/predifinedData';
import { predefinedFrequencies } from '../../data/predefinedFrequencies';

interface AddPrescriptionProps {
  addPrescription: (prescription: Prescription) => void;
  closeModal: () => void;
}

const AddPrescription: React.FC<AddPrescriptionProps> = ({ addPrescription, closeModal }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patients, setPatients] = useState<Patient[]>(patientsData);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [drugs, setDrugs] = useState<PrescribedDrug[]>([]);
  const [newDrug, setNewDrug] = useState({
    name: '',
    dosage: '',
    customDosage: '',
    frequency: '',
    customFrequency: '',
    duration: 0,
  });
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [isAddNewPatient, setIsAddNewPatient] = useState(false);
  const [isRegisterNewButton, setIsRegisterNewButton] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');

  const handleSubmit = () => {
    const newPrescription: Prescription = {
      id: Date.now(),
      patientName: selectedPatient?.name ?? 'Unknown',
      drugs: drugs.map((drug) => drug.name),
      status: 'In Progress',
      creationDate: new Date().toISOString().split('T')[0],
      phoneNumber: selectedPatient?.phoneNumber ?? '',
    };

    addPrescription(newPrescription);
    closeModal();
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
  
    if (value.trim() !== '') {
      const filtered = patients.filter((patient) => patient.phoneNumber.includes(value));
      setFilteredPatients(filtered);
  
      if (filtered.length === 0) {
  
        if(value.length == 9) {
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
  
  const addDrugToPrescription = () => {
    const finalDosage = newDrug.dosage === 'Custom' ? newDrug.customDosage : newDrug.dosage;
    const finalFrequency = newDrug.frequency === 'Custom' ? newDrug.customFrequency : newDrug.frequency;

    setDrugs([
      ...drugs,
      {
        id: drugs.length + 1,
        name: newDrug.name,
        dosage: finalDosage,
        frequency: finalFrequency,
        duration: newDrug.duration,
        prescriptionId: 0,
        pharmacyDrugId : 0
      },
    ]);
    setNewDrug({
      name: '',
      dosage: '',
      customDosage: '',
      frequency: '',
      customFrequency: '',
      duration: 0,
    });
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setPhoneNumber(patient.phoneNumber);
    setFilteredPatients([]);
  };

  const handleDrugInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDrug((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const removeDrug = (id: number) => {
    setDrugs((prevDrugs) => prevDrugs.filter((drug) => drug.id !== id));
  };

  const handleRegisterNewPatient = () => {

    if(phoneNumber.length == 9) {
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

  return (
<div className="p-2">

  {/* Phone Number Input */}
  <div className="mb-4 relative max-w-md mx-auto">
    <label className="block text-lg font-medium">Patient Phone Number</label>
    <input
      type="text"
      value={phoneNumber}
      onChange={handlePhoneNumberChange}
      className="mt-2 px-4 py-2 border rounded-lg w-full"
      placeholder="Enter phone number (e.g., 6XXXXXX)"
    />
    {filteredPatients.length > 0 && (
      <ul className="absolute bg-white border rounded-lg mt-1 w-full max-w-sm mx-auto">
        {filteredPatients.map((patient) => (
          <li
            key={patient.id}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleSelectPatient(patient)}
          >
            {patient.name} ({patient.phoneNumber})
          </li>
        ))}
      </ul>
    )}
    {isNewPatient && (
      <div className="mt-4">
        {isRegisterNewButton && (
          <button
            onClick={() => [setIsAddNewPatient(true), setIsRegisterNewButton(false)]}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Register a New Patient
          </button>
        )}
        {isAddNewPatient && (
          <div className="mt-4">
            <input
              type="text"
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="px-4 py-2 border rounded-lg w-full"
            />
            <button
              onClick={handleRegisterNewPatient}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Register Patient
            </button>
          </div>
        )}
      </div>
    )}
  </div>

  {selectedPatient && (
    <>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md max-w-sm mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Selected Patient:</h2>
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-medium text-gray-700">
            <span className="font-bold text-gray-900">Name:</span> {selectedPatient.name}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-bold text-gray-900">Phone:</span> {selectedPatient.phoneNumber}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Drugs</h2>

        {/* Horizontal Flex Container for Form Fields */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {/* Drug Name Dropdown */}
          <div className="w-full">
            <label className="block text-lg font-medium">Drug</label>
            <select
              name="name"
              value={newDrug.name || ""}
              onChange={handleDrugInputChange}
              className="mt-2 px-4 py-2 border rounded-lg w-full"
            >
              <option value="">Select Drug</option>
              {drugList.map((drug) => (
                <option key={drug.id} value={drug.name}>
                  {drug.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dosage Dropdown */}
          <div className="w-full">
            <label className="block text-lg font-medium">Dosage</label>
            <select
              name="dosage"
              value={newDrug.dosage || ""}
              onChange={handleDrugInputChange}
              className="mt-2 px-4 py-2 border rounded-lg w-full"
            >
              <option value="">Select Dosage</option>
              {predefinedDosages.map((dosage, index) => (
                <option key={index} value={dosage}>
                  {dosage}
                </option>
              ))}
            </select>

            {newDrug.dosage === "Custom" && (
              <input
                type="text"
                name="customDosage"
                value={newDrug.customDosage || ""}
                onChange={handleDrugInputChange}
                placeholder="Enter custom dosage"
                className="mt-2 px-4 py-2 border rounded-lg w-full"
              />
            )}
          </div>

          {/* Frequency Dropdown */}
          <div className="w-full">
            <label className="block text-lg font-medium">Frequency</label>
            <select
              name="frequency"
              value={newDrug.frequency || ""}
              onChange={handleDrugInputChange}
              className="mt-2 px-4 py-2 border rounded-lg w-full"
            >
              <option value="">Select Frequency</option>
              {predefinedFrequencies.map((frequency, index) => (
                <option key={index} value={frequency}>
                  {frequency}
                </option>
              ))}
            </select>

            {newDrug.frequency === "Custom" && (
              <input
                type="text"
                name="customFrequency"
                value={newDrug.customFrequency || ""}
                onChange={handleDrugInputChange}
                placeholder="Enter custom frequency"
                className="mt-2 px-4 py-2 border rounded-lg w-full"
              />
            )}
          </div>

          {/* Duration Input */}
          <div className="w-full">
            <label className="block text-lg font-medium">Duration (Days)</label>
            <input
              type="number"
              name="duration"
              value={newDrug.duration || ""}
              onChange={handleDrugInputChange}
              className="mt-2 px-4 py-2 border rounded-lg w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={addDrugToPrescription}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Drug
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Drugs in Prescription</h3>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Dosage</th>
              <th className="border border-gray-300 px-4 py-2">Frequency</th>
              <th className="border border-gray-300 px-4 py-2">Duration (Days)</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map((drug) => (
              <tr key={drug.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{drug.name}</td>
                <td className="border border-gray-300 px-4 py-2">{drug.dosage}</td>
                <td className="border border-gray-300 px-4 py-2">{drug.frequency}</td>
                <td className="border border-gray-300 px-4 py-2">{drug.duration}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => removeDrug(drug.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Submit Prescription
        </button>
      </div>
    </>
  )}
</div>

  );
};

export default AddPrescription;