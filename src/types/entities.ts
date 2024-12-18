// entities.ts

export interface Pharmacy {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
  }
  
  export interface PharmacyDrug {
    id: number;
    name: string;
    description: string;
    pharmacyId: number;
  }
  
  export interface StaffMember {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    pharmacyId: number;
  }
  
  export interface Patient {
    id: number;
    name: string;
    phoneNumber: string;
    registrationDate: Date;
  }
  
  export interface Prescription {
    id: number;
    patientName: string;
    drugs: string[];
    status: string;
    creationDate: string;
    phoneNumber: string;
  }  
  
  export interface PrescribedDrug {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    duration: number;
    prescriptionId: number;
    pharmacyDrugId: number;
  }
  
  export interface Reminder {
    id: number;
    patientId: number;
    drugName: string;
    reminderTime: Date;
    message: string;
    sentStatus: string;
  }
  