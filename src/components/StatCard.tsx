import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  accentColor?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  icon,
  accentColor = '#2563EB',
  className = '',
}) => {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-500',
    neutral: 'text-slate-500',
  };
  const ChangeIcon = changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : Minus;

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ backgroundColor: `${accentColor}18` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        {change && (
          <span className={`flex items-center gap-1 text-xs font-medium ${changeColors[changeType]}`}>
            <ChangeIcon size={12} />
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
      <p className="text-sm font-medium text-slate-500 mt-0.5">{title}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
