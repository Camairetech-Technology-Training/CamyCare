import React from 'react';
import { statuses } from '../../../data/statusData';

interface PrescriptionFiltersProps {
  searchQuery: string;
  statusFilter: string;
  phoneNumberFilter: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PrescriptionFilters: React.FC<PrescriptionFiltersProps> = ({
  statusFilter,
  phoneNumberFilter,
  onStatusChange,
  onPhoneNumberChange,
}) => {
  return (
    <div className="mb-4 flex space-x-4">
      <input
        type="text"
        placeholder="Filter by phone number"
        value={phoneNumberFilter}
        onChange={onPhoneNumberChange}
        className="py-2 px-4 border rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={statusFilter}
        onChange={onStatusChange}
        className="py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Status</option>
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PrescriptionFilters;
