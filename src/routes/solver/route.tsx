import { createFileRoute, Outlet } from "@tanstack/react-router";
import SolverProvider from "../../provider/solver-provider";
import PyodideProvider from "../../provider/pyodide-provider";

export const Route = createFileRoute("/solver")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PyodideProvider>
      <SolverProvider>
        <Outlet></Outlet>
      </SolverProvider>
    </PyodideProvider>
  );
}
