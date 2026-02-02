import { createContext, useState, useEffect } from "react";

export const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState("FREE");

  useEffect(() => {
    const savedPlan = localStorage.getItem("user_plan");
    if (savedPlan) {
      setPlan(savedPlan);
    }
  }, []);

  function upgradePlan(newPlan) {
    setPlan(newPlan);
    localStorage.setItem("user_plan", newPlan);
  }

  return (
    <PlanContext.Provider value={{ plan, upgradePlan }}>
      {children}
    </PlanContext.Provider>
  );
}
