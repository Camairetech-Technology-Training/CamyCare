// src/components/PrescriptionTable/PrescriptionTable.tsx
import React from 'react';
import { Prescription } from '../../../types/prescription';

type PrescriptionTableProps = {
  prescriptions: Prescription[];
};

const PrescriptionTable: React.FC<PrescriptionTableProps> = ({ prescriptions }) => {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-lg">
              Prescription ID
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Patient Name
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Drugs
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Status
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white text-lg">
              Creation Date
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white text-lg">
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td className="border-b py-5 px-4 text-lg">{prescription.id}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.patientName}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.drugs.join(', ')}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.status}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.creationDate}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionTable;