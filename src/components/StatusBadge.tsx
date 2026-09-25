import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Clock, Wifi, WifiOff } from 'lucide-react';

type Status = 'ok' | 'warning' | 'critical' | 'active' | 'inactive' | 'pending' | 'operational' | 'degraded' | 'outage';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

const config: Record<Status, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  ok:          { label: 'Correcto',     bg: 'bg-green-100',  text: 'text-green-700',  icon: <CheckCircle size={12} /> },
  active:      { label: 'Activo',       bg: 'bg-green-100',  text: 'text-green-700',  icon: <CheckCircle size={12} /> },
  operational: { label: 'Operacional',  bg: 'bg-green-100',  text: 'text-green-700',  icon: <Wifi size={12} /> },
  warning:     { label: 'Revisión',     bg: 'bg-amber-100',  text: 'text-amber-700',  icon: <AlertTriangle size={12} /> },
  degraded:    { label: 'Degradado',    bg: 'bg-amber-100',  text: 'text-amber-700',  icon: <AlertTriangle size={12} /> },
  pending:     { label: 'Pendiente',    bg: 'bg-amber-100',  text: 'text-amber-700',  icon: <Clock size={12} /> },
  critical:    { label: 'Crítico',      bg: 'bg-red-100',    text: 'text-red-700',    icon: <XCircle size={12} /> },
  outage:      { label: 'Sin servicio', bg: 'bg-red-100',    text: 'text-red-700',    icon: <WifiOff size={12} /> },
  inactive:    { label: 'Inactivo',     bg: 'bg-slate-100',  text: 'text-slate-500',  icon: <XCircle size={12} /> },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm', showIcon = true }) => {
  const { label, bg, text, icon } = config[status] ?? config.inactive;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${bg} ${text} ${padding}`}>
      {showIcon && icon}
      {label}
    </span>
  );
};

export default StatusBadge;
