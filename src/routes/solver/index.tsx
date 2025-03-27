import { createFileRoute } from "@tanstack/react-router";
import { useContext, useEffect } from "react";
import { SolverContext } from "../../context/solver-context";
import { Players } from "../../types/players";
import AddStrategyBtn from "../../components/add-strategy-btn";
import StrategyTableCell from "../../components/strategy-table-cell";
import TableCell from "../../components/table-cell";
import PlayerNamesLayout from "../../layout/player-names-layout";
import SolverNavbar from "../../components/solver-navbar";
import Sidebar from "../../components/sidebar";
import { cn } from "@heroui/react";

export const Route = createFileRoute("/solver/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { player1Strategies, player2Strategies, gainsTable, sidebarOpen } =
    useContext(SolverContext);

  useEffect(() => {
    console.log(gainsTable);
  }, [gainsTable]);

  return (
    <div className="flex flex-col flex-1 bg-content2 relative overflow-x-hidden">
      <SolverNavbar></SolverNavbar>

      <div className="flex flex-1">
        <Sidebar></Sidebar>

        <div
          className={cn(
            "flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-[100dvw] h-[calc(100dvh-4rem)]",
            sidebarOpen && "lg:w-[calc(100dvw-18rem)]"
          )}
        >
          <PlayerNamesLayout>
            <table className="border-separate border-spacing-[0.5rem] inline-block m-auto">
              <tbody>
                <tr>
                  <td className="sticky top-0 left-0 z-20 bg-content2"></td>
                  {player2Strategies.map((strategy) => (
                    <StrategyTableCell
                      key={strategy.id}
                      player={Players.PLAYER_2}
                      strategy={strategy}
                    ></StrategyTableCell>
                  ))}

                  <td>
                    <div className="flex">
                      <AddStrategyBtn
                        player={Players.PLAYER_2}
                      ></AddStrategyBtn>
                    </div>
                  </td>
                </tr>

                {gainsTable.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <StrategyTableCell
                      player={Players.PLAYER_1}
                      strategy={player1Strategies[rowIndex]}
                    ></StrategyTableCell>

                    {row.map((gains, columnIndex) => (
                      <TableCell
                        key={columnIndex}
                        gains={gains}
                        coords={[rowIndex, columnIndex]}
                      ></TableCell>
                    ))}
                  </tr>
                ))}

                <tr>
                  <td>
                    <div className="flex justify-center">
                      <AddStrategyBtn
                        player={Players.PLAYER_1}
                      ></AddStrategyBtn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PlayerNamesLayout>
        </div>
      </div>
    </div>
  );
}
