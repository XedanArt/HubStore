import { useState } from "react"
import { useFranchiseStore } from "../store/franchise.store"
import { useSiteStore } from "../store/site.store"
import { useUIStore } from "../store/ui.store"
import { useInterventionStore } from "../store/intervention.store"

export default function Sidebar() {
  const {
    franchises,
    selectedFranchise,
    selectedSite,
    selectFranchise,
    selectSite
  } = useFranchiseStore()

  const { resetIntervention } = useInterventionStore()
  const { sites } = useSiteStore()
  const [open, setOpen] = useState(false)
  const setPage = useUIStore(s => s.setPage)

  const handleSelectFranchise = (f) => {
  resetIntervention()

  if (selectedFranchise?.id === f.id) {
    // toggle OFF (fermer)
    selectFranchise(null)
  } else {
    // toggle ON (ouvrir)
    selectFranchise(f)
  }
  setPage("home")
} 

  const handleSelectSite = (s) => {
    resetIntervention()
    selectSite(s)
    setPage("home")
  }

  return (
    <aside
      className="
        w-64 h-full
        flex flex-col
        p-4

        bg-surface-base
        border-r border-border-base

        text-text-primary

        backdrop-blur-xl
        [html.theme-dark_&]:backdrop-blur-none

        overflow-hidden
      "
    >
      {/* Bouton principal */}
      <button
        className="
          w-full px-3 py-2 rounded-lg text-left

          bg-surface-base
          border border-border-base

          shadow-sm 
          hover:shadow-lg
          hover:-translate-y-1 transform 

          hover:bg-surface-hover
          transition
        "
        onClick={() => setOpen(!open)}
      >
        Franchises
      </button>

      {/* ZONE SCROLLABLE */}
      <div className="flex-1 overflow-y-auto mt-3 pr-1">
        {open && (
          <div
            className="
              border border-border-base
              rounded-lg
              overflow-hidden
              divide-y divide-border-base
            "
          >
            {franchises.map(f => {
              const sitesForFranchise = sites.filter(
                s => s.franchiseId === f.id
              )

              return (
                <div key={f.id}>
                  {/* Franchise */}
                  <button
                    className={`
                      w-full text-left px-3 py-2
                      transition

                      bg-surface-base
                      hover:bg-surface-hover

                      ${
                        selectedFranchise?.id === f.id
                          ? "text-accent-primary bg-surface-hover border-l-2 border-accent-primary"
                          : "text-text-primary"
                      }
                    `}
                    onClick={() => handleSelectFranchise(f)}
                  >
                    {f.name}
                  </button>

                  {/* Sites */}
                  {selectedFranchise?.id === f.id && (
                    <div className="bg-bg-secondary border-t border-border-base relative pl-3">
                      {sitesForFranchise.map(site => (
                        <button
                          key={site.id}
                          className={`
                            w-full text-left pl-8 pr-3 py-2 text-sm
                            transition

                            bg-bg-secondary
                            hover:bg-surface-hover

                            ${
                              selectedSite?.id === site.id
                                ? "text-accent-secondary bg-surface-hover border-l-2 border-accent-secondary"
                                : "text-text-secondary"
                            }
                          `}
                          onClick={() => handleSelectSite(site)}
                        >
                          {site.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Boutons du bas */}
      <div className="mt-auto flex flex-col gap-2 pt-2">
        <button
          className="
            w-full px-3 py-2 rounded-lg text-left

            bg-surface-base
            border border-border-base

            shadow-sm 
            hover:shadow-lg
            hover:-translate-y-1 transform

            hover:bg-surface-hover
            transition
          "
          onClick={() => setPage("create")}
        >
          ➕ Créer une entrée
        </button>

        <button
          className="
            w-full px-3 py-2 rounded-lg text-left

            bg-surface-base
            border border-border-base

            shadow-sm 
            hover:shadow-lg
            hover:-translate-y-1 transform
            
            hover:bg-surface-hover
            transition
          "
          onClick={() => setPage("manage")}
        >
          ⚙️ Gérer les entrées
        </button>
      </div>
    </aside>
  )
}
