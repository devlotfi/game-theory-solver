import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useContext } from "react";
import { SolverContext } from "../../context/solver-context";
import { cn } from "@heroui/react";
import Sidebar from "../../components/sidebar";
import SolverNavbar from "../../components/solver-navbar";
import SolverProvider from "../../provider/solver-provider";

export const Route = createFileRoute("/solver")({
  component: Providers,
});

function Providers() {
  return (
    <SolverProvider>
      <RouteComponent></RouteComponent>
    </SolverProvider>
  );
}

function RouteComponent() {
  const { sidebarOpen } = useContext(SolverContext);

  return (
    <div className="flex flex-col flex-1 bg-content2 relative overflow-x-hidden">
      <SolverNavbar></SolverNavbar>

      <div className="flex flex-1">
        <Sidebar></Sidebar>

        <div
          className={cn(
            "flex flex-1 flex-col overflow-y-auto overflow-x-hidden max-w-[100vw] h-[calc(100dvh-4rem)]",
            sidebarOpen && "lg:max-w-[calc(100vw-18rem)]"
          )}
        >
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
