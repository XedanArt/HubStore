# Changelog

## SitePage
- Ajout d’une limite d’affichage de la description des interventions (`line-clamp-2`).
- Mise en place de badges de statut avec couleurs atténuées (glass morphism) :
  - **En cours** → jaune doux
  - **Résolue** → vert doux

## HomePage
- Application de `line-clamp-2` sur les descriptions pour éviter les débordements visuels.

## InterventionPage
- Ajout des actions **Modifier** et **Résoudre**.
- Le bouton **Modifier** n’apparaît plus si l’intervention est déjà résolue.
- Déplacement des boutons à l’intérieur de la card.
- Nouveau style glass pour les boutons (couleurs atténuées + blur).
- Mise en place du mode édition (textarea + bouton Enregistrer).

## intervention.store.ts
- Ajout des méthodes :
  - `updateIntervention(id, data)` → mise à jour d’une intervention.
  - `resolveIntervention(id)` → enregistrement de `resolvedAt`.
- Mise à jour optimiste dans le store + synchronisation avec la base.

## preload.ts
- Ajout de la méthode :
  - `updateIntervention(id, data)` → expose l’IPC `db:updateIntervention`.

## Backend (IPC / Prisma)
- Ajout du handler :
  - `"db:updateIntervention"` → mise à jour d’une intervention dans la base.
- Correction du flux complet pour que les modifications (résolution, édition) soient persistées après rechargement.
