import { faDoorOpen, faGear } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import SidebarItem from "./sidebar-item";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { SolverContext } from "../context/solver-context";
import { cn } from "@heroui/react";

export default function Sidebar() {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const { sidebarOpen, setSidebarOpen } = useContext(SolverContext);

  const sidebarNavigate = (path: string) => {
    navigate({ to: path });
    if (!window.matchMedia(`(min-width: 1024px)`).matches) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex lg:hidden fixed h-screen w-screen bg-black opacity-50 z-40",
          !sidebarOpen && "hidden"
        )}
      ></div>
      <div
        className={cn(
          "flex flex-col absolute lg:static z-40 h-[calc(100dvh-4rem)] lg:h-auto ml-[-18rem] min-w-[18rem] bg-background border-r border-divider duration-300",
          sidebarOpen && "ml-0"
        )}
      >
        <div className="flex flex-col p-[1rem] space-y-3">
          <SidebarItem
            title="Access controls"
            active={location.pathname === "/dashboard/access-controls"}
            onPress={() => sidebarNavigate("/dashboard")}
            icon={faDoorOpen}
          ></SidebarItem>
          <SidebarItem
            title="Settings"
            active={location.pathname === "/dashboard/settings"}
            onPress={() => sidebarNavigate("/dashboard/settings")}
            icon={faGear}
          ></SidebarItem>
        </div>
      </div>
    </>
  );
}
