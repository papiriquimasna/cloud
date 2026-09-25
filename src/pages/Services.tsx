import React, { useState } from 'react';
import { Server, Search, Filter } from 'lucide-react';
import { awsServices } from '../data/awsServices';
import ServiceCard from '../components/ServiceCard';
import type { ServiceCategory, ServiceStatus } from '../types/cloud';

const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | 'all'>('all');

  const categories: (ServiceCategory | 'all')[] = ['all', 'Cómputo', 'Almacenamiento', 'Base de Datos', 'Red y Entrega de Contenido', 'Seguridad e Identidad', 'Monitoreo'];
  const statuses: (ServiceStatus | 'all')[] = ['all', 'active', 'inactive', 'pending'];

  const filtered = awsServices.filter((svc) => {
    const matchesSearch = svc.name.toLowerCase().includes(searchTerm.toLowerCase()) || svc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || svc.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || svc.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: awsServices.length,
    active: awsServices.filter((s) => s.status === 'active').length,
    inactive: awsServices.filter((s) => s.status === 'inactive').length,
    pending: awsServices.filter((s) => s.status === 'pending').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Servicios', value: stats.total, color: '#2563EB', bg: 'bg-blue-50' },
          { label: 'Activos', value: stats.active, color: '#16A34A', bg: 'bg-green-50' },
          { label: 'Inactivos', value: stats.inactive, color: '#64748B', bg: 'bg-slate-50' },
          { label: 'Pendientes', value: stats.pending, color: '#F59E0B', bg: 'bg-amber-50' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className={`inline-flex p-2 rounded-xl mb-3 ${bg}`}>
              <Server size={18} style={{ color }} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-slate-500" />
          <h3 className="font-semibold text-slate-800">Filtros</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Buscar servicio</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre o descripción..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Categoría</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat === 'all' ? 'Todas las categorías' : cat}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st === 'all' ? 'Todos los estados' : st === 'active' ? 'Activos' : st === 'inactive' ? 'Inactivos' : 'Pendientes'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">{filtered.length} servicio(s) encontrado(s)</span>
          {(searchTerm || categoryFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setStatusFilter('all'); }}
              className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Services Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
          <Server size={40} className="text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No se encontraron servicios</p>
          <p className="text-slate-300 text-xs mt-1">Intenta ajustar los filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((svc) => <ServiceCard key={svc.id} service={svc} />)}
        </div>
      )}

      {/* AWS Info */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm flex-shrink-0">
            <Server size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Catálogo de Servicios AWS</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Amazon Web Services ofrece más de <strong>200 servicios</strong> de computación en la nube agrupados en categorías
              como cómputo, almacenamiento, bases de datos, machine learning, IoT, seguridad y más. Cada servicio está diseñado
              para resolver problemas específicos y se factura según el modelo <strong>pay-as-you-go</strong> (paga solo por lo que usas).
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { label: 'Cómputo', examples: 'EC2, Lambda, ECS' },
                { label: 'Almacenamiento', examples: 'S3, EBS, Glacier' },
                { label: 'Base de Datos', examples: 'RDS, DynamoDB, Aurora' },
                { label: 'Red', examples: 'VPC, Route 53, CloudFront' },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <p className="font-semibold text-white mb-1">{item.label}</p>
                  <p className="text-slate-400">{item.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
