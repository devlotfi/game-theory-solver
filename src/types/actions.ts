import { Players } from "./players";

export enum Actions {
  STRICTLY_DOMINANT_STRATEGIES = "STRICTLY_DOMINANT_STRATEGIES",
  WEAKLY_DOMINANT_STRATEGIES = "WEAKLY_DOMINANT_STRATEGIES",
  ELIMINATE_STRICTLY_DOMINATED_STRATEGY = "ELIMINATE_STRICTLY_DOMINATED_STRATEGY",
  ELIMINATE_WEAKLY_DOMINATED_STRATEGY = "ELIMINATE_WEAKLY_DOMINATED_STRATEGY",
  NASH_EQUILIBRIA = "NASH_EQUILIBRIA",
  PARETO_OPTIMUM = "PARETO_OPTIMUM",
}

export type ActionPlayload =
  | {
      actionType: Actions.STRICTLY_DOMINANT_STRATEGIES;
      player: Players;
    }
  | {
      actionType: Actions.WEAKLY_DOMINANT_STRATEGIES;
      player: Players;
    }
  | {
      actionType: Actions.ELIMINATE_STRICTLY_DOMINATED_STRATEGY;
      player: Players;
    }
  | {
      actionType: Actions.ELIMINATE_WEAKLY_DOMINATED_STRATEGY;
      player: Players;
    }
  | {
      actionType: Actions.NASH_EQUILIBRIA;
    }
  | {
      actionType: Actions.PARETO_OPTIMUM;
    };
