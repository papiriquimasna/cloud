import React, { useState } from 'react';
import { Shield, Users, Lock, Key, CheckCircle, AlertTriangle, XCircle, FileCheck } from 'lucide-react';
import { securityItems, iamUsers, iamPolicies } from '../data/awsServices';
import SecurityCard from '../components/SecurityCard';
import StatusBadge from '../components/StatusBadge';

const Security: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'iam' | 'compliance'>('overview');

  const stats = {
    ok: securityItems.filter((s) => s.status === 'ok').length,
    warning: securityItems.filter((s) => s.status === 'warning').length,
    critical: securityItems.filter((s) => s.status === 'critical').length,
  };

  const securityScore = Math.round((stats.ok / securityItems.length) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Security Score Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Shield size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Postura de Seguridad Cloud</h2>
              <p className="text-blue-100 text-sm mt-1">Basado en el Modelo de Responsabilidad Compartida de AWS</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{securityScore}%</div>
              <div className="text-xs text-blue-200 mt-1">Score General</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={14} />
                <span>{stats.ok} Correctos</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle size={14} />
                <span>{stats.warning} Revisión</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <XCircle size={14} />
                <span>{stats.critical} Críticos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Responsabilidad Compartida', icon: <Shield size={14} /> },
          { id: 'iam', label: 'IAM y Control de Acceso', icon: <Users size={14} /> },
          { id: 'compliance', label: 'Cumplimiento', icon: <FileCheck size={14} /> },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* TAB: Overview - Shared Responsibility */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Shared Responsibility Model Diagram */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-semibold text-slate-800 mb-1">Modelo de Responsabilidad Compartida</h2>
            <p className="text-sm text-slate-500 mb-6">AWS gestiona la seguridad <strong>DE</strong> la nube; el cliente gestiona la seguridad <strong>EN</strong> la nube.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* AWS Responsibility */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-blue-600 rounded-xl">
                    <Shield size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900">Responsabilidad de AWS</h3>
                    <p className="text-xs text-blue-600">Seguridad DE la nube</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-blue-800">
                  {[
                    'Infraestructura física global',
                    'Hardware de cómputo y almacenamiento',
                    'Infraestructura de red',
                    'Virtualización del hipervisor',
                    'Seguridad de instalaciones',
                    'Servicios administrados (RDS, Lambda, S3)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customer Responsibility */}
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-green-600 rounded-xl">
                    <Lock size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900">Responsabilidad del Cliente</h3>
                    <p className="text-xs text-green-600">Seguridad EN la nube</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-green-800">
                  {[
                    'Datos del cliente (cifrado, backups)',
                    'Gestión de identidades y accesos (IAM)',
                    'Configuración de aplicaciones',
                    'Sistema operativo y parches',
                    'Firewall y grupos de seguridad',
                    'Configuración de red (VPC, subredes)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Security Items Grid */}
          <div>
            <h2 className="font-semibold text-slate-800 mb-4">Estado de Seguridad por Categoría</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {securityItems.map((item) => <SecurityCard key={item.id} item={item} />)}
            </div>
          </div>
        </div>
      )}

      {/* TAB: IAM */}
      {activeTab === 'iam' && (
        <div className="space-y-6">
          {/* IAM Overview */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Key size={18} className="text-blue-600" />
              <h2 className="font-semibold text-slate-800">AWS Identity and Access Management (IAM)</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              <strong>IAM</strong> permite controlar de forma segura quién tiene acceso a los recursos de AWS y qué pueden hacer con ellos.
              Puedes crear usuarios, grupos, roles y políticas para definir permisos granulares basados en el principio de <strong>mínimo privilegio</strong>.
              IAM también soporta autenticación multifactor (MFA) para proteger las cuentas más críticas.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Usuarios IAM', value: iamUsers.length, icon: <Users size={16} />, color: 'blue' },
                { label: 'Políticas', value: iamPolicies.length, icon: <FileCheck size={16} />, color: 'purple' },
                { label: 'MFA Habilitado', value: iamUsers.filter((u) => u.mfaEnabled).length, icon: <Shield size={16} />, color: 'green' },
                { label: 'Usuarios Activos', value: iamUsers.filter((u) => u.status === 'active').length, icon: <CheckCircle size={16} />, color: 'amber' },
              ].map(({ label, value, icon, color }) => {
                const colors = {
                  blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
                  purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
                  green: { bg: 'bg-green-50', text: 'text-green-600' },
                  amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
                };
                const c = colors[color as keyof typeof colors];
                return (
                  <div key={label} className={`${c.bg} rounded-xl p-4 text-center`}>
                    <div className={`inline-flex p-2 ${c.text} mb-2`}>{icon}</div>
                    <div className={`text-2xl font-bold ${c.text}`}>{value}</div>
                    <div className="text-xs text-slate-500 mt-1">{label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* IAM Users Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Usuarios IAM</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Usuario', 'Rol/Política', 'MFA', 'Último Acceso', 'Estado'].map((h) => (
                      <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {iamUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
                            <Users size={14} className="text-slate-500" />
                          </div>
                          <span className="font-medium text-slate-700">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{user.role}</td>
                      <td className="py-3 px-3">
                        {user.mfaEnabled ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            <CheckCircle size={10} /> Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                            <XCircle size={10} /> Inactivo
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-500 text-xs">{user.lastLogin}</td>
                      <td className="py-3 px-3"><StatusBadge status={user.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* IAM Policies */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Políticas IAM</h3>
            <div className="space-y-3">
              {iamPolicies.map((policy) => (
                <div key={policy.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-800 text-sm">{policy.name}</h4>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        policy.type === 'AWS Managed' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {policy.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{policy.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-slate-700">{policy.attachedTo}</div>
                    <div className="text-xs text-slate-400">Adjuntada a</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: Compliance */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          {/* Compliance banner */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Acciones de cumplimiento requeridas</h3>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Se detectaron <strong>{stats.critical} problemas críticos</strong> que requieren atención inmediata
                  para mantener el cumplimiento con las normativas de seguridad y auditoría.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance checklist */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Lista de Verificación de Cumplimiento</h3>
            <div className="space-y-3">
              {[
                { task: 'Habilitar AWS CloudTrail para auditoría', status: 'critical', required: true },
                { task: 'Configurar AWS Config para monitoreo de configuración', status: 'critical', required: true },
                { task: 'Habilitar MFA en todos los usuarios IAM', status: 'warning', required: true },
                { task: 'Cerrar puerto SSH (22) expuesto públicamente', status: 'warning', required: true },
                { task: 'Definir política de retención de logs', status: 'critical', required: true },
                { task: 'Implementar cifrado en S3 y RDS', status: 'ok', required: true },
                { task: 'Configurar AWS Security Hub', status: 'ok', required: false },
                { task: 'Revisar cumplimiento SOC 2', status: 'warning', required: true },
              ].map((item, idx) => {
                const statusConfig = {
                  ok: { icon: <CheckCircle size={16} />, color: 'text-green-600', bg: 'bg-green-50' },
                  warning: { icon: <AlertTriangle size={16} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                  critical: { icon: <XCircle size={16} />, color: 'text-red-600', bg: 'bg-red-50' },
                };
                const cfg = statusConfig[item.status as keyof typeof statusConfig];
                return (
                  <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl border ${cfg.bg} ${cfg.color} border-current/20`}>
                    <span className="flex-shrink-0 mt-0.5">{cfg.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{item.task}</p>
                      {item.required && <span className="text-xs text-slate-400 mt-0.5 inline-block">Requerido</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compliance frameworks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'SOC 2 Type II', status: 'En revisión', color: 'amber' },
              { name: 'ISO 27001', status: 'Certificado', color: 'green' },
              { name: 'HIPAA', status: 'No aplica', color: 'slate' },
            ].map(({ name, status, color }) => {
              const colors = {
                green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
                amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
                slate: { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200' },
              };
              const c = colors[color as keyof typeof colors];
              return (
                <div key={name} className={`${c.bg} border ${c.border} rounded-2xl p-5 text-center`}>
                  <FileCheck size={24} className={`${c.text} mx-auto mb-2`} />
                  <h4 className="font-bold text-slate-800">{name}</h4>
                  <p className={`text-xs ${c.text} mt-1`}>{status}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Security;
