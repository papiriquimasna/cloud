import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CloudPlan } from '../types/cloud';

interface PlanningContextType {
  plans: CloudPlan[];
  addPlan: (plan: CloudPlan) => void;
  deletePlan: (id: string) => void;
}

const PlanningContext = createContext<PlanningContextType | undefined>(undefined);

export const usePlanning = () => {
  const context = useContext(PlanningContext);
  if (!context) {
    throw new Error('usePlanning debe usarse dentro de PlanningProvider');
  }
  return context;
};

export const PlanningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plans, setPlans] = useState<CloudPlan[]>([]);

  const addPlan = (plan: CloudPlan) => {
    setPlans((prev) => [plan, ...prev]);
  };

  const deletePlan = (id: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PlanningContext.Provider value={{ plans, addPlan, deletePlan }}>
      {children}
    </PlanningContext.Provider>
  );
};
