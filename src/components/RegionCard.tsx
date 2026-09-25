import React from 'react';
import { MapPin, Wifi, Layers } from 'lucide-react';
import type { CloudRegion } from '../types/cloud';
import StatusBadge from './StatusBadge';

interface RegionCardProps {
  region: CloudRegion;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const RegionCard: React.FC<RegionCardProps> = ({ region, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect?.(region.id)}
      className={`bg-white rounded-2xl border transition-all hover:shadow-md ${
        isSelected
          ? 'border-blue-500 shadow-md ring-2 ring-blue-100'
          : 'border-slate-100 shadow-sm'
      } ${onSelect ? 'cursor-pointer' : ''} p-5`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{region.flag}</span>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm leading-tight">{region.name}</h3>
            <p className="text-xs text-slate-400">{region.code}</p>
          </div>
        </div>
        <StatusBadge status={region.status} />
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
        <MapPin size={12} />
        <span>{region.location}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-50 rounded-xl p-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <Wifi size={11} />
            <span className="text-xs">Latencia</span>
          </div>
          <p className="text-sm font-bold text-slate-700">{region.latency} ms</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <Layers size={11} />
            <span className="text-xs">AZs</span>
          </div>
          <p className="text-sm font-bold text-slate-700">{region.availabilityZones}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 mb-1.5">Servicios desplegados</p>
        <div className="flex flex-wrap gap-1">
          {region.deployedServices.map((svc) => (
            <span
              key={svc}
              className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
            >
              {svc}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionCard;
