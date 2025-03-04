import { PropsWithChildren, useState } from "react";
import { SolverContext } from "../context/solver-context";

export default function SolverProvider({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <SolverContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </SolverContext.Provider>
  );
}
