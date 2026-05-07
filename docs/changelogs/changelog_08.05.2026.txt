- Repassage en mode dev => suppression des config. prod
  - impossible de lancer l'appli en prod via le setup ou l'exe

- Création d'un DotEnv à la racine pour fixer le chemin de la BDD
  - modification du schema.prisma en conséquence (DATABASE_URL)

- Réparation dbhandlers, auth.ts, etc.
- Environnement de dev remis en état
- Reprise de l'UI
- Ajout d'un bouton refresh (logique à mettre en place)