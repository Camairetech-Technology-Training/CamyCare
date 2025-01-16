import React, { useState } from 'react';
import { Prescription } from '../../../models/pescription';
import { statuses } from '../../../data/statusData';

interface Reminder {
  order: number;
  dueAt: string;
  prescriptionId: string;
  plage: string;
}

type PrescriptionTableProps = {
  prescriptions: Prescription[];
};

const PrescriptionTable: React.FC<PrescriptionTableProps> = ({ prescriptions }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getHumanReadableStatus = (status: string) => {
    const matchingStatus = statuses.find((s) => s.value === status);
    return matchingStatus ? matchingStatus.label : status;
  };

  const getHumanReadablePlages = (plages: string[]) => {
    return plages.map((plage) => {
      switch (plage) {
        case 'MORNING':
          return 'Morning';
        case 'MID_DAY':
          return 'Mid Day';
        case 'NIGHT':
          return 'Night';
        default:
          return plage;
      }
    }).join(' , ');
  };

  const cancelPrescription = (prescriptionId: string) => {
    alert(`Prescription with ID: ${prescriptionId} canceled`);
    // Add logic here to handle cancellation in the backend or state
  };

  const toggleReminder = (prescriptionId: string) => {
    if (expandedRow === prescriptionId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(prescriptionId);
    }
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-lg">
              Patient Name
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Patient Phone
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Drug
            </th>
            {/* <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Dosage
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Number of Doses per Day:
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-lg">
              Interval Between Doses (Days):
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white text-lg">
              Duration (Days)
            </th>*/}
            <th className="py-4 px-4 font-medium text-black dark:text-white text-lg">
              Plages
            </th> 
            <th className="py-4 px-4 font-medium text-black dark:text-white text-lg">
              Status
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white text-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <React.Fragment key={prescription.id}>
              <tr>
                {/* Display patient's name and phone */}
                <td className="border-b py-5 px-4 text-lg">{prescription.patient.fullName}</td>
                <td className="border-b py-5 px-4 text-lg">{prescription.patient.phoneNumber}</td>

                {/* Display the rest of the prescription details */}
                <td className="border-b py-5 px-4 text-lg">{prescription.drug}</td>
                {/* <td className="border-b py-5 px-4 text-lg">{prescription.dosage}</td>
                <td className="border-b py-5 px-4 text-lg">{prescription.frequency}</td>
                <td className="border-b py-5 px-4 text-lg">{prescription.typeFrequency}</td>
                <td className="border-b py-5 px-4 text-lg">{prescription.duration}</td> */}
                {/* Map plages to human-readable format */}
                <td className="border-b py-5 px-4 text-lg">
                  {getHumanReadablePlages(prescription.plages)}
                </td>
                <td className="border-b py-5 px-4 text-lg">
                  <span
                    className={`inline-block py-1 px-3 rounded-full text-white font-bold ${
                      prescription.status === 'COMPLETED'
                        ? 'bg-green-300' 
                        : prescription.status === 'IN_PROGRESS' ? 'bg-orange-300' : 'bg-red-300'
                    }`}
                  >
                    {getHumanReadableStatus(prescription.status as string)}
                  </span>
                </td>
                <td className="border-b py-5 px-4 text-lg flex space-x-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => toggleReminder(prescription.id as string)}
                  >
                    {expandedRow === prescription.id ? 'Hide' : 'View'}
                  </button>
                  <button
                    className="text-red-500 hover:bg-red-100 px-2 py-1 rounded"
                    onClick={() => cancelPrescription(prescription.id as string)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>

              {/* Conditionally render the reminders table for expanded rows */}
              {expandedRow === prescription.id && prescription.reminders.length > 0 && (
                <tr>
                  <td colSpan={10}>
                    <table className="w-full table-auto mt-4">
                      <thead>
                        <tr className="bg-gray-100 text-left">
                          <th className="py-1 px-2 text-sm font-medium text-black">Order</th>
                          <th className="py-1 px-2 text-sm font-medium text-black">Due At</th>
                          <th className="py-1 px-2 text-sm font-medium text-black">Plage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prescription.reminders.map((reminder: Reminder) => (
                          <tr key={reminder.order}>
                            <td className="border-b py-1 px-2 text-sm">{reminder.order}</td>
                            <td className="border-b py-1 px-2 text-sm">{new Date(reminder.dueAt).toLocaleString()}</td>
                            <td className="border-b py-1 px-2 text-sm">{reminder.plage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionTable;