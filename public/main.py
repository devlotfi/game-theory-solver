def trouver_strategies_strictement_dominantes(table_gains, joueur):
    nb_strategies = len(table_gains)  # Nombre de stratégies du joueur 1
    nb_strategies_autre = len(table_gains[0])  # Nombre de stratégies du joueur 2

    dominantes = []
    for i in range(nb_strategies):
        domine_toutes = True
        for j in range(nb_strategies):
            if i != j:
                if any(table_gains[i][k][joueur] <= table_gains[j][k][joueur] for k in range(nb_strategies_autre)):
                    domine_toutes = False
                    break
        if domine_toutes:
            dominantes.append(i)
    
    return dominantes


def trouver_strategies_faiblement_dominantes(table_gains, joueur):
    nb_strategies = len(table_gains)
    nb_strategies_autre = len(table_gains[0])
    
    faiblement_dominantes = []
    for i in range(nb_strategies):
        domine_ou_egale_toutes = True
        domine_au_moins_une = False
        for j in range(nb_strategies):
            if i != j:
                if any(table_gains[i][k][joueur] < table_gains[j][k][joueur] for k in range(nb_strategies_autre)):
                    domine_ou_egale_toutes = False
                    break
                if any(table_gains[i][k][joueur] > table_gains[j][k][joueur] for k in range(nb_strategies_autre)):
                    domine_au_moins_une = True
        if domine_ou_egale_toutes and domine_au_moins_une:
            faiblement_dominantes.append(i)

    return faiblement_dominantes

def eliminer_strategie_fortement_dominee(table_gains, joueur):
    nb_strategies = len(table_gains)
    nb_strategies_autre = len(table_gains[0])
    
    for i in range(nb_strategies):
        for j in range(nb_strategies):
            if i != j:
                strictement_dominee = all(
                    table_gains[i][k][joueur] < table_gains[j][k][joueur] for k in range(nb_strategies_autre)
                )
                if strictement_dominee:
                    return i  # Retourne l'index à éliminer

    return None  # Aucune stratégie fortement dominée trouvée


def eliminer_strategie_faiblement_dominee(table_gains, joueur):
    nb_strategies = len(table_gains)
    nb_strategies_autre = len(table_gains[0])
    
    for i in range(nb_strategies):
        for j in range(nb_strategies):
            if i != j:
                domine_partout = all(
                    table_gains[i][k][joueur] <= table_gains[j][k][joueur] for k in range(nb_strategies_autre)
                )
                au_moins_une_stricte = any(
                    table_gains[i][k][joueur] < table_gains[j][k][joueur] for k in range(nb_strategies_autre)
                )

                if domine_partout and au_moins_une_stricte:
                    return i  # Retourne l'index à éliminer

    return None  # Aucune stratégie faiblement dominée trouvée

def trouver_equilibres_nash(table_gains):
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