import React, { useState } from 'react';
import { Globe, Layers, Wifi, AlertTriangle, CheckCircle, XCircle, MapPin, Server } from 'lucide-react';
import { awsRegions } from '../data/awsServices';
import StatusBadge from '../components/StatusBadge';
import type { CloudRegion } from '../types/cloud';

// Coordenadas aproximadas para el mapa (SVG viewBox: 0-1000 x 0-600)
const regionCoordinates: Record<string, { x: number; y: number }> = {
  'us-east-1': { x: 250, y: 240 },
  'us-west-2': { x: 150, y: 220 },
  'eu-west-1': { x: 500, y: 180 },
  'ap-southeast-1': { x: 780, y: 340 },
  'sa-east-1': { x: 350, y: 450 },
  'ap-northeast-1': { x: 850, y: 220 },
  'eu-central-1': { x: 540, y: 170 },
  'ap-south-1': { x: 700, y: 300 },
};

const Infrastructure: React.FC = () => {
  const [selected, setSelected] = useState<CloudRegion>(awsRegions[0]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'operational' | 'degraded' | 'outage'>('all');

  const filtered = filter === 'all' ? awsRegions : awsRegions.filter((r) => r.status === filter);

  const stats = {
    operational: awsRegions.filter((r) => r.status === 'operational').length,
    degraded: awsRegions.filter((r) => r.status === 'degraded').length,
    outage: awsRegions.filter((r) => r.status === 'outage').length,
  };

  const getStatusColor = (status: CloudRegion['status']) => {
    if (status === 'operational') return '#16A34A';
    if (status === 'degraded') return '#F59E0B';
    return '#DC2626';
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

      {/* Interactive World Map */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={20} className="text-blue-400" />
          <h2 className="font-bold text-white text-lg">Mapa Global de Infraestructura AWS</h2>
        </div>

        <div className="bg-slate-950/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50">
          <svg viewBox="0 0 1000 600" className="w-full h-auto" style={{ minHeight: '400px' }}>
            {/* Background gradient */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1E293B" stopOpacity="0.9" />
              </linearGradient>
              
              {/* Glow effect for active regions */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Pulse animation */}
              <radialGradient id="pulseGradient">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Map background */}
            <rect width="1000" height="600" fill="url(#mapGradient)" />

            {/* Grid lines for aesthetic */}
            {[...Array(10)].map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 60}
                x2="1000"
                y2={i * 60}
                stroke="#1E293B"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 50}
                y1="0"
                x2={i * 50}
                y2="600"
                stroke="#1E293B"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}

            {/* Simplified continents outlines */}
            {/* North America */}
            <path
              d="M 100 150 Q 150 100 200 120 L 280 140 Q 320 180 300 240 L 250 280 Q 180 300 150 260 L 100 220 Z"
              fill="#334155"
              opacity="0.3"
              stroke="#475569"
              strokeWidth="1"
            />
            
            {/* South America */}
            <path
              d="M 280 340 Q 320 320 340 360 L 360 440 Q 350 480 320 490 L 290 470 Q 270 420 280 380 Z"
              fill="#334155"
              opacity="0.3"
              stroke="#475569"
              strokeWidth="1"
            />

            {/* Europe */}
            <path
              d="M 480 140 Q 520 120 560 140 L 580 180 Q 570 200 540 200 L 500 190 Q 480 170 480 140 Z"
              fill="#334155"
              opacity="0.3"
              stroke="#475569"
              strokeWidth="1"
            />

            {/* Asia */}
            <path
              d="M 600 160 Q 680 140 760 180 L 880 200 Q 920 240 900 280 L 860 320 Q 800 340 740 320 L 680 280 Q 620 240 600 200 Z"
              fill="#334155"
              opacity="0.3"
              stroke="#475569"
              strokeWidth="1"
            />

            {/* Connection lines between regions (subtle) */}
            {awsRegions.map((region, idx) => {
              const coord = regionCoordinates[region.id];
              if (!coord || idx === 0) return null;
              const prevCoord = regionCoordinates[awsRegions[idx - 1].id];
              if (!prevCoord) return null;
              return (
                <line
                  key={`line-${region.id}`}
                  x1={prevCoord.x}
                  y1={prevCoord.y}
                  x2={coord.x}
                  y2={coord.y}
                  stroke="#3B82F6"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>
              );
            })}

            {/* Region markers */}
            {filtered.map((region) => {
              const coord = regionCoordinates[region.id];
              if (!coord) return null;
              const isSelected = selected.id === region.id;
              const isHovered = hoveredRegion === region.id;
              const statusColor = getStatusColor(region.status);

              return (
                <g
                  key={region.id}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelected(region)}
                  style={{ cursor: 'pointer' }}
                  className="transition-all"
                >
                  {/* Pulse effect for selected */}
                  {isSelected && (
                    <circle cx={coord.x} cy={coord.y} r="30" fill="url(#pulseGradient)">
                      <animate
                        attributeName="r"
                        from="20"
                        to="40"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Main marker circle */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={isSelected ? 16 : isHovered ? 14 : 12}
                    fill={statusColor}
                    filter={isSelected || isHovered ? 'url(#glow)' : undefined}
                    opacity={isSelected ? 1 : 0.9}
                    className="transition-all"
                  />
                  
                  {/* Inner circle */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={isSelected ? 8 : 6}
                    fill="white"
                    opacity="0.9"
                  />

                  {/* Region label */}
                  <text
                    x={coord.x}
                    y={coord.y - 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    opacity={isHovered || isSelected ? 1 : 0.7}
                    className="transition-all"
                  >
                    {region.flag} {region.code}
                  </text>

                  {/* Hover tooltip */}
                  {isHovered && !isSelected && (
                    <g>
                      <rect
                        x={coord.x - 60}
                        y={coord.y + 20}
                        width="120"
                        height="35"
                        rx="8"
                        fill="#1E293B"
                        opacity="0.95"
                      />
                      <text
                        x={coord.x}
                        y={coord.y + 35}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {region.name.split(' (')[0]}
                      </text>
                      <text
                        x={coord.x}
                        y={coord.y + 48}
                        textAnchor="middle"
                        fill="#94A3B8"
                        fontSize="9"
                      >
                        {region.deployedServices.length} servicios
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-slate-300">Operacional</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-xs text-slate-300">Degradado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-slate-300">Sin servicio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-xs text-slate-300">Región seleccionada</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-xs text-blue-200 mt-4 text-center">
          💡 Haz click en cualquier punto del mapa para ver los detalles de la región
        </p>
      </div>

      {/* Selected Region Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-6xl">{selected.flag}</span>
              <div>
                <h3 className="font-bold text-slate-800 text-xl">{selected.name}</h3>
                <p className="text-sm text-slate-400 mt-0.5">{selected.code}</p>
              </div>
            </div>
            <StatusBadge status={selected.status} size="md" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <MapPin size={14} />
                <span className="text-xs font-semibold uppercase tracking-wide">Ubicación</span>
              </div>
              <p className="text-sm font-semibold text-slate-700">{selected.location}</p>
              <p className="text-xs text-slate-500 mt-0.5">{selected.country}</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Wifi size={14} />
                <span className="text-xs font-semibold uppercase tracking-wide">Latencia</span>
              </div>
              <p className="text-2xl font-bold text-slate-700">{selected.latency} <span className="text-sm font-normal text-slate-400">ms</span></p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Layers size={14} />
                <span className="text-xs font-semibold uppercase tracking-wide">Availability Zones</span>
              </div>
              <p className="text-2xl font-bold text-slate-700">{selected.availabilityZones} <span className="text-sm font-normal text-slate-400">AZs</span></p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Server size={14} />
                <span className="text-xs font-semibold uppercase tracking-wide">Servicios</span>
              </div>
              <p className="text-2xl font-bold text-slate-700">{selected.deployedServices.length}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Servicios desplegados</p>
            <div className="flex flex-wrap gap-2">
              {selected.deployedServices.map((svc) => (
                <span
                  key={svc}
                  className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium rounded-xl"
                >
                  {svc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Latency comparison */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Wifi size={16} className="text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-sm">Comparativa de Latencia</h3>
          </div>
          <div className="space-y-3">
            {[...awsRegions].sort((a, b) => a.latency - b.latency).map((r) => (
              <div
                key={r.id}
                onClick={() => setSelected(r)}
                className={`cursor-pointer transition-all ${
                  selected.id === r.id ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{r.flag}</span>
                  <span className="text-xs text-slate-500 flex-1 truncate">{r.name.split(' (')[0]}</span>
                  <span className="text-xs font-bold text-slate-600">{r.latency} ms</span>
                </div>
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min((r.latency / 250) * 100, 100)}%`,
                      backgroundColor: r.latency < 50 ? '#16A34A' : r.latency < 100 ? '#F59E0B' : '#DC2626',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AWS Info */}
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
