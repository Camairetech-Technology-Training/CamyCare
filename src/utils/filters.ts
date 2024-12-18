import { Prescription } from "../types/prescription";

export const filterPrescriptions = (
  prescriptions: Prescription[],
  searchQuery: string,
  statusFilter: string,
  phoneNumberFilter: string
): Prescription[] => {
  return prescriptions.filter((prescription) => {
    const matchesSearch = prescription.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter
      ? prescription.status.toLowerCase() === statusFilter.toLowerCase()
      : true;

    const matchesPhoneNumber = phoneNumberFilter
      ? prescription.phoneNumber.includes(phoneNumberFilter)
      : true;

    return matchesSearch && matchesStatus && matchesPhoneNumber;
  });
};
