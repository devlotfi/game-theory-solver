import { PropsWithChildren, useContext } from "react";
import { SolverContext } from "../context/solver-context";
import EditPlayerNameBtn from "../components/edit-player-name-btn";
import { Players } from "../types/players";

export default function PlayerNamesLayout({ children }: PropsWithChildren) {
  const { solverState } = useContext(SolverContext);

  return (
    <div className="grid flex-1 grid-cols-[2.7rem_auto] grid-rows-[2.7rem_auto]">
      <div className="flex border-divider border-r border-b"></div>
      <div className="flex justify-center items-center gap-[0.5rem] border-divider border-b group hover:bg-content1 duration-300 transition-background">
        <div className="flex">{solverState.player2Name}</div>
        <EditPlayerNameBtn player={Players.PLAYER_2}></EditPlayerNameBtn>
      </div>
      <div className="flex flex-col justify-center items-center gap-[0.5rem] border-divider border-r group hover:bg-content1 duration-300 transition-background">
        <EditPlayerNameBtn player={Players.PLAYER_1}></EditPlayerNameBtn>
        <div
          className="flex rotate-180"
          style={{
            textOrientation: "mixed",
            writingMode: "vertical-lr",
          }}
        >
          {solverState.player1Name}
        </div>
      </div>
      <div className="flex max-w-[calc(100dvw-3rem)] max-h-[calc(100dvh-3rem-4rem)] items-start overflow-auto">
        {children}
      </div>
    </div>
  );
}
