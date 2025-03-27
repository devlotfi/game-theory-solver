def strategie_strictement_dominante(table_gains, joueur):
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


def strategie_faiblement_dominante(table_gains, joueur):
    """Retourne les indices des stratégies faiblement dominantes pour un joueur donné."""
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