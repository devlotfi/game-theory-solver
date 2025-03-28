import { createContext } from "react";
import { Strategy } from "../types/strategy";
import { GainsTable } from "../types/gains-table";
import { ActionPlayload } from "../types/actions";

export interface SolverState {
  sidebarOpen: boolean;

  player1Name: string;
  player2Name: string;

  player1Strategies: Strategy[];
  player2Strategies: Strategy[];

  highlightedPlayer1Strategies: Set<string>;
  highlightedPlayer2Strategies: Set<string>;

  highlightedCells: Set<string>;

  gainsTable: GainsTable;

  action: ActionPlayload | null;
}

interface SolverContextType {
  solverState: SolverState;
  setSolverState: (value: SolverState) => void;
}

export const solverContextInitialValue: SolverContextType = {
  solverState: {
    sidebarOpen: true,

    player1Name: "Player 1",
    player2Name: "Player 2",

    player1Strategies: [
      new Strategy("Strategy 1"),
      new Strategy("Strategy 2"),
      new Strategy("Strategy 3"),
      new Strategy("Strategy 4"),
      new Strategy("Strategy 5"),
    ],
    player2Strategies: [
      new Strategy("Strategy 1"),
      new Strategy("Strategy 2"),
      new Strategy("Strategy 3"),
      new Strategy("Strategy 4"),
      new Strategy("Strategy 5"),
    ],

    highlightedPlayer1Strategies: new Set(),
    highlightedPlayer2Strategies: new Set(),

    highlightedCells: new Set(),

    gainsTable: [
      [
        [3, 3],
        [1, 4],
        [4, 1],
        [2, 2],
        [5, 0],
      ],
      [
        [4, 1],
        [2, 2],
        [3, 3],
        [1, 4],
        [0, 5],
      ],
      [
        [1, 4],
        [3, 3],
        [2, 2],
        [4, 1],
        [0, 5],
      ],
      [
        [2, 2],
        [4, 1],
        [0, 5],
        [3, 3],
        [1, 4],
      ],
      [
        [5, 0],
        [0, 5],
        [1, 4],
        [2, 2],
        [3, 3],
      ],
    ],

    action: null,
  },
  setSolverState() {},
};

export const SolverContext = createContext(solverContextInitialValue);
