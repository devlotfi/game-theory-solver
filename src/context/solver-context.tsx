import { createContext } from "react";
import { Strategy } from "../types/strategy";
import { ActionPlayload } from "../types/actions";
import { Player } from "../types/player";
import { GainsTable } from "../types/gains-table";

export interface SolverState {
  sidebarOpen: boolean;
  players: Player[];
  strategies: Strategy[];
  highlightedStrategies: Set<string>;
  highlightedCases: Set<string>;
  gainsTable: GainsTable;
  action: ActionPlayload | null;
}

interface SolverContextType {
  solverState: SolverState;
  setSolverState: (value: SolverState) => void;
}

const player1 = new Player("Player 1");
const player2 = new Player("Player 2");

const player1Strategies = [
  new Strategy(player1.id, "Strategy 1"),
  new Strategy(player1.id, "Strategy 2"),
  new Strategy(player1.id, "Strategy 3"),
];

const player2Strategies = [
  new Strategy(player2.id, "Strategy 1"),
  new Strategy(player2.id, "Strategy 2"),
  new Strategy(player2.id, "Strategy 3"),
];

const gainsTable: GainsTable = [
  [
    [player1Strategies[0].id, 4],
    [player2Strategies[0].id, 3],
  ],
  [
    [player1Strategies[0].id, 5],
    [player2Strategies[1].id, 1],
  ],
  [
    [player1Strategies[0].id, 6],
    [player2Strategies[2].id, 2],
  ],

  [
    [player1Strategies[1].id, 2],
    [player2Strategies[0].id, 1],
  ],
  [
    [player1Strategies[1].id, 8],
    [player2Strategies[1].id, 4],
  ],
  [
    [player1Strategies[1].id, 3],
    [player2Strategies[2].id, 6],
  ],

  [
    [player1Strategies[2].id, 3],
    [player2Strategies[0].id, 0],
  ],
  [
    [player1Strategies[2].id, 9],
    [player2Strategies[1].id, 6],
  ],
  [
    [player1Strategies[2].id, 2],
    [player2Strategies[2].id, 8],
  ],
];

export const solverContextInitialValue: SolverContextType = {
  solverState: {
    sidebarOpen: true,
    players: [player1, player2],
    strategies: [...player1Strategies, ...player2Strategies],
    highlightedStrategies: new Set<string>(),
    highlightedCases: new Set<string>(),
    gainsTable,
    action: null,
  },
  setSolverState() {},
};

export const SolverContext = createContext(solverContextInitialValue);
