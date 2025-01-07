export interface Prescription {
    id?: string;
    reminders?: any;
    patient?: any;
    status?: string;
    drug: string;
    dosage: string;
    frequency: number;
    typeFrequency: number;
    duration: number;
    plages: string[];
    patientId: string;
  }
  