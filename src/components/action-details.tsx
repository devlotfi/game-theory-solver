import { useContext } from "react";
import { SolverContext } from "../context/solver-context";
import { Actions } from "../types/actions";
import { Players } from "../types/players";
import { Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { SolverUtils } from "../solver-utils";

export default function ActionDetails() {
  const { solverState, setSolverState } = useContext(SolverContext);

  if (!solverState.action) return;

  return (
    <div className="flex items-center justify-between bg-primary px-[1rem] h-[3.5rem] border-b border-divider">
      {solverState.action.actionType ===
      Actions.STRICTLY_DOMINANT_STRATEGIES ? (
        <>
          <div className="flex text-primary-foreground font-bold">
            Showing strictly dominant strategies for (
            {solverState.action.player === Players.PLAYER_1
              ? solverState.player1Name
              : solverState.player2Name}
            )
          </div>
          <div className="flex">
            <Button
              variant="flat"
              className="bg-content1"
              startContent={<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>}
              onPress={() => {
                setSolverState(SolverUtils.clearAction(solverState));
              }}
            >
              Hide
            </Button>
          </div>
        </>
      ) : solverState.action.actionType ===
        Actions.WEAKLY_DOMINANT_STRATEGIES ? (
        <>
          <div className="flex text-primary-foreground font-bold">
            Showing weakly dominant strategies for (
            {solverState.action.player === Players.PLAYER_1
              ? solverState.player1Name
              : solverState.player2Name}
            )
          </div>
          <div className="flex">
            <Button
              variant="flat"
              className="bg-content1"
              startContent={<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>}
              onPress={() =>
                setSolverState(SolverUtils.clearAction(solverState))
              }
            >
              Hide
            </Button>
          </div>
        </>
      ) : solverState.action.actionType ===
        Actions.ELIMINATE_STRICTLY_DOMINATED_STRATEGY ? (
        <>
          <div className="flex text-primary-foreground font-bold">
            Eliminate strictly dominated strategy for (
            {solverState.action.player === Players.PLAYER_1
              ? solverState.player1Name
              : solverState.player2Name}
            )
          </div>
          <div className="flex gap-[0.5rem]">
            <Button
              color="danger"
              variant="flat"
              className="bg-content1"
              startContent={<FontAwesomeIcon icon={faEraser}></FontAwesomeIcon>}
              onPress={() => {
                if (solverState.action) {
                  setSolverState(
                    SolverUtils.removeHighlightedStrategies(
                      solverState,
                      solverState.action.player
                    )
                  );
                }
              }}
            >
              Eliminate
            </Button>
            <Button
              variant="flat"
              className="bg-content1"
              startContent={<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>}
              onPress={() =>
                setSolverState(SolverUtils.clearAction(solverState))
              }
            >
              Hide
            </Button>
          </div>
        </>
      ) : solverState.action.actionType ===
        Actions.ELIMINATE_WEAKLY_DOMINATED_STRATEGY ? (
        <>
          <div className="flex text-primary-foreground font-bold">
            Showing weakly dominant strategies for (
            {solverState.action.player === Players.PLAYER_1
              ? solverState.player1Name
              : solverState.player2Name}
            )
          </div>
          <div className="flex gap-[0.5rem]">
            <Button
              color="danger"
              variant="flat"
              className="bg-content1"
              startContent={<FontAwesomeIcon icon={faEraser}></FontAwesomeIcon>}
              onPress={() =>
                setSolverState(
                  SolverUtils.removeHighlightedStrategies(
                    solverState,
                    solverState.action
                  )
                )
              }
            >
              Eliminate
            </Button>
            <Button
              variant="flat"
              className="bg-content1"
              startContent={<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>}
              onPress={() =>
                setSolverState(SolverUtils.clearAction(solverState))
              }
            >
              Hide
            </Button>
          </div>
        </>
      ) : solverState.action.actionType === Actions.NASH_EQUILIBRIA ? (
        <>
          <div className="flex text-primary-foreground font-bold">
            Showing nash equilibria
          </div>
          <div className="flex">
            <Button
              variant="flat"
              className="bg-content1"
              startContent={<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>}
              onPress={() =>
                setSolverState(SolverUtils.clearAction(solverState))
              }
            >
              Hide
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
