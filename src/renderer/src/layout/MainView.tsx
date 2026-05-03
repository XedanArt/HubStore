import { useFranchiseStore } from "../store/franchise.store"
import { useUIStore } from "../store/ui.store"

import CreateEntryPage from "../views/create/CreateEntryPage"
import HomePage from "../views/home/HomePage"

export default function MainView() {
  const { selectedFranchise, selectedSite } = useFranchiseStore()
  const activeView = useUIStore(s => s.activeView)

  return (
    <main
      className="
        flex-1 p-6
        text-[#f5f5f7]
        overflow-y-auto
      "
    >
      {/* 1 — PAGE : ACCUEIL */}
      {activeView === "home" && (
        <>
          {/* Aucune franchise sélectionnée → vraie page d’accueil */}
          {!selectedFranchise && <HomePage />}

          {/* Franchise sélectionnée mais pas de site */}
          {selectedFranchise && !selectedSite && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">
                Franchise : {selectedFranchise}
              </h1>
              <p className="text-[#a8a8b8]">
                Sélectionnez un site dans la sidebar.
              </p>
            </div>
          )}

          {/* Site sélectionné */}
          {selectedSite && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">
                {selectedSite} — {selectedFranchise}
              </h1>

              <div
                className="
                  p-6 rounded-xl
                  bg-[rgba(37,37,65,0.6)]
                  backdrop-blur-xl
                  border border-[rgba(255,255,255,0.1)]
                  shadow-[0_0_20px_rgba(0,0,0,0.3)]
                "
              >
                <p className="text-[#f5f5f7]">
                  Liste des interventions à venir…
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* 2 — PAGE : CRÉER UNE ENTRÉE */}
      {activeView === "create" && <CreateEntryPage key={activeView} />}

      {/* 3 — PAGE : GÉRER LES ENTRÉES */}
      {activeView === "manage" && (
        <div>
          <h1 className="text-2xl font-semibold mb-4">Gérer les entrées</h1>
          <p className="text-[#a8a8b8]">
            Gestion des franchises, sites et interventions.
          </p>
        </div>
      )}
    </main>
  )
}
