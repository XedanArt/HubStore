import { useEffect } from "react"
import { useFranchiseStore } from "../store/franchise.store"
import { useUIStore } from "../store/ui.store"
import { useInterventionStore } from "../store/intervention.store"

import CreateEntryPage from "../views/create/CreateEntryPage"
import HomePage from "../views/home/HomePage"
import SitePage from "../views/site/SitePage"
import InterventionPage from "../views/intervention/InterventionPage"

export default function MainView() {
  const { selectedFranchise, selectedSite } = useFranchiseStore()
  const activeView = useUIStore(s => s.activeView)

  const { loadInterventions, selectedIntervention } = useInterventionStore()

  useEffect(() => {
    if (selectedSite) {
      loadInterventions()
    }
  }, [selectedSite])

  return (
    <main
      className="
        flex-1 p-6
        text-text-primary
        bg-bg-primary
        overflow-y-auto
      "
    >
      {/* PAGE : CRÉER */}
      {activeView === "create" && <CreateEntryPage key={activeView} />}

      {/* PAGE : GÉRER */}
      {activeView === "manage" && (
        <div>
          <h1 className="text-2xl font-semibold mb-4">
            Gérer les entrées
          </h1>
          <p className="text-text-secondary">
            Gestion des franchises, sites et interventions.
          </p>
        </div>
      )}

      {/* PAGE : HOME */}
      {activeView === "home" && (
        <>
          {selectedIntervention && (
            <InterventionPage intervention={selectedIntervention} />
          )}

          {!selectedFranchise && !selectedIntervention && <HomePage />}

          {selectedFranchise && !selectedSite && !selectedIntervention && (
            <div
              className="
                p-6 rounded-xl

                bg-surface-base
                border border-border-base

                backdrop-blur-xl
                [html.theme-dark_&]:backdrop-blur-none
              "
            >
              <h1 className="text-2xl font-semibold mb-2">
                Franchise : {selectedFranchise.name}
              </h1>

              <p className="text-text-secondary">
                Sélectionnez un site dans la sidebar pour afficher les interventions.
              </p>
            </div>
          )}

          {selectedSite && !selectedIntervention && (
            <SitePage site={selectedSite} franchise={selectedFranchise} />
          )}
        </>
      )}
    </main>
  )
}
