import React, { useState } from 'react';
import AddPrescription from '../../../components/Prescriptions/AddPrescription';
// import { Prescription } from '../../../types/entities';

const ViewPrescriptions : React.FC = () => {
  // Sample static data for prescriptions
  const [prescriptions, setPrescriptions] = useState([
      {
        id: 1,
        patientName: 'John Doe',
        drugs: ['Paracetamol', 'Amoxicillin'],
        status: 'Completed',
        creationDate: '2024-12-15',
        phoneNumber: '123-456-7890', // Add phone number
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        drugs: ['Ibuprofen'],
        status: 'Pending',
        creationDate: '2024-12-14',
        phoneNumber: '234-567-8901',
      },
      {
        id: 3,
        patientName: 'Michael Johnson',
        drugs: ['Aspirin', 'Cough Syrup'],
        status: 'In Progress',
        creationDate: '2024-12-10',
        phoneNumber: '345-678-9012',
      },
      {
        id: 4,
        patientName: 'Alice Walker',
        drugs: ['Paracetamol', 'Ibuprofen'],
        status: 'Completed',
        creationDate: '2024-12-05',
        phoneNumber: '456-789-0123',
      },
      {
        id: 5,
        patientName: 'Bob Brown',
        drugs: ['Penicillin', 'Cough Syrup'],
        status: 'Pending',
        creationDate: '2024-11-30',
        phoneNumber: '567-890-1234',
      },
      {
        id: 6,
        patientName: 'Charlie Davis',
        drugs: ['Aspirin'],
        status: 'Completed',
        creationDate: '2024-11-25',
        phoneNumber: '678-901-2345',
      },   
  ]);

  // States for pagination, search, and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumberFilter, setPhoneNumberFilter] = useState('');

  const addNewPrescription = (newPrescription: { id: number; patientName: string; drugs: string[]; status: string; creationDate: string; phoneNumber: string }) => {
    setPrescriptions((prevPrescriptions) => [
      ...prevPrescriptions,
      { ...newPrescription, id: prevPrescriptions.length + 1 },
    ]);
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearchQuery =
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.id.toString().includes(searchQuery);
    const matchesPhoneNumberFilter =
      !phoneNumberFilter || prescription.phoneNumber.includes(phoneNumberFilter);
    const matchesStatusFilter =
      !statusFilter || prescription.status === statusFilter;
    return matchesSearchQuery && matchesPhoneNumberFilter && matchesStatusFilter;
  });
  

  // Pagination logic
  const indexOfLastPrescription = currentPage * itemsPerPage;
  const indexOfFirstPrescription = indexOfLastPrescription - itemsPerPage;
  const currentPrescriptions = filteredPrescriptions.slice(indexOfFirstPrescription, indexOfLastPrescription);

  // Handle page change
  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

  // Toggle modal state
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">View Prescriptions</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Prescription
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by Patient or Prescription ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md w-1/2"
        />
        <input
          type="text"
          placeholder="Search by Phone Number"
          value={phoneNumberFilter}
          onChange={(e) => setPhoneNumberFilter(e.target.value)}
          className="px-4 py-2 border rounded-md w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      {/* Prescription Table */}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Prescription ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Patient Name
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Drugs
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Creation Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Phone Number
              </th> {/* New Phone Number Column */}
            </tr>
          </thead>
          <tbody>
            {currentPrescriptions.map((prescription, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{prescription.id}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{prescription.patientName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{prescription.drugs.join(', ')}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      prescription.status === 'Completed'
                        ? 'bg-success text-success'
                        : prescription.status === 'Pending'
                        ? 'bg-warning text-warning'
                        : 'bg-danger text-danger'
                    }`}
                  >
                    {prescription.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{prescription.creationDate}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{prescription.phoneNumber}</p> {/* Display Phone Number */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 mb-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <div className="text-center">
          Page {currentPage} of {Math.ceil(filteredPrescriptions.length / itemsPerPage)}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredPrescriptions.length / itemsPerPage)}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {/* Modal for Adding Prescription */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-[80%] max-w-[1200px] h-[60vh] sm:h-[40vh] overflow-y-auto mx-auto">
            <div className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold text-gray-800">Add Prescription</h2>
            </div>


            {/* AddPrescription Component */}
            <AddPrescription addPrescription={addNewPrescription} closeModal={() => closeModal} />

            <div className="mt-4 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewPrescriptions;
