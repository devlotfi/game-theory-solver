import { ComponentProps, PropsWithChildren, useContext } from "react";
import { Button, ButtonProps, cn, Divider } from "@heroui/react";
import { SolverContext } from "../context/solver-context";
import { useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEraser,
  faSearch,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { PyodideContext } from "../context/pyodide-context";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Players } from "../types/players";
import { SolverUtils } from "../solver-utils";

function PlayerUtils({
  children,
  playerName,
}: PropsWithChildren<{ playerName: string }>) {
  return (
    <div className="flex relative flex-col gap-[0.5rem] p-[0.5rem] border border-divider rounded-lg">
      <div className="flex absolute bg-content1 px-[0.5rem] top-[-1.2rem] left-[1rem] text-[13pt] font-bold">
        {playerName}
      </div>
      {children}
    </div>
  );
}

function SidebarBtn({
  icon,
  children,
  ...props
}: {
  icon: IconProp;
} & ButtonProps) {
  const { solverState } = useContext(SolverContext);

  return (
    <Button
      variant="light"
      isDisabled={solverState.action !== null}
      startContent={
        <div className="flex justify-center items-center min-h-[1.7rem] min-w-[1.7rem] bg-primary rounded-full text-primary-foreground">
          <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </div>
      }
      className="justify-start px-[0.4rem] h-[3rem] whitespace-break-spaces text-left"
      {...props}
    >
      {children}
    </Button>
  );
}

function SecurityLevelDisplay({
  player,
  ...props
}: {
  player: Players;
} & ComponentProps<"div">) {
  const { pyodide } = useContext(PyodideContext);
  const { solverState } = useContext(SolverContext);

  return (
    <div
      className="flex items-center gap-[0.3rem] bg-content2 rounded-md py-[0.5rem] px-[0.7rem] text-[12pt]"
      {...props}
    >
      <div className="flex">Security level:</div>
      <div className="flex text-primary font-bold">
        {SolverUtils.securityLevel(solverState, pyodide, player)}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const { pyodide } = useContext(PyodideContext);
  const { solverState, setSolverState } = useContext(SolverContext);

  return (
    <>
      <div
        className={cn(
          "flex lg:hidden fixed h-screen w-screen bg-black opacity-50 z-40",
          !solverState.sidebarOpen && "hidden"
        )}
      ></div>
      <div
        className={cn(
          "flex flex-col absolute overflow-y-auto p-[1rem] lg:static z-40 h-[calc(100dvh-4rem)] ml-[-18rem] w-[18rem] bg-content1 border-r border-divider duration-300",
          solverState.sidebarOpen && "ml-0"
        )}
      >
        <div className="flex flex-col">
          <Button
            color="primary"
            variant="bordered"
            isDisabled={solverState.action !== null}
            onPress={() =>
              navigate({
                to: "/solver/examples",
              })
            }
            endContent={<FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>}
          >
            Load examples
          </Button>
        </div>
        <Divider className="my-[1rem]"></Divider>

        <div className="flex items-center gap-[1rem]">
          <FontAwesomeIcon
            icon={faWrench}
            className="text-primary text-[15pt]"
          ></FontAwesomeIcon>
          <div className="flex text-[15pt] font-black">Utils</div>
        </div>

        <div className="flex flex-col gap-[1.5rem] mt-[1rem]">
          <div className="flex flex-col gap-[0.3rem]">
            <SidebarBtn
              icon={faSearch}
              onPress={() =>
                setSolverState(
                  SolverUtils.findNashEquilibria(solverState, pyodide)
                )
              }
            >
              Find Nash Equilibria
            </SidebarBtn>
            <SidebarBtn
              icon={faSearch}
              onPress={() =>
                setSolverState(
                  SolverUtils.findParetoOptimum(solverState, pyodide)
                )
              }
            >
              Find Pareto Optimum
            </SidebarBtn>
          </div>

          <PlayerUtils playerName={solverState.player1Name}>
            <SecurityLevelDisplay
              player={Players.PLAYER_1}
            ></SecurityLevelDisplay>
            <SidebarBtn
              icon={faSearch}
              onPress={() =>
                setSolverState(
                  SolverUtils.findStrictlyDominantStrategy(
                    solverState,
                    pyodide,
                    Players.PLAYER_1
                  )
                )
              }
            >
              Find Strictly Dominant Strategies
            </SidebarBtn>
            <SidebarBtn
              icon={faSearch}
              onPress={() =>
                setSolverState(
                  SolverUtils.findWeaklyDominantStrategy(
                    solverState,
                    pyodide,
                    Players.PLAYER_1
                  )
                )
              }
            >
              Find Weakly Dominant Strategies
            </SidebarBtn>

            <SidebarBtn
              icon={faEraser}
              onPress={() =>
                setSolverState(
                  SolverUtils.eliminateStrictlyDominatedStrategy(
                    solverState,
                    pyodide,
                    Players.PLAYER_1
                  )
                )
              }
            >
              Eliminate Strictly Dominated Strategy
            </SidebarBtn>
            <SidebarBtn
              icon={faEraser}
              onPress={() =>
                setSolverState(
                  SolverUtils.eliminateWeaklyDominatedStrategy(
                    solverState,
                    pyodide,
                    Players.PLAYER_1
                  )
                )
              }
            >
              Eliminate Weakly Dominated Strategy
            </SidebarBtn>
          </PlayerUtils>

          <PlayerUtils playerName={solverState.player2Name}>
            <SecurityLevelDisplay
              player={Players.PLAYER_2}
            ></SecurityLevelDisplay>
            <SidebarBtn
              icon={faSearch}
              onPress={() =>
                setSolverState(
                  SolverUtils.findStrictlyDominantStrategy(
                    solverState,
                    pyodide,
                    Players.PLAYER_2
                  )
                )
              }
            >
              Find Strictly Dominant Strategies
            </SidebarBtn>
            <SidebarBtn
              icon={faSearch}
              onPress={() =>
                setSolverState(
                  SolverUtils.findWeaklyDominantStrategy(
                    solverState,
                    pyodide,
                    Players.PLAYER_2
                  )
                )
              }
            >
              Find Weakly Dominant Strategies
            </SidebarBtn>

            <SidebarBtn
              icon={faEraser}
              onPress={() =>
                setSolverState(
                  SolverUtils.eliminateStrictlyDominatedStrategy(
                    solverState,
                    pyodide,
                    Players.PLAYER_2
                  )
                )
              }
            >
              Eliminate Strictly Dominated Strategy
            </SidebarBtn>
            <SidebarBtn
              icon={faEraser}
              onPress={() =>
                setSolverState(
                  SolverUtils.eliminateWeaklyDominatedStrategy(
                    solverState,
                    pyodide,
                    Players.PLAYER_2
                  )
                )
              }
            >
              Eliminate Weakly Dominated Strategy
            </SidebarBtn>
          </PlayerUtils>
        </div>
      </div>
    </>
  );
}
