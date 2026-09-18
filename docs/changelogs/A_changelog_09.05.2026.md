Dashboard
- Refonte des 4 boutons principaux :
  - Gérer les utilisateurs
  - Franchises & Sites
  - Interventions
  - Logs

- Ajout des 4 pages dédiées dans views/dashboard/ :
  - UsersPage.tsx
  - ManagePage.tsx
  - InterventionsPage.tsx
  - LogsPage.tsx

UI Store
- Mise à jour de ui.store.ts pour intégrer les nouvelles vues :
  - users
  - manage
  - interventions
  - logs

MainView
- Refonte complète du routing interne via un switch centralisé
  - Import des nouvelles pages Dashboard
  - Nettoyage et clarification de la logique d’affichage
  - Conservation de la logique avancée de la vue home