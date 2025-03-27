import { PropsWithChildren, useState } from "react";
import {
  SolverContext,
  solverContextInitialValue,
} from "../context/solver-context";
import { Strategy } from "../types/strategy";
import { GainsTable } from "../types/gains-table";
import { Players } from "../types/players";

export default function SolverProvider({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    solverContextInitialValue.sidebarOpen
  );
  const [player1Name, setPlayer1Name] = useState(
    solverContextInitialValue.player1Name
  );
  const [player2Name, setPlayer2Name] = useState(
    solverContextInitialValue.player2Name
  );
  const [player1Strategies, setPlayer1Strategies] = useState<Strategy[]>(
    solverContextInitialValue.player1Strategies
  );
  const [player2Strategies, setPlayer2Strategies] = useState<Strategy[]>(
    solverContextInitialValue.player2Strategies
  );
  const [gainsTable, setGainsTable] = useState<GainsTable>(
    solverContextInitialValue.gainsTable
  );

  const addStrategy = (player: Players, name: string) => {
    if (player === Players.PLAYER_1) {
      setPlayer1Strategies([...player1Strategies, new Strategy(name)]);
      addRow();
    } else if (player === Players.PLAYER_2) {
      setPlayer2Strategies([...player2Strategies, new Strategy(name)]);
      addColumn();
    }
  };

  const editStrategy = (player: Players, id: string, name: string) => {
    if (player === Players.PLAYER_1) {
      const updatedStrategies = [...player1Strategies];
      for (const strategy of updatedStrategies) {
        if (strategy.id === id) {
          strategy.name = name;
        }
      }
      setPlayer1Strategies(updatedStrategies);
    } else if (player === Players.PLAYER_2) {
      const updatedStrategies = [...player2Strategies];
      for (const strategy of updatedStrategies) {
        if (strategy.id === id) {
          strategy.name = name;
        }
      }
      setPlayer2Strategies(updatedStrategies);
    }
  };

  const removeStrategy = (player: Players, id: string) => {
    if (player === Players.PLAYER_1) {
      setPlayer1Strategies(
        [...player1Strategies].filter((strategy, index) => {
          if (strategy.id !== id) {
            return true;
          }
          removeRow(index);
          return false;
        })
      );
    } else if (player === Players.PLAYER_2) {
      setPlayer2Strategies(
        [...player2Strategies].filter((strategy, index) => {
          if (strategy.id !== id) {
            return true;
          }
          removeColumn(index);
          return false;
        })
      );
    }
  };

  const cloneGainsTable = (): GainsTable => {
    return gainsTable.map((row) =>
      row.map((gains) => [gains[0], gains[1]])
    ) as GainsTable;
  };

  const setGainValue = (coords: [number, number], gains: [number, number]) => {
    const updatedGainTable = cloneGainsTable();
    updatedGainTable[coords[0]][coords[1]] = gains;

    setGainsTable(updatedGainTable);
  };

  const addColumn = () => {
    const updatedGainTable = cloneGainsTable();
    for (const row of updatedGainTable) {
      row.push([0, 0]);
    }
    setGainsTable(updatedGainTable);
  };
  const removeColumn = (index: number) => {
    const updatedGainTable = cloneGainsTable();
    for (const row of updatedGainTable) {
      row.splice(index, 1);
    }
    setGainsTable(updatedGainTable);
  };

  const addRow = () => {
    const updatedGainTable = cloneGainsTable();
    updatedGainTable.push(updatedGainTable[0].map(() => [0, 0]));
    setGainsTable(updatedGainTable);
  };
  const removeRow = (index: number) => {
    const updatedGainTable = cloneGainsTable();
    updatedGainTable.splice(index, 1);
    setGainsTable(updatedGainTable);
  };

  return (
    <SolverContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,

        player1Name,
        setPlayer1Name,

        player2Name,
        setPlayer2Name,

        player1Strategies,
        setPlayer1Strategies,

        player2Strategies,
        setPlayer2Strategies,

        gainsTable,
        setGainsTable,

        addStrategy,
        editStrategy,
        removeStrategy,
        setGainValue,
      }}
    >
      {children}
    </SolverContext.Provider>
  );
}
