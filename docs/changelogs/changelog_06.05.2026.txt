feat(auth + dashboard + interventions): ajout du système d'authentification et refonte sidebar/dashboard

Authentification

* Installation de bcryptjs pour le hash des mots de passe
* Création du modèle User avec rôle ADMIN / USER
* Ajout des migrations Prisma
* Mise en place d’un script de seed
* Création d’un script de création d’utilisateur (createUser.mjs)
* Implémentation du handler IPC d’authentification
* Création du store auth (auth.store.ts)
* Blocage de l’application si utilisateur non authentifié

Utilisateurs

* Création initiale de la page ManageUsersPage (supprimée ensuite au profit du dashboard)
* Mise en place d’une sécurisation minimale basée sur les rôles

Interface utilisateur / Sidebar

* Suppression de l’avatar dans le header
* Ajout d’un avatar interactif dans la sidebar
* Refonte du menu dropdown utilisateur
* Uniformisation du style en light et dark mode
* Amélioration des interactions et transitions

Dashboard Admin

* Suppression des pages ManageUsersPage et RemoteQueryPage
* Suppression des boutons associés dans la sidebar
* Remplacement par un accès unique vers un dashboard admin
* Préparation de la structure pour les futures fonctionnalités

Interventions

* Ajout du champ createdBy (relation avec User)
* Correction du flux de création d’intervention
* Ajout de loadInterventions après création pour mise à jour automatique sans reload

Divers

* Nettoyage global du code
* Amélioration de la cohérence entre stores, IPC et interface
