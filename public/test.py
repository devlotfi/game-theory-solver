from typing import Literal

tg1 = [
    [
        [-5, -5],
        [0, -10],
    ],
    [
        [-10, 0],
        [-1, -1],
    ],
]

tg2 = [
    [
        [4, 3],
        [5, 1],
        [6, 2],
    ],
    [
        [2, 1],
        [8, 4],
        [3, 6],
    ],
    [
        [3, 0],
        [9, 6],
        [2, 8],
    ],
]

tg3 = [
    [
        [3, 3],
        [0, 5],
    ],
    [
        [5, 0],
        [1, 1],
    ],
]

tg5 = [[[3, 2], [2, 1], [4, 3]], [[3, 3], [1, 2], [4, 3]], [[2, 2], [3, 3], [4, 4]]]


def trouver_strategies_strictement_dominantes_old(
    table_gains: list[list[tuple[int, int]]], joueur: Literal[0, 1]
):
    nb_strategies_joueur_1 = len(table_gains)
    nb_strategies_joueur_2 = len(table_gains[0])
    index_strategie_dominante = None

    if joueur == 0:
        for index_joueur_2 in range(nb_strategies_joueur_2):
            print("j2: ", index_joueur_2)
            max_gain_joueur_1 = table_gains[0][index_joueur_2][0]
            index_strategie_dominante_local = 0

            for index_joueur_1 in range(nb_strategies_joueur_1):
                print("j1: ", index_joueur_1)
                gains = table_gains[index_joueur_1][index_joueur_2]
                print(gains)
                if gains[0] > max_gain_joueur_1:
                    max_gain_joueur_1 = gains[0]
                    index_strategie_dominante_local = index_joueur_1

            if index_strategie_dominante == None:
                index_strategie_dominante = index_strategie_dominante_local
            elif index_strategie_dominante != index_strategie_dominante_local:
                return None
    else:
        for index_joueur_1 in range(nb_strategies_joueur_1):
            print("j1: ", index_joueur_1)
            max_gain_joueur_2 = table_gains[index_joueur_1][0][1]
            index_strategie_dominante_local = 0

            for index_joueur_2 in range(nb_strategies_joueur_2):
                print("j2: ", index_joueur_2)
                gains = table_gains[index_joueur_1][index_joueur_2]
                print(gains)
                if gains[1] > max_gain_joueur_2:
                    max_gain_joueur_2 = gains[1]
                    index_strategie_dominante_local = index_joueur_2

            if index_strategie_dominante == None:
                index_strategie_dominante = index_strategie_dominante_local
            elif index_strategie_dominante != index_strategie_dominante_local:
                return None

    return index_strategie_dominante


def trouver_strategie_strictement_dominante(
    table_gains: list[list[tuple[int, int]]], joueur: Literal[0, 1]
):
    nb_strategies = len(table_gains) if joueur == 0 else len(table_gains[0])
    nb_strategies_autre = len(table_gains) if joueur == 1 else len(table_gains[0])
    index_strategie_dominante = None

    for index_strategie_autre in range(nb_strategies_autre):
        print("j2: ", index_strategie_autre)
        max_gain = (
            table_gains[0][index_strategie_autre][joueur]
            if joueur == 0
            else table_gains[index_strategie_autre][0][joueur]
        )
        index_strategie_dominante_local = 0

        for index_strategie in range(nb_strategies):
            print("j1: ", index_strategie)
            gains = (
                table_gains[index_strategie][index_strategie_autre]
                if joueur == 0
                else table_gains[index_strategie_autre][index_strategie]
            )
            print(gains)
            if gains[joueur] > max_gain:
                max_gain = gains[joueur]
                index_strategie_dominante_local = index_strategie

        if index_strategie_dominante == None:
            index_strategie_dominante = index_strategie_dominante_local
        elif index_strategie_dominante != index_strategie_dominante_local:
            return None

    return index_strategie_dominante


print(trouver_strategie_strictement_dominante(tg5, 1), "result")
