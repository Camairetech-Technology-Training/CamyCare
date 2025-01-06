import React, { useState, useEffect } from "react";
import { Prescription } from "../../models/pescription";
import { Patient } from "../../models/patient";
import { drugList } from "../../data/drugData";
import { predefinedDosages } from "../../data/predifinedData";
import { fetchPatients, addPatient } from "../../services/patientService";
import { savePrescription } from '../../services/prescriptionService';

interface AddPrescriptionProps {
  closeModal: () => void;
}

const AddPrescription: React.FC<AddPrescriptionProps> = ({ closeModal }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [isAddNewPatient, setIsAddNewPatient] = useState(false);
  const [isRegisterNewButton, setIsRegisterNewButton] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [prescription, setPrescription] = useState<Prescription>({
    patientId: "",
    drug: "",
    dosage: "",
    frequency: 0,
    typeFrequency: 0, // Added typeFrequency to handle frequency type
    duration: 0,
    plages: [], // This is now an array of selected plages
  });

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        console.error('Failed to load patients');
      }
    };
    getPatients();
  }, []);

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

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setPhoneNumber(patient.phoneNumber);
    setPrescription((prevState) => ({
      ...prevState,
      patientId: patient.id.toString(),
    }));
    setFilteredPatients([]);
  };

  const handlePrescriptionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPrescription((prevState) => ({
      ...prevState,
      [name]: name === "frequency" || name === "typeFrequency" || name === "duration" ? parseInt(value) : value,
    }));
  };

  const handleAddPrescription = async () => {
    if (!selectedPatient) {
      alert("Please select or register a patient before adding prescriptions.");
      return;
    }

    const finalDosage = prescription.dosage === "Custom" ? prescription.dosage : prescription.dosage;
    const newPrescription: Prescription = {
      ...prescription,
      dosage: finalDosage,
    };

    console.log(newPrescription)

    try {
      await savePrescription(newPrescription);
    } catch (error) {
      console.error('Error saving prescription:', error);
    }
    closeModal();
  };

  const handleRegisterNewPatient = async () => {
    if (newPatientName.trim() && phoneNumber.trim()) {
      const phoneRegex = /^\d{9}$/;
      if (!phoneRegex.test(phoneNumber)) {
        alert('Please enter a valid 9-digit phone number without spaces.');
        return;
      }

      try {
        const formattedPhone = `+237 ${phoneNumber}`;

        const response = await addPatient(newPatientName, formattedPhone);

        const newPatient: Patient = {
          id: response.id,
          fullName: newPatientName,
          phoneNumber: formattedPhone,
        };

        setPatients((prevPatients) => [newPatient, ...prevPatients]);
        setSelectedPatient(newPatient);
        setNewPatientName('');
        setIsNewPatient(false);
        setIsAddNewPatient(false);
      } catch (error) {
        console.error('Failed to add new patient', error);
      }
    }
  };

  // Function to dynamically set available plages based on frequency
  const getPlagesOptions = (frequency: number) => {
    switch (frequency) {
      case 1:
        return ["MATIN", "MIDI", "SOIR"];
      case 2:
        return ["MATIN, MIDI", "MATIN, SOIR", "MIDI, SOIR"];
      case 3:
        return ["MATIN, MIDI, SOIR"];
      default:
        return [];
    }
  };

  // Handle multiple plages selection
  const handlePlagesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlages = Array.from(e.target.selectedOptions, (option) => option.value);
    setPrescription((prevState) => ({
      ...prevState,
      plages: selectedPlages,
    }));
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
                {patient.fullName} ({patient.phoneNumber})
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
                <span className="font-bold text-gray-900">Name:</span> {selectedPatient.fullName}
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
                  name="drug"
                  value={prescription.drug || ""}
                  onChange={handlePrescriptionInputChange}
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
                  value={prescription.dosage || ""}
                  onChange={handlePrescriptionInputChange}
                  className="mt-2 px-4 py-2 border rounded-lg w-full"
                >
                  <option value="">Select Dosage</option>
                  {predefinedDosages.map((dosage, index) => (
                    <option key={index} value={dosage}>
                      {dosage}
                    </option>
                  ))}
                </select>
              </div>

              {/* Frequency & Type Frequency */}
              <div className="w-full">
                <label className="block text-lg font-medium">Frequency</label>
                <select
                  name="frequency"
                  value={prescription.frequency || 0}
                  onChange={handlePrescriptionInputChange}
                  className="mt-2 px-4 py-2 border rounded-lg w-full"
                >
                  <option value={0}>Select Frequency</option>
                  <option value={1}>Once a day</option>
                  <option value={2}>Twice a day</option>
                  <option value={3}>Thrice a day</option>
                </select>
              </div>

              {/* Type Frequency Dropdown */}
              <div className="w-full">
                <label className="block text-lg font-medium">Type Frequency</label>
                <select
                  name="typeFrequency"
                  value={prescription.typeFrequency || 0}
                  onChange={handlePrescriptionInputChange}
                  className="mt-2 px-4 py-2 border rounded-lg w-full"
                >
                  <option value={0}>Select Frequency Type</option>
                  <option value={1}>Every day</option>
                  <option value={2}>Every 2 days</option>
                  <option value={3}>Every 3 days</option>
                </select>
              </div>

              {/* Duration */}
              <div className="w-full">
                <label className="block text-lg font-medium">Duration (in days)</label>
                <input
                  type="number"
                  name="duration"
                  value={prescription.duration || 0}
                  onChange={handlePrescriptionInputChange}
                  className="mt-2 px-4 py-2 border rounded-lg w-full"
                />
              </div>
            </div>

            {/* Plages Selection */}
            <div className="w-full">
              <label className="block text-lg font-medium">Plages</label>
              <select
                multiple
                value={prescription.plages}
                onChange={handlePlagesChange}
                className="mt-2 px-4 py-2 border rounded-lg w-full h-40"
              >
                {getPlagesOptions(prescription.frequency).map((plage, index) => (
                  <option key={index} value={plage}>
                    {plage}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddPrescription}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg"
              >
                Add Prescription
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddPrescription;
