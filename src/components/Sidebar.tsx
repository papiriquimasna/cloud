import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Cloud, DollarSign, Globe, Shield, Network, Server,
  ChevronLeft, ChevronRight, Zap,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard',      label: 'Dashboard',           icon: <LayoutDashboard size={18} /> },
  { path: '/planning',       label: 'Planificación Cloud',  icon: <Cloud size={18} /> },
  { path: '/costs',          label: 'Costos',               icon: <DollarSign size={18} /> },
  { path: '/infrastructure', label: 'Infraestructura',      icon: <Globe size={18} /> },
  { path: '/security',       label: 'Seguridad',            icon: <Shield size={18} /> },
  { path: '/network',        label: 'Arquitectura de Red',  icon: <Network size={18} /> },
  { path: '/services',       label: 'Servicios AWS',        icon: <Server size={18} /> },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col bg-slate-900 text-white transition-all duration-300 flex-shrink-0 relative ${
        collapsed ? 'w-16' : 'w-60'
      }`}
      style={{ minHeight: '100vh' }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-700 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold leading-tight">CloudOps</p>
            <p className="text-xs text-slate-400">Dashboard</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <span className="flex-shrink-0">{icon}</span>
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Version badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-700">
          <div className="bg-slate-800 rounded-xl p-3">
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="text-blue-400 font-semibold">CloudOps v1.0</span>
              <br />AWS Cloud Foundations
            </p>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors z-10"
        title={collapsed ? 'Expandir' : 'Colapsar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
};

export default Sidebar;
