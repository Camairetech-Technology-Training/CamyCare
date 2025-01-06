import React, { useEffect, useState } from 'react';
import PrescriptionList from './PatientPrescriptions';
import { fetchPatients } from '../../../services/patientService'
import { Patient } from '../../../models/patient'

export interface Prescription {
  id: number;
  patientId: number; // link to Patient
  drugs: string[];
  status: string;
  creationDate: string;
  phoneNumber: string;
}

const samplePrescriptions: Prescription[] = [
  { id: 1, patientId: 1, drugs: ['Paracetamol', 'Amoxicillin'], status: 'Completed', creationDate: '2024-12-15', phoneNumber: '123-456-7890' },
  { id: 2, patientId: 2, drugs: ['Ibuprofen'], status: 'Pending', creationDate: '2024-12-14', phoneNumber: '234-567-8901' },
];

const ViewPatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [prescriptions] = useState<Prescription[]>(samplePrescriptions);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');

  // Fetch patients from API on component mount
  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients();
        console.log(data)
        setPatients(data);
      } catch (error) {
        console.error('Failed to load patients');
      }
    };
    getPatients();
  }, []);

  // Filter patients based on the search input
  const filteredPatients = patients.filter(
    (patient) =>
      patient.fullName.toLowerCase().includes(search.toLowerCase()) ||
      patient.phoneNumber.includes(search)
  );

  const togglePrescriptions = (patientId: number) => {
    setSelectedPatientId((prevId) => (prevId === patientId ? null : patientId));
  };

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddPatient = () => {
    if (newPatientName && newPatientPhone) {
      const newPatient: Patient = {
        id: patients.length + 1, // Auto increment id for new patient
        fullName: newPatientName,
        phoneNumber: newPatientPhone,
        // registrationDate: new Date(),
      };
      setPatients([...patients, newPatient]);
      setIsModalOpen(false);
      setNewPatientName('');
      setNewPatientPhone('');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 shadow-default">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">View Patients</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add New Patient
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or phone number"
        className="mb-4 px-4 py-2 border rounded-md w-1/3"
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
            <input
              type="text"
              placeholder="Enter name"
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Enter phone number"
              value={newPatientPhone}
              onChange={(e) => setNewPatientPhone(e.target.value)}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="min-w-[220px] py-4 px-4">Patient Name</th>
              <th className="min-w-[150px] py-4 px-4">Phone Number</th>
              {/* <th className="min-w-[150px] py-4 px-4">Registration Date</th> */}
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((patient) => (
              <React.Fragment key={patient.id}>
                <tr>
                  <td className="border-b py-5 px-4">{patient.fullName}</td>
                  <td className="border-b py-5 px-4">{patient.phoneNumber}</td>
                  {/* <td className="border-b py-5 px-4">{new Date(patient.registrationDate).toLocaleDateString()}</td> */}
                  <td className="border-b py-5 px-4">
                    <button
                      onClick={() => togglePrescriptions(patient.id)}
                      className={`px-4 py-2 rounded-md ${
                        selectedPatientId === patient.id
                          ? 'bg-red-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {selectedPatientId === patient.id ? 'Hide Prescriptions' : 'View Prescriptions'}
                    </button>
                  </td>
                </tr>
                {selectedPatientId === patient.id && (
                  <tr>
                    <td colSpan={4} className="border-b py-5 px-4">
                      <PrescriptionList prescriptions={prescriptions} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 mb-4">
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded-md"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredPatients.length / patientsPerPage)}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded-md"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredPatients.length / patientsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewPatients;
