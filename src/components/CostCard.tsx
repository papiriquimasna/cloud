import React from 'react';
import { DollarSign, Trash2 } from 'lucide-react';
import type { CostItem } from '../types/cloud';

interface CostCardProps {
  item: CostItem;
  onRemove?: (id: string) => void;
}

const CostCard: React.FC<CostCardProps> = ({ item, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-50">
            <DollarSign size={18} className="text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">{item.serviceName}</h3>
            <p className="text-xs text-slate-400">
              {item.quantity} unid. × {item.estimatedHours}h
            </p>
          </div>
        </div>
        {onRemove && (
          <button
            onClick={() => onRemove(item.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <p className="text-xs text-slate-400 mb-1">Estimado</p>
          <p className="text-sm font-bold text-slate-700">${item.estimatedCost.toFixed(2)}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <p className="text-xs text-amber-500 mb-1">Mensual</p>
          <p className="text-sm font-bold text-amber-700">${item.monthlyCost.toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-xs text-blue-500 mb-1">Anual</p>
          <p className="text-sm font-bold text-blue-700">${item.annualCost.toFixed(0)}</p>
        </div>
      </div>
    </div>
  );
};

export default CostCard;
