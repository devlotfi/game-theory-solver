from typing import Literal


def trouver_strategie_strictement_dominante(
    table_gains: list[list[tuple[int, int]]], joueur: Literal[0, 1]
) -> int | None:
    nb_strategies = len(table_gains) if joueur == 0 else len(table_gains[0])
    nb_strategies_adversaire = len(table_gains[0]) if joueur == 0 else len(table_gains)

    meilleures_strategies = []

    for strat_adv in range(nb_strategies_adversaire):
        meilleur_gain = float("-inf")
        meilleure_strategie = None
        egalite = False

        for strat_joueur in range(nb_strategies):
            gain = (
                table_gains[strat_joueur][strat_adv][joueur]
                if joueur == 0
                else table_gains[strat_adv][strat_joueur][joueur]
            )

            if gain > meilleur_gain:
                meilleur_gain = gain
                meilleure_strategie = strat_joueur
                egalite = False
            elif gain == meilleur_gain:
                egalite = True

        if egalite:
            meilleures_strategies.append(None)  # Pas de stratégie strictement meilleure
        else:
            meilleures_strategies.append(meilleure_strategie)

    # Vérifier s’il y a une seule stratégie strictement meilleure pour tous les cas
    candidats = [s for s in meilleures_strategies if s is not None]
    if len(candidats) == nb_strategies_adversaire and all(
        s == candidats[0] for s in candidats
    ):
        return candidats[0]

    return None


def trouver_strategie_faiblement_dominante(
    table_gains: list[list[tuple[int, int]]], joueur: Literal[0, 1]
) -> int | None:
    nb_strategies = len(table_gains) if joueur == 0 else len(table_gains[0])
    nb_strategies_adversaire = len(table_gains[0]) if joueur == 0 else len(table_gains)

    meilleures_strategies = []

    for strat_adv in range(nb_strategies_adversaire):
        meilleur_gain = float("-inf")
        strategies_meilleures = []

        for strat_joueur in range(nb_strategies):
            gain = (
                table_gains[strat_joueur][strat_adv][joueur]
                if joueur == 0
                else table_gains[strat_adv][strat_joueur][joueur]
            )

            if gain > meilleur_gain:
                meilleur_gain = gain
                strategies_meilleures = [strat_joueur]
            elif gain == meilleur_gain:
                strategies_meilleures.append(strat_joueur)

        meilleures_strategies.append(set(strategies_meilleures))

    # Intersect all sets to find strategies that are best in every case
    intersection = set.intersection(*meilleures_strategies)

    if len(intersection) == 1:
        return next(iter(intersection))

    return None


def trouver_premiere_strategie_strictement_dominee(
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


def trouver_premiere_strategie_faiblement_dominee(
    table_gains: list[list[tuple[int, int]]], joueur: Literal[0, 1]
) -> int | None:
    nb_strategies = len(table_gains) if joueur == 0 else len(table_gains[0])
    nb_strategies_adversaire = len(table_gains[0]) if joueur == 0 else len(table_gains)

    for i in range(nb_strategies):  # i = potentielle stratégie dominante
        for j in range(nb_strategies):  # j = potentielle stratégie dominée
            if i == j:
                continue

            faiblement_dominante = True
            strictement_superieure_quelque_part = False

            for k in range(nb_strategies_adversaire):
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

                if gain_i < gain_j:
                    faiblement_dominante = False
                    break
                elif gain_i > gain_j:
                    strictement_superieure_quelque_part = True

            if faiblement_dominante and strictement_superieure_quelque_part:
                return j  # j est faiblement dominée par i

    return None  # Aucune stratégie faiblement dominée trouvée


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


def trouver_optimums_pareto(
    table_gains: list[list[tuple[int, int]]],
) -> list[tuple[int, int]]:
    nb_strategies_j1 = len(table_gains)
    nb_strategies_j2 = len(table_gains[0])
    pareto_optima = []

    for i in range(nb_strategies_j1):
        for j in range(nb_strategies_j2):
            gain_ij = table_gains[i][j]
            est_domine = False

            for x in range(nb_strategies_j1):
                for y in range(nb_strategies_j2):
                    if (x, y) == (i, j):
                        continue

                    gain_xy = table_gains[x][y]

                    # Si (x, y) est au moins aussi bon pour les 2 joueurs, et strictement meilleur pour l'un d'eux
                    if (gain_xy[0] >= gain_ij[0] and gain_xy[1] >= gain_ij[1]) and (
                        gain_xy[0] > gain_ij[0] or gain_xy[1] > gain_ij[1]
                    ):
                        est_domine = True
                        break
                if est_domine:
                    break

            if not est_domine:
                pareto_optima.append((i, j))

    return pareto_optima


def niveau_de_securite(
    table_gains: list[list[tuple[int, int]]], joueur: Literal[0, 1]
) -> int:
    nb_strategies_j1 = len(table_gains)  # nombre de lignes
    nb_strategies_j2 = len(table_gains[0])  # nombre de colonnes
    if joueur == 0:
        pires_gains = []
        for i in range(nb_strategies_j1):
            pire_gain = min(table_gains[i][j][0] for j in range(nb_strategies_j2))
            pires_gains.append(pire_gain)
        return max(pires_gains)
    elif joueur == 1:
        pires_gains = []
        for j in range(nb_strategies_j2):
            pire_gain = min(table_gains[i][j][1] for i in range(nb_strategies_j1))
            pires_gains.append(pire_gain)
        return max(pires_gains)
