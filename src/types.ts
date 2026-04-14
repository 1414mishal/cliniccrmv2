export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  condition: string;
  phone: string;
}

export interface Template {
  id: string;
  name: string;
  content: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  time: string;
  type: 'CONCIERGE' | 'STANDARD' | 'URGENT';
  description: string;
}

export interface ActivityItem {
  id: string;
  type: 'LAB' | 'REFERRAL' | 'SCRIPT' | 'ALERT';
  title: string;
  description: string;
  time: string;
  critical?: boolean;
}

export interface Stats {
  revenue: number;
  revenueGrowth: number;
  activePatients: number;
  occupancy: number;
  avgWait: number;
  satisfaction: number;
  activeSuites: string;
}
