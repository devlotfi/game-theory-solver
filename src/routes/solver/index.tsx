import { createFileRoute } from "@tanstack/react-router";
import { useContext, useEffect } from "react";
import { SolverContext } from "../../context/solver-context";
import SolverNavbar from "../../components/solver-navbar";
import Sidebar from "../../components/sidebar";
import { cn } from "@heroui/react";
import ActionDetails from "../../components/action-details";
import TableCell from "../../components/table-cell";

export const Route = createFileRoute("/solver/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { solverState } = useContext(SolverContext);

  useEffect(() => {
    console.log(solverState.gainsTable);
  }, [solverState.gainsTable]);

  return (
    <div className="flex flex-col flex-1 bg-content2 relative overflow-x-hidden">
      <SolverNavbar></SolverNavbar>

      <div className="flex flex-1">
        <Sidebar></Sidebar>

        <div
          className={cn(
            "flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-[100dvw] h-[calc(100dvh-4rem)]",
            solverState.sidebarOpen && "lg:w-[calc(100dvw-18rem)]"
          )}
        >
          <ActionDetails></ActionDetails>

          <div className="flex flex-1 flex-col justify-center items-center">
            <table>
              <thead>
                <tr>
                  {solverState.players.map((player) => (
                    <td key={player.id}>{player.name}</td>
                  ))}

                  <TableCell
                    classNames={{
                      td: { colSpan: 3 },
                    }}
                  >
                    lol
                  </TableCell>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Strategy 1</td>
                  <td>Strategy 2</td>
                  <td>Strategy 3</td>

                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
