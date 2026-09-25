import React, { useState } from 'react';
import { Globe, Layers, Wifi, AlertTriangle, CheckCircle, XCircle, MapPin } from 'lucide-react';
import { awsRegions } from '../data/awsServices';
import RegionCard from '../components/RegionCard';
import type { CloudRegion } from '../types/cloud';

const Infrastructure: React.FC = () => {
  const [selected, setSelected] = useState<CloudRegion>(awsRegions[0]);
  const [filter, setFilter] = useState<'all' | 'operational' | 'degraded' | 'outage'>('all');

  const filtered = filter === 'all' ? awsRegions : awsRegions.filter((r) => r.status === filter);

  const stats = {
    operational: awsRegions.filter((r) => r.status === 'operational').length,
    degraded: awsRegions.filter((r) => r.status === 'degraded').length,
    outage: awsRegions.filter((r) => r.status === 'outage').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Regiones', value: awsRegions.length, icon: <Globe size={18} />, color: '#2563EB', bg: 'bg-blue-50' },
          { label: 'Operacionales', value: stats.operational, icon: <CheckCircle size={18} />, color: '#16A34A', bg: 'bg-green-50' },
          { label: 'Degradadas', value: stats.degraded, icon: <AlertTriangle size={18} />, color: '#F59E0B', bg: 'bg-amber-50' },
          { label: 'Sin Servicio', value: stats.outage, icon: <XCircle size={18} />, color: '#DC2626', bg: 'bg-red-50' },
        ].map(({ label, value, icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className={`inline-flex p-2 rounded-xl mb-3 ${bg}`} style={{ color }}>{icon}</div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'operational', 'degraded', 'outage'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'operational' ? 'Operacionales' : f === 'degraded' ? 'Degradadas' : 'Sin Servicio'}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-400 self-center">{filtered.length} región(es)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regions Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <RegionCard
              key={r.id}
              region={r}
              isSelected={selected.id === r.id}
              onSelect={(id) => setSelected(awsRegions.find((reg) => reg.id === id)!)}
            />
          ))}
        </div>

        {/* Region Detail */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-blue-600" />
              <h2 className="font-semibold text-slate-800">Detalle de Región</h2>
            </div>

            <div className="text-center mb-5">
              <span className="text-5xl">{selected.flag}</span>
              <h3 className="font-bold text-slate-800 mt-2">{selected.name}</h3>
              <p className="text-sm text-slate-400">{selected.code}</p>
            </div>

            <div className="space-y-3">
              {[
                { label: 'País', value: selected.country },
                { label: 'Ubicación', value: selected.location },
                { label: 'Zonas de Disponibilidad', value: `${selected.availabilityZones} AZs` },
                { label: 'Latencia promedio', value: `${selected.latency} ms` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-xs text-slate-400">{label}</span>
                  <span className="text-xs font-semibold text-slate-700">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Servicios desplegados</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.deployedServices.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* World map placeholder with info */}
          <div className="bg-slate-900 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={16} className="text-blue-400" />
              <h3 className="font-semibold text-sm">Cobertura Global AWS</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              {['Norteamérica', 'Europa', 'Asia-Pacífico', 'Sudamérica'].map((zone) => (
                <div key={zone} className="bg-slate-800 rounded-xl p-3">
                  <p className="text-xs text-slate-400">{zone}</p>
                  <Wifi size={16} className="text-green-400 mx-auto mt-1" />
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed">
              AWS opera en <span className="text-blue-400 font-semibold">33 regiones</span> y{' '}
              <span className="text-blue-400 font-semibold">105 zonas</span> de disponibilidad globales.
            </p>
          </div>

          {/* Latency table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Wifi size={16} className="text-blue-600" />
              <h3 className="font-semibold text-slate-800 text-sm">Latencia por Región</h3>
            </div>
            <div className="space-y-2">
              {[...awsRegions].sort((a, b) => a.latency - b.latency).map((r) => (
                <div key={r.id} className="flex items-center gap-2">
                  <span className="text-sm w-6">{r.flag}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.min((r.latency / 250) * 100, 100)}%`,
                        backgroundColor: r.latency < 50 ? '#16A34A' : r.latency < 100 ? '#F59E0B' : '#DC2626',
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 w-14 text-right">{r.latency} ms</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AWS Global infrastructure note */}
      <div className="bg-blue-600 rounded-2xl p-5 text-white">
        <div className="flex items-start gap-4">
          <Layers size={24} className="flex-shrink-0 mt-0.5 text-blue-200" />
          <div>
            <h3 className="font-semibold mb-1">¿Qué es una Región de AWS?</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Una <strong>Región de AWS</strong> es un área geográfica que contiene múltiples{' '}
              <strong>Zonas de Disponibilidad (AZs)</strong> — centros de datos físicamente separados con
              energía, red y conectividad redundantes. Cada AZ está conectada a las demás dentro de la región
              mediante redes de baja latencia, permitiendo diseñar aplicaciones altamente disponibles y
              tolerantes a fallos. AWS recomienda usar al menos 2 AZs para aplicaciones de producción.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
