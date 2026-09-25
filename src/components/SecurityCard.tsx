import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { SecurityItem } from '../types/cloud';
import StatusBadge from './StatusBadge';

interface SecurityCardProps {
  item: SecurityItem;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const borderColor =
    item.status === 'ok' ? 'border-l-green-500' :
    item.status === 'warning' ? 'border-l-amber-400' :
    'border-l-red-500';

  return (
    <div className={`bg-white rounded-2xl border border-slate-100 border-l-4 ${borderColor} shadow-sm p-5 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            {item.category}
          </span>
          <h3 className="font-semibold text-slate-800 mt-0.5">{item.title}</h3>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.description}</p>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={item.status} size="md" />
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Ocultar detalles' : 'Ver detalles'}
      </button>

      {expanded && (
        <ul className="mt-3 space-y-1.5">
          {item.details.map((d, i) => (
            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
              <span className="mt-0.5 text-slate-300">•</span>
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SecurityCard;
