import React, { useState } from 'react';
import { Plus, DollarSign, TrendingUp, Calculator, CheckSquare, FileText } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import type { CostItem } from '../types/cloud';
import { awsServices, costChartData, costDistributionData } from '../data/awsServices';
import { usePlanning } from '../context/PlanningContext';
import CostCard from '../components/CostCard';

const Costs: React.FC = () => {
  const { plans } = usePlanning();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [items, setItems] = useState<CostItem[]>([]);
  const [serviceId, setServiceId] = useState(awsServices[0].id);
  const [quantity, setQuantity] = useState(1);
  const [hours, setHours] = useState(720);
  const [formError, setFormError] = useState('');

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const selectedSvc = awsServices.find((s) => s.id === serviceId)!;

  const unitCost = selectedSvc.monthlyBaseCost > 0 ? selectedSvc.monthlyBaseCost / 720 : 0.05;
  const estimatedCost = +(unitCost * quantity * hours).toFixed(2);
  const monthlyCost = +(unitCost * quantity * 720).toFixed(2);
  const annualCost = +(monthlyCost * 12).toFixed(2);

  const handleAdd = () => {
    if (!selectedPlanId) { setFormError('Primero selecciona una propuesta.'); return; }
    if (quantity <= 0 || hours <= 0) { setFormError('Cantidad y horas deben ser mayores a 0.'); return; }
    setFormError('');
    const newItem: CostItem = {
      id: Date.now().toString(),
      serviceId,
      serviceName: selectedSvc.name,
      quantity,
      estimatedHours: hours,
      unitCost: +unitCost.toFixed(4),
      estimatedCost,
      monthlyCost,
      annualCost,
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const handleRemove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const totalMonthly = items.reduce((a, i) => a + i.monthlyCost, 0);
  const totalAnnual = items.reduce((a, i) => a + i.annualCost, 0);

  // Dynamic pie from added items
  const dynamicPieData = items.length > 0
    ? items.map((it, idx) => ({
        name: it.serviceName.replace('Amazon ', '').replace('AWS ', ''),
        value: it.monthlyCost,
        color: costDistributionData[idx % costDistributionData.length]?.color ?? '#2563EB',
      }))
    : costDistributionData;

  return (
    <div className="p-6 space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Costo Estimado (simulación)', value: `$${estimatedCost}`, icon: <Calculator size={18} />, color: '#F59E0B' },
          { title: 'Costo Mensual Total', value: `$${totalMonthly.toFixed(2)}`, icon: <DollarSign size={18} />, color: '#2563EB' },
          { title: 'Costo Anual Proyectado', value: `$${(totalAnnual / 1000).toFixed(2)}K`, icon: <TrendingUp size={18} />, color: '#16A34A' },
          { title: 'Servicios en estimación', value: items.length, icon: <Plus size={18} />, color: '#7C3AED' },
        ].map(({ title, value, icon, color }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}18`, color }}>{icon}</div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{title}</p>
          </div>
        ))}
      </div>

      {/* NO PLANS WARNING */}
      {plans.length === 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <FileText size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">No hay propuestas disponibles</h3>
              <p className="text-sm text-amber-700">
                Necesitas crear al menos una propuesta en la sección <strong>Planificación Cloud</strong> antes de estimar costos.
              </p>
            </div>
          </div>
        </div>
      )}

      {plans.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* ── SELECT PLAN + Calculator ── */}
          <div className="xl:col-span-2 space-y-4">
            {/* Select Plan */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 rounded-xl"><FileText size={18} className="text-blue-600" /></div>
                <div>
                  <h2 className="font-semibold text-slate-800">Selecciona una Propuesta</h2>
                  <p className="text-xs text-slate-400">Elige la propuesta para estimar costos</p>
                </div>
              </div>

              <div className="space-y-2">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPlanId === plan.id
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-800 text-sm">{plan.solutionName}</h3>
                      {selectedPlanId === plan.id && (
                        <CheckSquare size={16} className="text-blue-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{plan.appType}</p>
                    <p className="text-xs text-slate-400 mt-1">{plan.selectedServices.length} servicios • {plan.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculator (only if plan selected) */}
            {selectedPlanId && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-2 bg-amber-50 rounded-xl"><Calculator size={18} className="text-amber-600" /></div>
                  <div>
                    <h2 className="font-semibold text-slate-800">Calculadora de Costos</h2>
                    <p className="text-xs text-slate-400">Estimación simulada</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Servicio</label>
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                    >
                      {awsServices.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Cantidad</label>
                      <input
                        type="number" min={1} value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Horas estimadas</label>
                      <input
                        type="number" min={1} max={8760} value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Vista previa del costo</p>
                    {[
                      { label: 'Costo unitario/hora', value: `$${unitCost.toFixed(4)}` },
                      { label: 'Costo estimado', value: `$${estimatedCost}` },
                      { label: 'Costo mensual (720 h)', value: `$${monthlyCost}`, highlight: true },
                      { label: 'Costo anual', value: `$${annualCost}`, highlight: true },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} className={`flex justify-between text-sm ${highlight ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
                        <span>{label}</span>
                        <span className={highlight ? 'text-blue-600' : ''}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {formError && <p className="text-xs text-red-500">{formError}</p>}

                  <button
                    onClick={handleAdd}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Agregar a la estimación
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Items list ── */}
          <div className="xl:col-span-3 space-y-4">
            {selectedPlanId && selectedPlan && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                <h3 className="font-bold text-blue-900 mb-1">Propuesta seleccionada:</h3>
                <p className="text-sm text-blue-700">{selectedPlan.solutionName}</p>
                <p className="text-xs text-blue-600 mt-0.5">{selectedPlan.appType} • {selectedPlan.selectedServices.length} servicios</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Servicios en Estimación</h2>
              {items.length > 0 && (
                <div className="flex gap-3 text-xs font-semibold">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full">Mensual: ${totalMonthly.toFixed(2)}</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">Anual: ${totalAnnual.toFixed(0)}</span>
                </div>
              )}
            </div>

            {!selectedPlanId ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-10 text-center">
                <FileText size={36} className="text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Selecciona una propuesta para comenzar</p>
              </div>
            ) : items.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-10 text-center">
                <DollarSign size={36} className="text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Agrega servicios para ver tu estimación</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => <CostCard key={item.id} item={item} onRemove={handleRemove} />)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart - monthly trend */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 mb-1">Tendencia de Costos Histórica</h2>
          <p className="text-xs text-slate-400 mb-4">Últimos 7 meses — USD</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={costChartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }}
                formatter={(v) => [`$${v ?? 0}`, 'Costo total']}
              />
              <Bar dataKey="total" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart - distribution */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 mb-1">Distribución por Servicio</h2>
          <p className="text-xs text-slate-400 mb-4">{items.length > 0 ? 'Basado en tu estimación' : 'Datos de referencia'}</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={dynamicPieData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value">
                {dynamicPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }}
                formatter={(v) => [`$${v ?? 0}`, 'Costo']}
              />
              <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Costs;
