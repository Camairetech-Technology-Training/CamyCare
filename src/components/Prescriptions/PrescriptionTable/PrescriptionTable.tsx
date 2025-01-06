// src/components/PrescriptionTable/PrescriptionTable.tsx
import React from 'react';
import { Prescription } from '../../../models/pescription';

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
              Patient ID
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Drug
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Dosage
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Frequency
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Type of Frequency
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white text-lg">
              Duration (Days)
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white text-lg">
              Plages
            </th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription, index) => (
            <tr key={index}>
              <td className="border-b py-5 px-4 text-lg">{prescription.patientId}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.drug}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.dosage}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.frequency}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.typeFrequency}</td>
              <td className="border-b py-5 px-4 text-lg">{prescription.duration}</td>
              <td className="border-b py-5 px-4 text-lg">
                {prescription.plages.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionTable;
