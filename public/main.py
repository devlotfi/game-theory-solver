from typing import Literal


def trouver_strategie_strictement_dominante(
    table_gains: list[list[tuple[int, int]]], joueur: Literal[0, 1]
) -> int | None:
    nb_strategies = len(table_gains) if joueur == 0 else len(table_gains[0])

    for index_strategie in range(nb_strategies):
        strictement_dominante = True
        for autre_strategie in range(nb_strategies):
            if index_strategie == autre_strategie:
                continue
            for index_strategie_autre in range(
                len(table_gains[0]) if joueur == 0 else len(table_gains)
            ):
                gain_courant = (
                    table_gains[index_strategie][index_strategie_autre][joueur]
                    if joueur == 0
                    else table_gains[index_strategie_autre][index_strategie][joueur]
                )
                gain_autre = (
                    table_gains[autre_strategie][index_strategie_autre][joueur]
                    if joueur == 0
                    else table_gains[index_strategie_autre][autre_strategie][joueur]
                )
                if gain_courant <= gain_autre:
                    strictement_dominante = False
                    break
            if not strictement_dominante:
                break
        if strictement_dominante:
            return index_strategie  # Retourne l'index de la stratégie strictement dominante

    return None  # Aucune stratégie strictement dominante trouvée


def trouver_premiere_dominance_stricte(
    table_gains: list[list[tuple[int, int]]], joueur: Literal[0, 1]
) -> int | None:
    nb_strategies = len(table_gains) if joueur == 0 else len(table_gains[0])

    for i in range(nb_strategies):  # Parcours des stratégies possibles
        for j in range(nb_strategies):  # Comparaison avec une autre stratégie
            if i == j:
                continue  # Une stratégie ne peut pas se dominer elle-même

            strictement_dominante = True

            for k in range(len(table_gains[0]) if joueur == 0 else len(table_gains)):
                gain_i = (
                    table_gains[i][k][joueur]
                    if joueur == 0
                    else table_gains[k][i][joueur]
                )
                gain_j = (
                    table_gains[j][k][joueur]
                    if joueur == 0
                    else table_gains[k][j][joueur]
                )

                if gain_i <= gain_j:
                    strictement_dominante = False
                    break  # Dès qu'on trouve une exception, on arrête

            if strictement_dominante:
                return j  # i domine strictement j

    return None  # Aucune domination stricte trouvée


def trouver_equilibres_nash(table_gains: list[list[tuple[int, int]]]):
    nb_strategies_j1 = len(table_gains)
    nb_strategies_j2 = len(table_gains[0])
    equilibres = []

    for i in range(nb_strategies_j1):  # Stratégie du joueur 1
        for j in range(nb_strategies_j2):  # Stratégie du joueur 2
            gain_j1 = table_gains[i][j][0]
            gain_j2 = table_gains[i][j][1]

            meilleure_reponse_j1 = all(
                gain_j1 >= table_gains[x][j][0] for x in range(nb_strategies_j1)
            )
            meilleure_reponse_j2 = all(
                gain_j2 >= table_gains[i][y][1] for y in range(nb_strategies_j2)
            )

            if meilleure_reponse_j1 and meilleure_reponse_j2:
                equilibres.append((i, j))

    return equilibres
