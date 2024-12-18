import React, { useState } from "react";

export interface Prescription {
  id: number;
  patientId: number;
  drugs: string[];
  status: string;
  creationDate: string;
  phoneNumber: string;
}

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter prescriptions based on search term
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    // Convert creationDate to a Date object for comparison
    const creationDate = new Date(prescription.creationDate).toLocaleDateString();
    
    return (
      prescription.drugs.some((drug) =>
        drug.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      prescription.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creationDate.includes(searchTerm) // Include the creationDate in the search
    );
  });

  // Paginate prescriptions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPrescriptions.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full mx-auto bg-gray-200 dark:bg-gray-700 rounded-md shadow-md 0 p-4">
      <h3 className="text-lg font-bold mb-2">Prescriptions</h3>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          placeholder="Search prescriptions by date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="w-full mx-auto bg-gray-50 rounded-md shadow-md dark:bg-gray-800 p-4">
        <table className="w-full table-auto rounded-md">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="py-4 px-6 font-medium">Drugs</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium">Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((prescription) => (
              <tr key={prescription.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-4 px-6 border-b dark:border-gray-600">
                  <ul>
                    {prescription.drugs.map((drug, index) => (
                      <li key={index}>{drug}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-6 border-b dark:border-gray-600">
                  <p>{prescription.status}</p>
                </td>
                <td className="py-4 px-6 border-b dark:border-gray-600">
                  <p>{prescription.creationDate}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md dark:bg-gray-700 dark:text-white disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(filteredPrescriptions.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 dark:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredPrescriptions.length / itemsPerPage)}
          className="px-4 py-2 bg-gray-300 rounded-md dark:bg-gray-700 dark:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PrescriptionList;