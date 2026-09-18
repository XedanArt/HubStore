# Changelog — Stabilisation & Corrections Techniques de l’Application

## global.d.ts
- Problème : window.hubstore non reconnu par TypeScript → erreurs dans tous les services.
- Résolution :
  - Création du fichier global.d.ts avec les types globaux.
  - Ajout de src/renderer/global.d.ts dans tsconfig.json → include.
  - Ajout de ignoreDeprecations: "6.0" pour conserver baseUrl + paths.

## tsconfig.json
- Ajout de :
  - ignoreDeprecations: "6.0"
  - baseUrl + paths pour @/*
  - Inclusion explicite de src/renderer/global.d.ts

## franchise.store.ts
- Problème : getFranchises() renvoyait { success, data } → le store stockait un objet → .filter() plantait dans les composants.
- Résolution :
  - Extraction correcte de res.data.
  - Store stabilisé et typé.

## site.store.ts
- Problème : getSites() renvoyait { success, data } → sites devenait un objet → crash dans Sidebar (.filter is not a function).
- Résolution :
  - Extraction correcte de res.data.
  - sites garanti comme tableau.
  - Correction du crash critique → disparition de la page blanche.

## intervention.store.ts
- Ajout des méthodes :
  - updateIntervention(id, data)
  - resolveIntervention(id)
- Mise à jour optimiste + synchronisation avec la base.
- Correction du flux complet pour que les modifications persistent après reload.

## Sidebar.tsx
- Problème : Crash global → .filter is not a function sur sites.filter(...).
- Résolution :
  - Correction du store sites.
  - Sécurisation possible via Array.isArray(sites).
- Problème : Les nouveaux sites n’apparaissaient pas sans recharger la page.
- Résolution :
  - Nécessité d’appeler loadSites() après création ou via un bouton “Actualiser”.

## Header
- Ajout du bouton Actualiser permettant de recharger les données globales.
- Problème : L’actualisation ne mettait à jour que les franchises et interventions → les nouveaux sites n’apparaissaient pas sans rechargement manuel.
- Résolution :
  - Import de loadSites() depuis site.store.ts.
  - Mise à jour de la fonction refreshAll() pour inclure :
    - loadFranchises()
    - loadSites()
    - loadInterventions()
  - Reset automatique de la sélection (resetSelection) et de l’intervention active (resetIntervention) après actualisation.
- Résultat : les sites nouvellement créés apparaissent immédiatement dans la Sidebar sans rechargement de la page.

## CreateSiteForm.tsx
- Problème : Sites créés sans franchiseId → sites orphelins → invisibles dans Sidebar.
- Résolution :
  - Ajout correct de franchiseId: Number(franchiseId) dans le payload.
  - Vérification du formulaire → OK.

## Base de données (Prisma)
- Confirmation que le schéma utilise déjà onDelete: Cascade :
  - La suppression d’un site supprime automatiquement les interventions associées.
- Nettoyage des anciens sites orphelins (créés avant la correction).

## Services (IPC)
### franchise.service.ts / site.service.ts / intervention.service.ts
- Problème : Les services renvoyaient des objets { success, data } non traités correctement par les stores.
- Résolution :
  - Stores mis à jour pour extraire res.data.
  - Services validés et typés.
# preload.ts
- Ajout de :
  - updateIntervention(id, data) → expose l’IPC db:updateIntervention.
# Backend (IPC / Prisma)
- Ajout du handler :
  - "db:updateIntervention" → mise à jour d’une intervention dans la base.
- Correction du flux complet pour la résolution et l’édition.

# HomePage
- Correction indirecte :
  - Page blanche résolue grâce à la stabilisation des stores.
  - Affichage stable des interventions et sites.