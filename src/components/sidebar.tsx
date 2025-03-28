import { PropsWithChildren, useContext } from "react";
import { Button, cn, Divider } from "@heroui/react";
import { SolverContext } from "../context/solver-context";
import { useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faWrench } from "@fortawesome/free-solid-svg-icons";
import { PyodideContext } from "../context/pyodide-context";

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

export default function Sidebar() {
  const navigate = useNavigate();
  const { pyodide } = useContext(PyodideContext);
  const {
    sidebarOpen,
    player1Name,
    player2Name,
    gainsTablen,
    setHighlightedCells,
  } = useContext(SolverContext);

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
          "flex flex-col absolute overflow-y-auto gap-[1rem] p-[1rem] lg:static z-40 h-[calc(100dvh-4rem)] ml-[-18rem] min-w-[18rem] bg-content1 border-r border-divider duration-300",
          sidebarOpen && "ml-0"
        )}
      >
        <div className="flex flex-col">
          <Button
            color="primary"
            variant="bordered"
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
        <Divider></Divider>

        <div className="flex items-center gap-[1rem]">
          <FontAwesomeIcon
            icon={faWrench}
            className="text-primary text-[15pt]"
          ></FontAwesomeIcon>
          <div className="flex text-[15pt] font-black">Utils</div>
        </div>

        <div className="flex flex-col gap-[2rem] mt-[1rem]">
          <PlayerUtils playerName={player1Name}>
            <Button
              onPress={() => {
                const strategie_strictement_dominante = pyodide.globals.get(
                  "strategie_strictement_dominante"
                );
                const res = strategie_strictement_dominante(
                  gainsTable,
                  0
                ).toJs();

                console.log(res);
              }}
            >
              lol
            </Button>
            <Button onPress={() => setHighlightedCells(new Set(["[1,1]"]))}>
              lol
            </Button>
            <Button>lol</Button>
          </PlayerUtils>

          <PlayerUtils playerName={player2Name}>
            <Button>lol</Button>
            <Button>lol</Button>
            <Button>lol</Button>
          </PlayerUtils>
        </div>
      </div>
    </>
  );
}
