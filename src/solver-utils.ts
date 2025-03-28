import { SolverState } from "./context/solver-context";
import { GainsTable } from "./types/gains-table";
import { Players } from "./types/players";
import { Strategy } from "./types/strategy";

export class SolverUtils {
  public static addStrategy(
    solverState: SolverState,
    player: Players,
    name: string
  ): SolverState {
    if (player === Players.PLAYER_1) {
      return {
        ...solverState,
        ...SolverUtils.addRow(solverState),
        player1Strategies: [
          ...solverState.player1Strategies,
          new Strategy(name),
        ],
      };
    } else {
      return {
        ...solverState,
        ...SolverUtils.addColumn(solverState),
        player2Strategies: [
          ...solverState.player2Strategies,
          new Strategy(name),
        ],
      };
    }
  }

  public static editStrategy(
    solverState: SolverState,
    player: Players,
    id: string,
    name: string
  ): SolverState {
    if (player === Players.PLAYER_1) {
      const updatedStrategies = [...solverState.player1Strategies];
      for (const strategy of updatedStrategies) {
        if (strategy.id === id) {
          strategy.name = name;
        }
      }
      return {
        ...solverState,
        player1Strategies: updatedStrategies,
      };
    } else {
      const updatedStrategies = [...solverState.player2Strategies];
      for (const strategy of updatedStrategies) {
        if (strategy.id === id) {
          strategy.name = name;
        }
      }
      return {
        ...solverState,
        player2Strategies: updatedStrategies,
      };
    }
  }

  public static removeStrategy(
    solverState: SolverState,
    player: Players,
    id: string
  ): SolverState {
    if (player === Players.PLAYER_1) {
      return {
        ...solverState,
        ...SolverUtils.removeRow(
          solverState,
          solverState.player1Strategies.findIndex(
            (strategy) => strategy.id === id
          )
        ),
        player1Strategies: [...solverState.player1Strategies].filter(
          (strategy) => {
            if (strategy.id === id) {
              return false;
            }
            return true;
          }
        ),
      };
    } else {
      return {
        ...solverState,
        ...SolverUtils.removeColumn(
          solverState,
          solverState.player2Strategies.findIndex(
            (strategy) => strategy.id === id
          )
        ),
        player2Strategies: [...solverState.player2Strategies].filter(
          (strategy) => {
            if (strategy.id === id) {
              return false;
            }
            return true;
          }
        ),
      };
    }
  }

  public static cloneGainsTable(solverState: SolverState): GainsTable {
    return solverState.gainsTable.map((row) =>
      row.map((gains) => [gains[0], gains[1]])
    ) as GainsTable;
  }

  public static setGainValue(
    solverState: SolverState,
    coords: [number, number],
    gains: [number, number]
  ): SolverState {
    const updatedGainTable = SolverUtils.cloneGainsTable(solverState);
    updatedGainTable[coords[0]][coords[1]] = gains;

    return {
      ...solverState,
      gainsTable: updatedGainTable,
    };
  }

  public static addColumn(solverState: SolverState): SolverState {
    const updatedGainTable = SolverUtils.cloneGainsTable(solverState);
    for (const row of updatedGainTable) {
      row.push([0, 0]);
    }
    return {
      ...solverState,
      gainsTable: updatedGainTable,
    };
  }
  public static removeColumn(
    solverState: SolverState,
    index: number
  ): SolverState {
    const updatedGainTable = SolverUtils.cloneGainsTable(solverState);
    for (const row of updatedGainTable) {
      row.splice(index, 1);
    }
    return {
      ...solverState,
      gainsTable: updatedGainTable,
    };
  }

  public static addRow(solverState: SolverState): SolverState {
    const updatedGainTable = SolverUtils.cloneGainsTable(solverState);
    updatedGainTable.push(updatedGainTable[0].map(() => [0, 0]));
    return {
      ...solverState,
      gainsTable: updatedGainTable,
    };
  }
  public static removeRow(
    solverState: SolverState,
    index: number
  ): SolverState {
    const updatedGainTable = SolverUtils.cloneGainsTable(solverState);
    updatedGainTable.splice(index, 1);
    return {
      ...solverState,
      gainsTable: updatedGainTable,
    };
  }
}
