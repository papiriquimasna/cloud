import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Users, Globe, Target, CheckSquare, ClipboardList } from 'lucide-react';
import type { CloudPlan, AppType, AvailabilityLevel, MigrationObjective } from '../types/cloud';
import { awsServices, awsRegions } from '../data/awsServices';
import { usePlanning } from '../context/PlanningContext';

const initialForm: Omit<CloudPlan, 'id' | 'createdAt'> = {
  solutionName: '',
  appType: 'Web Application',
  description: '',
  region: 'us-east-1',
  estimatedUsers: 1000,
  availabilityLevel: 'Alto (99.95%)',
  selectedServices: [],
  migrationObjective: 'Escalabilidad',
};

const appTypes: AppType[] = ['Web Application', 'Mobile Backend', 'Microservices', 'Data Analytics', 'Machine Learning', 'E-Commerce', 'API REST'];
const availabilityLevels: AvailabilityLevel[] = ['Básico (99.9%)', 'Alto (99.95%)', 'Crítico (99.99%)'];
const migrationObjectives: MigrationObjective[] = ['Reducción de costos', 'Escalabilidad', 'Alta disponibilidad', 'Modernización', 'Recuperación ante desastres'];

const Planning: React.FC = () => {
  const { plans, addPlan, deletePlan } = usePlanning();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initialForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.solutionName.trim()) e.solutionName = 'El nombre es obligatorio.';
    if (!form.description.trim()) e.description = 'La descripción es obligatoria.';
    if (form.estimatedUsers <= 0) e.estimatedUsers = 'Debe ser mayor a 0.';
    if (form.selectedServices.length === 0) e.selectedServices = 'Selecciona al menos un servicio.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const newPlan: CloudPlan = {
      ...form,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    addPlan(newPlan);
    setForm(initialForm);
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const toggleService = (id: string) => {
    setForm((f) => ({
      ...f,
      selectedServices: f.selectedServices.includes(id)
        ? f.selectedServices.filter((s) => s !== id)
        : [...f.selectedServices, id],
    }));
    setErrors((e) => ({ ...e, selectedServices: undefined }));
  };

  const inputCls = (field: keyof typeof initialForm) =>
    `w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-700 outline-none transition-all ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:border-red-500'
        : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
    }`;

  return (
    <div className="p-6 space-y-6">
      {/* Success toast */}
      {submitted && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-medium">
          <CheckSquare size={16} /> Propuesta registrada exitosamente
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ── FORM ── */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 bg-blue-50 rounded-xl"><Plus size={18} className="text-blue-600" /></div>
            <div>
              <h2 className="font-semibold text-slate-800">Nueva Propuesta Cloud</h2>
              <p className="text-xs text-slate-400">Completa todos los campos requeridos</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Solution Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Nombre de la solución <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.solutionName}
                onChange={(e) => { setForm((f) => ({ ...f, solutionName: e.target.value })); setErrors((er) => ({ ...er, solutionName: undefined })); }}
                placeholder="ej. Portal de Clientes v2"
                className={inputCls('solutionName')}
              />
              {errors.solutionName && <p className="text-xs text-red-500 mt-1">{errors.solutionName}</p>}
            </div>

            {/* App Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tipo de aplicación</label>
              <select
                value={form.appType}
                onChange={(e) => setForm((f) => ({ ...f, appType: e.target.value as AppType }))}
                className={inputCls('appType')}
              >
                {appTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => { setForm((f) => ({ ...f, description: e.target.value })); setErrors((er) => ({ ...er, description: undefined })); }}
                placeholder="Describe el objetivo y alcance de la solución..."
                className={`${inputCls('description')} resize-none`}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                <Globe size={12} className="inline mr-1" />Región seleccionada
              </label>
              <select
                value={form.region}
                onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
                className={inputCls('region')}
              >
                {awsRegions.map((r) => (
                  <option key={r.id} value={r.id}>{r.flag} {r.name}</option>
                ))}
              </select>
            </div>

            {/* Estimated Users */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                <Users size={12} className="inline mr-1" />Usuarios estimados <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                value={form.estimatedUsers}
                onChange={(e) => { setForm((f) => ({ ...f, estimatedUsers: Number(e.target.value) })); setErrors((er) => ({ ...er, estimatedUsers: undefined })); }}
                className={inputCls('estimatedUsers')}
              />
              {errors.estimatedUsers && <p className="text-xs text-red-500 mt-1">{errors.estimatedUsers}</p>}
            </div>

            {/* Availability Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nivel de disponibilidad</label>
              <div className="grid grid-cols-1 gap-2">
                {availabilityLevels.map((lvl) => (
                  <label key={lvl} className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    form.availabilityLevel === lvl ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="availability"
                      value={lvl}
                      checked={form.availabilityLevel === lvl}
                      onChange={() => setForm((f) => ({ ...f, availabilityLevel: lvl }))}
                      className="accent-blue-600"
                    />
                    <span className="text-xs font-medium text-slate-700">{lvl}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Services Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Servicios Cloud <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {awsServices.map((svc) => (
                  <label key={svc.id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    form.selectedServices.includes(svc.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={form.selectedServices.includes(svc.id)}
                      onChange={() => toggleService(svc.id)}
                      className="accent-blue-600 flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-slate-800 block">{svc.name}</span>
                      <span className="text-xs text-slate-500 block mt-0.5 leading-relaxed">{svc.mainFunction}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.selectedServices && <p className="text-xs text-red-500 mt-1">{errors.selectedServices}</p>}
            </div>

            {/* Migration Objective */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                <Target size={12} className="inline mr-1" />Objetivo de migración
              </label>
              <select
                value={form.migrationObjective}
                onChange={(e) => setForm((f) => ({ ...f, migrationObjective: e.target.value as MigrationObjective }))}
                className={inputCls('migrationObjective')}
              >
                {migrationObjectives.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Registrar Propuesta
            </button>
          </form>
        </div>

        {/* ── PROPOSALS LIST ── */}
        <div className="xl:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList size={18} className="text-slate-500" />
              <h2 className="font-semibold text-slate-800">Propuestas Registradas</h2>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">{plans.length} total</span>
          </div>

          {plans.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
              <ClipboardList size={40} className="text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm font-medium">No hay propuestas registradas</p>
              <p className="text-slate-300 text-xs mt-1">Completa el formulario para agregar una</p>
            </div>
          )}

          {plans.map((plan) => {
            const regionInfo = awsRegions.find((r) => r.id === plan.region);
            return (
              <div key={plan.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{plan.solutionName}</h3>
                    <span className="text-xs text-blue-600 font-medium">{plan.appType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar size={11} />
                      <span>{plan.createdAt}</span>
                    </div>
                    <button
                      onClick={() => deletePlan(plan.id)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4 bg-slate-50 rounded-xl p-3">{plan.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-xl p-2.5 text-center">
                    <p className="text-xs text-blue-400 mb-0.5">Región</p>
                    <p className="text-xs font-bold text-blue-700">{regionInfo?.flag} {regionInfo?.code ?? plan.region}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-2.5 text-center">
                    <p className="text-xs text-purple-400 mb-0.5">Usuarios</p>
                    <p className="text-xs font-bold text-purple-700">{plan.estimatedUsers.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-2.5 text-center">
                    <p className="text-xs text-green-500 mb-0.5">Disponibilidad</p>
                    <p className="text-xs font-bold text-green-700">{plan.availabilityLevel.split(' ')[1]}</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-2.5 text-center">
                    <p className="text-xs text-amber-500 mb-0.5">Objetivo</p>
                    <p className="text-xs font-bold text-amber-700 leading-tight">{plan.migrationObjective.split(' ')[0]}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Servicios seleccionados</p>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.selectedServices.map((sId) => {
                      const svc = awsServices.find((s) => s.id === sId);
                      return svc ? (
                        <span key={sId} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          {svc.name.replace('Amazon ', '').replace('AWS ', '')}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Objetivo de migración</span>
                    <span className="text-xs font-semibold text-slate-700">{plan.migrationObjective}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Planning;
