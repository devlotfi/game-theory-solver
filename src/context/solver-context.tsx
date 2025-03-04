import { createContext } from "react";

interface SolverContext {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const SolverContextInitialValue: SolverContext = {
  sidebarOpen: true,
  setSidebarOpen() {},
};

export const SolverContext = createContext(SolverContextInitialValue);
