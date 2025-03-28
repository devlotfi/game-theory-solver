import { createContext } from "react";
import { Players } from "../types/players";
import { Strategy } from "../types/strategy";
import { GainsTable } from "../types/gains-table";

interface SolverContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;

  player1Name: string;
  setPlayer1Name: (value: string) => void;

  player2Name: string;
  setPlayer2Name: (value: string) => void;

  player1Strategies: Strategy[];
  setPlayer1Strategies: (value: Strategy[]) => void;

  player2Strategies: Strategy[];
  setPlayer2Strategies: (value: Strategy[]) => void;

  highlightedPlayer1Strategies: Set<string>;
  setHighlightedPlayer1Strategies: (value: Set<string>) => void;

  highlightedPlayer2Strategies: Set<string>;
  setHighlightedPlayer2Strategies: (value: Set<string>) => void;

  highlightedCells: Set<string>;
  setHighlightedCells: (value: Set<string>) => void;

  gainsTable: GainsTable;
  setGainsTable: (value: GainsTable) => void;

  addStrategy: (player: Players, name: string) => void;
  editStrategy: (player: Players, id: string, name: string) => void;
  removeStrategy: (player: Players, id: string) => void;
  setGainValue: (coords: [number, number], gains: [number, number]) => void;
}

export const solverContextInitialValue: SolverContextType = {
  sidebarOpen: true,
  setSidebarOpen() {},

  player1Name: "Player 1",
  setPlayer1Name() {},

  player2Name: "Player 2",
  setPlayer2Name() {},

  player1Strategies: [
    new Strategy("Strategy 1"),
    new Strategy("Strategy 2"),
    new Strategy("Strategy 3"),
  ],
  setPlayer1Strategies() {},

  player2Strategies: [
    new Strategy("Strategy 1"),
    new Strategy("Strategy 2"),
    new Strategy("Strategy 3"),
  ],
  setPlayer2Strategies() {},

  highlightedPlayer1Strategies: new Set(),
  setHighlightedPlayer1Strategies() {},

  highlightedPlayer2Strategies: new Set(),
  setHighlightedPlayer2Strategies() {},

  highlightedCells: new Set(["[0,0]"]),
  setHighlightedCells() {},

  gainsTable: [
    [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  ],
  setGainsTable() {},

  addStrategy() {},
  editStrategy() {},
  removeStrategy() {},
  setGainValue() {},
};

export const SolverContext = createContext(solverContextInitialValue);
