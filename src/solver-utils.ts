import { PyodideInterface } from "pyodide";
import { SolverState } from "./context/solver-context";
import { GainsTable } from "./types/gains-table";
import { Players } from "./types/players";
import { Strategy } from "./types/strategy";
import { Actions } from "./types/actions";

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

  public static cellCoordsToString(coords: [number, number]) {
    return `[${coords[0]},${coords[1]}]`;
  }

  public static clearAction(solverState: SolverState): SolverState {
    return {
      ...solverState,
      action: null,
      highlightedPlayer1Strategies: new Set(),
      highlightedPlayer2Strategies: new Set(),
      highlightedCells: new Set(),
    };
  }

  public static findStrictlyDominantStrategies(
    solverState: SolverState,
    pyodide: PyodideInterface,
    player: Players
  ): SolverState {
    const trouver_strategies_strictement_dominantes = pyodide.globals.get(
      "trouver_strategies_strictement_dominantes"
    );
    const proxy = trouver_strategies_strictement_dominantes(
      solverState.gainsTable,
      player === Players.PLAYER_1 ? 0 : 1
    );
    const result: number[] = proxy.toJs();
    proxy.destroy();

    return {
      ...solverState,
      action: {
        actionType: Actions.STRICTLY_DOMINANT_STRATEGIES,
        player,
      },
      highlightedPlayer1Strategies:
        player === Players.PLAYER_1
          ? new Set(
              result.map((index) => solverState.player1Strategies[index].id)
            )
          : solverState.highlightedPlayer1Strategies,
      highlightedPlayer2Strategies:
        player === Players.PLAYER_2
          ? new Set(
              result.map((index) => solverState.player2Strategies[index].id)
            )
          : solverState.highlightedPlayer2Strategies,
    };
  }

  public static findWeaklyDominantStrategies(
    solverState: SolverState,
    pyodide: PyodideInterface,
    player: Players
  ): SolverState {
    const trouver_strategies_faiblement_dominantes = pyodide.globals.get(
      "trouver_strategies_faiblement_dominantes"
    );
    const proxy = trouver_strategies_faiblement_dominantes(
      solverState.gainsTable,
      player === Players.PLAYER_1 ? 0 : 1
    );
    const result: number[] = proxy.toJs();
    proxy.destroy();

    return {
      ...solverState,
      action: {
        actionType: Actions.WEAKLY_DOMINANT_STRATEGIES,
        player,
      },
      highlightedPlayer1Strategies:
        player === Players.PLAYER_1
          ? new Set(
              result.map((index) => solverState.player1Strategies[index].id)
            )
          : solverState.highlightedPlayer1Strategies,
      highlightedPlayer2Strategies:
        player === Players.PLAYER_2
          ? new Set(
              result.map((index) => solverState.player2Strategies[index].id)
            )
          : solverState.highlightedPlayer2Strategies,
    };
  }

  public static findNashEquilibria(
    solverState: SolverState,
    pyodide: PyodideInterface
  ): SolverState {
    const trouver_equilibres_nash = pyodide.globals.get(
      "trouver_equilibres_nash"
    );
    const proxy = trouver_equilibres_nash(solverState.gainsTable);
    const result: [number, number][] = proxy.toJs();
    proxy.destroy();
    console.log(result);

    return {
      ...solverState,
      action: {
        actionType: Actions.NASH_EQUILIBRIA,
      },
      highlightedCells: new Set(
        result.map((coords) => SolverUtils.cellCoordsToString(coords))
      ),
    };
  }
}
