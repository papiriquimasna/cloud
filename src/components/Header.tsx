import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard':      { title: 'Dashboard', subtitle: '' },
  '/planning':       { title: 'Planificación Cloud', subtitle: 'Registra y gestiona propuestas de solución Cloud' },
  '/costs':          { title: 'Costos y Economía Cloud', subtitle: 'Estima y visualiza el costo de tu infraestructura' },
  '/infrastructure': { title: 'Infraestructura Global', subtitle: 'Regiones y disponibilidad de servicios AWS' },
  '/security':       { title: 'Seguridad', subtitle: 'Modelo de responsabilidad compartida e IAM' },
  '/network':        { title: 'Arquitectura de Red', subtitle: 'Visualización de VPC y componentes de red' },
  '/services':       { title: 'Servicios AWS', subtitle: 'Catálogo completo de servicios en la nube' },
};

const Header: React.FC = () => {
  const location = useLocation();
  const info = routeTitles[location.pathname] ?? routeTitles['/dashboard'];

  return (
    <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-slate-800 leading-tight">{info.title}</h1>
        <p className="text-sm text-slate-400 mt-0.5">{info.subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
          <Search size={15} className="text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent text-sm text-slate-600 outline-none w-40 placeholder-slate-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 leading-tight">Admin</p>
            <p className="text-xs text-slate-400">CloudOps</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
