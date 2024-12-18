export interface PrescribedDrug {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    duration: number;
    prescriptionId: number;
    pharmacyDrugId: number;
  }