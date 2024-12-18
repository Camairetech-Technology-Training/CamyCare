import React, { useState } from 'react';
import { prescriptionsData } from '../../../data/prescriptionsData';
import { filterPrescriptions } from '../../../utils/filters';
import { usePagination } from '../../../hooks/usePagination';
import PrescriptionTable from '../../../components/Prescriptions/PrescriptionTable/PrescriptionTable';
import PaginationControls from '../../../components/Prescriptions/PaginationControls/PaginationControls';
import AddPrescription from '../../../components/Prescriptions/AddPrescription';
import PrescriptionFilters from '../../../components/Prescriptions/Filters/PrescriptionFilters';

import { addPrescription } from '../../../services/prescriptionService';
import { Prescription } from '../../../types/prescription';

const ViewPrescriptions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [phoneNumberFilter, setPhoneNumberFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentPage, paginate, indexOfLastItem, indexOfFirstItem } = usePagination(5);

  const filteredPrescriptions = filterPrescriptions(
    prescriptionsData,
    searchQuery,
    statusFilter,
    phoneNumberFilter
  );

  const currentPrescriptions = filteredPrescriptions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPrescriptions.length / 5);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberFilter(e.target.value);
  };

  const handleAddPrescription = (newPrescription: Prescription) => {
    addPrescription(newPrescription);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto rounded-lg border bg-white p-6 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Manage Prescriptions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white py-2 px-5 rounded-md mt-4 hover:bg-blue-700 transition duration-200"
        >
          Add Prescription
        </button>
      </div>

      <PrescriptionFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        phoneNumberFilter={phoneNumberFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onPhoneNumberChange={handlePhoneNumberChange}
      />

      <PrescriptionTable prescriptions={currentPrescriptions} />

      <PaginationControls
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
      />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="container bg-white rounded-lg p-6 xl:w-[50%] max-h-[80vh] overflow-y-auto mt-30 mb-10 p-5"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold text-gray-800">Add Prescription</h2>
            </div>

            {/* AddPrescription Component */}
            <AddPrescription addPrescription={handleAddPrescription} closeModal={() => setIsModalOpen(false)} />

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md mr-2"
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
