import React from 'react';
import {
  Server, DollarSign, Globe, Shield, CheckCircle, AlertTriangle, XCircle,
  TrendingUp, Cloud, Layers, Activity,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { awsServices, awsRegions, securityItems, costChartData, costDistributionData } from '../data/awsServices';

const Dashboard: React.FC = () => {
  const activeServices = awsServices.filter((s) => s.status === 'active').length;
  const totalMonthlyCost = awsServices.reduce((acc, s) => acc + s.monthlyBaseCost, 0);
  const totalAnnualCost = totalMonthlyCost * 12;
  const primaryRegion = awsRegions[0];
  const criticalIssues = securityItems.filter((s) => s.status === 'critical').length;
  const warningIssues = securityItems.filter((s) => s.status === 'warning').length;
  const okIssues = securityItems.filter((s) => s.status === 'ok').length;

  const securityScore = Math.round((okIssues / securityItems.length) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Servicios Activos"
          value={activeServices}
          subtitle={`de ${awsServices.length} totales`}
          change="+2 este mes"
          changeType="positive"
          icon={<Server size={20} />}
          accentColor="#2563EB"
        />
        <StatCard
          title="Costo Mensual"
          value={`$${totalMonthlyCost.toFixed(0)}`}
          subtitle="USD estimado"
          change="+8.2%"
          changeType="negative"
          icon={<DollarSign size={20} />}
          accentColor="#F59E0B"
        />
        <StatCard
          title="Costo Anual"
          value={`$${(totalAnnualCost / 1000).toFixed(1)}K`}
          subtitle="USD proyectado"
          icon={<TrendingUp size={20} />}
          accentColor="#16A34A"
        />
        <StatCard
          title="Regiones Activas"
          value={awsRegions.filter((r) => r.status === 'operational').length}
          subtitle={`de ${awsRegions.length} configuradas`}
          icon={<Globe size={20} />}
          accentColor="#7C3AED"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cost Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-slate-800">Tendencia de Costos</h2>
              <p className="text-xs text-slate-400 mt-0.5">Últimos 7 meses — USD</p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">Mensual</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={costChartData}>
              <defs>
                <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }}
                formatter={(v) => [`$${v ?? 0}`, 'Costo']}
              />
              <Area type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2.5} fill="url(#costGradient)" dot={{ fill: '#2563EB', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Distribution Pie */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-slate-800">Distribución de Costos</h2>
            <p className="text-xs text-slate-400 mt-0.5">Por servicio — USD/mes</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={costDistributionData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {costDistributionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }}
                formatter={(v) => [`$${v ?? 0}`, 'Costo']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {costDistributionData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-500">{d.name}</span>
                </div>
                <span className="font-semibold text-slate-700">${d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Status */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-green-600" />
            <h2 className="font-semibold text-slate-800">Estado de Seguridad</h2>
          </div>

          {/* Score ring */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={securityScore >= 70 ? '#16A34A' : securityScore >= 40 ? '#F59E0B' : '#DC2626'}
                  strokeWidth="10"
                  strokeDasharray={`${securityScore * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">{securityScore}%</span>
                <span className="text-xs text-slate-400">Score</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle size={14} /><span className="text-xs font-medium">Correctos</span>
              </div>
              <span className="text-sm font-bold text-green-700">{okIssues}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-xl">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle size={14} /><span className="text-xs font-medium">Revisión</span>
              </div>
              <span className="text-sm font-bold text-amber-700">{warningIssues}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-red-50 rounded-xl">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle size={14} /><span className="text-xs font-medium">Críticos</span>
              </div>
              <span className="text-sm font-bold text-red-600">{criticalIssues}</span>
            </div>
          </div>
        </div>

        {/* Region Status */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-blue-600" />
            <h2 className="font-semibold text-slate-800">Estado de Regiones</h2>
          </div>
          <div className="space-y-2.5">
            {awsRegions.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{r.flag}</span>
                  <div>
                    <p className="text-xs font-medium text-slate-700 leading-tight">{r.name.replace('Asia Pacific', 'AP').replace('Europe', 'EU').replace('South America', 'SA')}</p>
                    <p className="text-xs text-slate-400">{r.latency} ms</p>
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Status */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Layers size={18} className="text-purple-600" />
            <h2 className="font-semibold text-slate-800">Arquitectura Cloud</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Región Primaria', value: primaryRegion.name, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Zonas de Disponibilidad', value: `${primaryRegion.availabilityZones} AZs`, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Instancias EC2', value: '4 Running', color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Buckets S3', value: '8 Activos', color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Bases de datos RDS', value: '2 Instancias', color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`flex items-center justify-between ${bg} rounded-xl p-2.5`}>
                <span className="text-xs text-slate-500">{label}</span>
                <span className={`text-xs font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <Activity size={13} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Estado General</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '82%' }} />
              </div>
              <span className="text-xs font-bold text-green-600">82%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services summary table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Cloud size={18} className="text-blue-600" />
          <h2 className="font-semibold text-slate-800">Resumen de Recursos Cloud</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Servicio', 'Categoría', 'Estado', 'Costo mensual'].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {awsServices.slice(0, 7).map((svc) => (
                <tr key={svc.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-medium text-slate-700">{svc.name}</td>
                  <td className="py-3 px-3 text-slate-500">{svc.category}</td>
                  <td className="py-3 px-3"><StatusBadge status={svc.status} /></td>
                  <td className="py-3 px-3 font-semibold text-slate-700">
                    {svc.monthlyBaseCost > 0 ? `$${svc.monthlyBaseCost.toFixed(2)}` : <span className="text-green-600">Gratuito</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
