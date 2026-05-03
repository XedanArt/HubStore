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

  // Charger les interventions quand un site est sélectionné
  useEffect(() => {
    if (selectedSite) {
      loadInterventions()
    }
  }, [selectedSite])

  return (
    <main
      className="
        flex-1 p-6
        text-[#f5f5f7]
        overflow-y-auto
      "
    >
      {/* PAGE : CRÉER UNE ENTRÉE */}
      {activeView === "create" && <CreateEntryPage key={activeView} />}

      {/* PAGE : GÉRER */}
      {activeView === "manage" && (
        <div>
          <h1 className="text-2xl font-semibold mb-4">Gérer les entrées</h1>
          <p className="text-[#a8a8b8]">
            Gestion des franchises, sites et interventions.
          </p>
        </div>
      )}

      {/* PAGE : ACCUEIL */}
      {activeView === "home" && (
        <>
          {/* Intervention sélectionnée */}
          {selectedIntervention && (
            <InterventionPage intervention={selectedIntervention} />
          )}

          {/* Aucune franchise sélectionnée */}
          {!selectedFranchise && !selectedIntervention && <HomePage />}

          {/* Franchise sélectionnée mais pas de site */}
          {selectedFranchise && !selectedSite && !selectedIntervention && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">
                Franchise : {selectedFranchise.name}
              </h1>
              <p className="text-[#a8a8b8]">
                Sélectionnez un site dans la sidebar.
              </p>
            </div>
          )}

          {/* Site sélectionné */}
          {selectedSite && !selectedIntervention && (
            <SitePage site={selectedSite} franchise={selectedFranchise} />
          )}
        </>
      )}
    </main>
  )
}
