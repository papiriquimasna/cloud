import React from 'react';
import {
  Server, HardDrive, Database, Shield, Network, Globe, Zap, Code, Activity, Cpu,
} from 'lucide-react';
import type { AWSService } from '../types/cloud';
import StatusBadge from './StatusBadge';

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server size={22} />,
  HardDrive: <HardDrive size={22} />,
  Database: <Database size={22} />,
  Shield: <Shield size={22} />,
  Network: <Network size={22} />,
  Globe: <Globe size={22} />,
  Zap: <Zap size={22} />,
  Code: <Code size={22} />,
  Activity: <Activity size={22} />,
  Cpu: <Cpu size={22} />,
};

const categoryColors: Record<string, string> = {
  'Cómputo': '#2563EB',
  'Almacenamiento': '#16A34A',
  'Base de Datos': '#7C3AED',
  'Red y Entrega de Contenido': '#0891B2',
  'Seguridad e Identidad': '#DC2626',
  'Monitoreo': '#D97706',
};

interface ServiceCardProps {
  service: AWSService;
  compact?: boolean;
  onSelect?: (id: string) => void;
  selected?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, compact = false, onSelect, selected }) => {
  const color = categoryColors[service.category] ?? '#64748B';
  const icon = iconMap[service.icon] ?? <Server size={22} />;

  return (
    <div
      onClick={() => onSelect?.(service.id)}
      className={`bg-white rounded-2xl border transition-all hover:shadow-md ${
        selected
          ? 'border-blue-500 shadow-md ring-2 ring-blue-100'
          : 'border-slate-100 shadow-sm'
      } ${onSelect ? 'cursor-pointer' : ''} ${compact ? 'p-4' : 'p-5'}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="p-2.5 rounded-xl flex-shrink-0"
          style={{ backgroundColor: `${color}18`, color }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-800 text-sm">{service.name}</h3>
            <StatusBadge status={service.status} />
          </div>
          <span
            className="text-xs font-medium mt-0.5 inline-block"
            style={{ color }}
          >
            {service.category}
          </span>
        </div>
      </div>

      {!compact && (
        <>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{service.description}</p>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Función principal</p>
            <p className="text-xs text-slate-600 leading-relaxed">{service.mainFunction}</p>
          </div>
          {service.monthlyBaseCost > 0 && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">Costo base mensual</span>
              <span className="text-sm font-bold" style={{ color }}>
                ${service.monthlyBaseCost.toFixed(2)}/mes
              </span>
            </div>
          )}
          {service.monthlyBaseCost === 0 && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">Costo base mensual</span>
              <span className="text-sm font-bold text-green-600">Gratuito</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ServiceCard;
