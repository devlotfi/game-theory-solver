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
  player2Strategies: Strategy[];
  gainsTable: GainsTable;

  addStrategy: (player: Players, name: string) => void;
  editStrategy: (player: Players, id: string, name: string) => void;
  removeStrategy: (player: Players, id: string) => void;
  setGainValue: (
    coords: [number, number],
    player: Players,
    value: number
  ) => void;
}

export const solverContextInitialValue: SolverContextType = {
  sidebarOpen: true,
  setSidebarOpen() {},

  player1Name: "Player 1",
  setPlayer1Name() {},

  player2Name: "Player 2",
  setPlayer2Name() {},

  player1Strategies: [new Strategy("Strategy 1"), new Strategy("Strategy 2")],
  player2Strategies: [new Strategy("Strategy 1"), new Strategy("Strategy 2")],
  gainsTable: [
    [
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
    ],
  ],
  addStrategy() {},
  editStrategy() {},
  removeStrategy() {},
  setGainValue() {},
};

export const SolverContext = createContext(solverContextInitialValue);
