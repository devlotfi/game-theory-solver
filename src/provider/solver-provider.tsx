import { PropsWithChildren, useState } from "react";
import {
  SolverContext,
  solverContextInitialValue,
  SolverState,
} from "../context/solver-context";

export default function SolverProvider({ children }: PropsWithChildren) {
  const [solverState, setSolverState] = useState<SolverState>(
    solverContextInitialValue.solverState
  );

  return (
    <SolverContext.Provider
      value={{
        solverState,
        setSolverState,
      }}
    >
      {children}
    </SolverContext.Provider>
  );
}
