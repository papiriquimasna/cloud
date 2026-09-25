// ─── AWS Service ───────────────────────────────────────────────────────────────
export type ServiceStatus = 'active' | 'inactive' | 'pending';
export type ServiceCategory =
  | 'Cómputo'
  | 'Almacenamiento'
  | 'Base de Datos'
  | 'Red y Entrega de Contenido'
  | 'Seguridad e Identidad'
  | 'Monitoreo';

export interface AWSService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  mainFunction: string;
  status: ServiceStatus;
  icon: string;
  monthlyBaseCost: number; // USD
}

// ─── Cloud Region ──────────────────────────────────────────────────────────────
export type RegionStatus = 'operational' | 'degraded' | 'outage';

export interface CloudRegion {
  id: string;
  code: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  deployedServices: string[];
  status: RegionStatus;
  latency: number; // ms
  availabilityZones: number;
}

// ─── Cloud Planning ────────────────────────────────────────────────────────────
export type AppType =
  | 'Web Application'
  | 'Mobile Backend'
  | 'Microservices'
  | 'Data Analytics'
  | 'Machine Learning'
  | 'E-Commerce'
  | 'API REST';

export type AvailabilityLevel = 'Básico (99.9%)' | 'Alto (99.95%)' | 'Crítico (99.99%)';

export type MigrationObjective =
  | 'Reducción de costos'
  | 'Escalabilidad'
  | 'Alta disponibilidad'
  | 'Modernización'
  | 'Recuperación ante desastres';

export interface CloudPlan {
  id: string;
  solutionName: string;
  appType: AppType;
  description: string;
  region: string;
  estimatedUsers: number;
  availabilityLevel: AvailabilityLevel;
  selectedServices: string[];
  migrationObjective: MigrationObjective;
  createdAt: string;
}

// ─── Cost Estimation ──────────────────────────────────────────────────────────
export interface CostItem {
  id: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  estimatedHours: number;
  unitCost: number;
  estimatedCost: number;
  monthlyCost: number;
  annualCost: number;
}

// ─── Security ─────────────────────────────────────────────────────────────────
export type SecurityStatus = 'ok' | 'warning' | 'critical';

export interface SecurityItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: SecurityStatus;
  details: string[];
}

export interface IAMUser {
  id: string;
  name: string;
  role: string;
  mfaEnabled: boolean;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface IAMPolicy {
  id: string;
  name: string;
  type: 'AWS Managed' | 'Customer Managed';
  description: string;
  attachedTo: number;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface DashboardStat {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}
