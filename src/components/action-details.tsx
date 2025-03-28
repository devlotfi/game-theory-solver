import { useContext } from "react";
import { SolverContext } from "../context/solver-context";
import { Actions } from "../types/actions";
import { Players } from "../types/players";
import { Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { SolverUtils } from "../solver-utils";

export default function ActionDetails() {
  const { solverState, setSolverState } = useContext(SolverContext);

  if (!solverState.action) return;

  return (
    <div className="flex items-center justify-between bg-content1 px-[1rem] h-[3.5rem] border-[2px] border-primary">
      {solverState.action.actionType ===
      Actions.STRICTLY_DOMINANT_STRATEGIES ? (
        <>
          <div className="flex text-primary font-bold">
            Showing strictly dominant strategies for (
            {solverState.action.player === Players.PLAYER_1
              ? solverState.player1Name
              : solverState.player2Name}
            )
          </div>
          <div className="flex">
            <Button
              color="danger"
              variant="bordered"
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
        Actions.WEAKLY_DOMINANT_STRATEGIES ? (
        <>
          <div className="flex text-primary font-bold">
            Showing weakly dominant strategies for (
            {solverState.action.player === Players.PLAYER_1
              ? solverState.player1Name
              : solverState.player2Name}
            )
          </div>
          <div className="flex">
            <Button
              color="danger"
              variant="bordered"
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
        <>ELIMINATE_STRICTLY_DOMINATED_STRATEGY</>
      ) : solverState.action.actionType ===
        Actions.ELIMINATE_WEAKLY_DOMINATED_STRATEGY ? (
        <>ELIMINATE_WEAKLY_DOMINATED_STRATEGY</>
      ) : solverState.action.actionType === Actions.NASH_EQUILIBRIA ? (
        <>
          <div className="flex text-primary font-bold">
            Showing nash equilibria
          </div>
          <div className="flex">
            <Button
              color="danger"
              variant="bordered"
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
