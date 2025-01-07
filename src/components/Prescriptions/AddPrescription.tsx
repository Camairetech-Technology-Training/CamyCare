import React, { useState, useEffect } from 'react';
import { savePrescription } from '../../services/prescriptionService';
import { predefinedDosages } from "../../data/predifinedData";
import { fetchPatients, addPatient } from "../../services/patientService";

import { Prescription } from "../../models/pescription";
import { Patient } from "../../models/patient";

import { drugList } from "../../data/drugData";
import { doseIntervals } from '../../data/doseIntervals';
import { dosesPerDay } from '../../data/dosesPerDay';

const AddPrescription = () => {

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

  const [availablePlages, setAvailablePlages] = useState<string[][]>([]);
  const [, setSelectedPlages] = useState<string[]>([]);

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

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const frequency = parseInt(e.target.value, 10);
    let plagesOptions: string[][] = [];
  
    if (frequency === 1) {
      plagesOptions = [['MORNING'], ['MID_DAY'], ['NIGHT']];
    } else if (frequency === 2) {
      plagesOptions = [
        ['MORNING', 'MID_DAY'],
        ['MORNING', 'NIGHT'],
        ['MID_DAY', 'NIGHT'],
      ];
    } else if (frequency === 3) {
      plagesOptions = [['MORNING', 'MID_DAY', 'NIGHT']];
    }
  
    setAvailablePlages(plagesOptions);
    setSelectedPlages([]); // Reset selected plages
    setPrescription((prevData) => ({
      ...prevData,
      frequency,
      plages: [], // Reset plages
    }));
  };

  const handlePlageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlages = e.target.value.split(','); // Split the comma-separated value to an array
    setSelectedPlages(selectedPlages); // Store the selected plages as an array
    setPrescription((prevData) => ({
      ...prevData,
      plages: selectedPlages, // Store selected plages in prescription object
    }));
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (e.target instanceof HTMLSelectElement) {
      setPrescription((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
      }));
    } else {
      setPrescription((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePrescriptionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPrescription((prevState) => ({
      ...prevState,
      [name]: name === "frequency" || name === "typeFrequency" || name === "duration" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(prescription)
    try {
      const response = await savePrescription(prescription);
      console.log('Prescription created:', response);
      alert('Prescription added successfully!');
      // Reset form
      setPrescription({
        drug: '',
        dosage: '',
        frequency: 0,
        typeFrequency: 1,
        duration: 1,
        plages: [],
        patientId: '0c5223f6-cb97-4e8e-ab7f-9521aa527e95',
      });
      setSelectedPlages([]);
      setAvailablePlages([]);
    } catch (error) {
      console.error('Error creating prescription:', error);
      alert('Error adding prescription. Please try again.');
    }
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


  return (
    <div className="p-4">
      {/* Phone Number Input */}
      <div className="mb-6 relative max-w-md mx-auto">
        <label className="block text-lg font-medium text-gray-700">Patient Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter phone number (e.g., 6XXXXXX)"
        />
        {filteredPatients.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-w-sm mx-auto shadow-md">
            {filteredPatients.map((patient) => (
              <li
                key={patient.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
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
                  className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleRegisterNewPatient}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
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
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
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
  
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Drug</label>
                <select
                  name="drug"
                  value={prescription.drug || ""}
                  onChange={handlePrescriptionInputChange}
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Drug</option>
                  {drugList.map((drug) => (
                    <option key={drug.id} value={drug.name}>
                      {drug.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Dosage</label>
                <select
                  name="dosage"
                  value={prescription.dosage || ""}
                  onChange={handlePrescriptionInputChange}
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Dosage</option>
                  {predefinedDosages.map((dosage, index) => (
                    <option key={index} value={dosage}>
                      {dosage}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Interval Between Doses (Days):</label>
                <select
                  name="typeFrequency"
                  value={prescription.typeFrequency}
                  onChange={handleChange}
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {doseIntervals.map((interval) => (
                    <option key={interval.value} value={interval.value}>
                      {interval.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Duration (in days):</label>
                <input
                  type="number"
                  name="duration"
                  value={prescription.duration}
                  onChange={handlePrescriptionInputChange}
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Number of Doses per Day:</label>
                <select
                  name="frequency"
                  value={prescription.frequency || ""}
                  onChange={handleFrequencyChange}
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {dosesPerDay.map((dose) => (
                    <option key={dose.value} value={dose.value}>
                      {dose.label}
                    </option>
                  ))}
                </select>
              </div>

              {prescription.frequency > 0 && availablePlages.length > 0 && (
                <div className="mb-4">
                  <label className="block text-lg font-medium text-gray-700">Plages:</label>
                  <select
                    onChange={handlePlageSelect}
                    value={prescription.plages?.join(',') || ''} // Join the array into a string for display
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Plages</option>
                    {availablePlages.map((plage, index) => {
                      // Map the array of plages to human-readable values
                      const humanReadablePlages = plage.map((p) => {
                        switch (p) {
                          case 'MORNING':
                            return 'Morning';
                          case 'MID_DAY':
                            return 'Mid Day';
                          case 'NIGHT':
                            return 'Night';
                          default:
                            return p;
                        }
                      });

                      return (
                        <option key={index} value={plage.join(',')}>
                          {humanReadablePlages.join(' and ')}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              <div className="mt-4 flex justify-end col-span-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                  Save Prescription
                </button>
              </div>
            </form>
          </div>

        </>
      )}
    </div>
  );
};

export default AddPrescription;
