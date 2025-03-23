import { useContext } from "react";
import { cn } from "@heroui/react";
import { SolverContext } from "../context/solver-context";

export default function Sidebar() {
  const { sidebarOpen } = useContext(SolverContext);

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
          "flex flex-col absolute lg:static z-40 h-[calc(100dvh-4rem)] lg:h-auto ml-[-18rem] min-w-[18rem] bg-content1 border-r border-divider duration-300",
          sidebarOpen && "ml-0"
        )}
      >
        <div className="flex flex-col p-[1rem] space-y-3"></div>
      </div>
    </>
  );
}
