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
    resetIntervention()     // ⬅️ IMPORTANT
    selectFranchise(f)
    setPage("home")
  }

  const handleSelectSite = (s) => {
    resetIntervention()     // ⬅️ IMPORTANT
    selectSite(s)
    setPage("home")
  }

  return (
    <aside
      className="
        w-64 h-full
        flex flex-col
        p-4
        bg-[rgba(37,37,65,0.4)]
        backdrop-blur-xl
        border-r border-[rgba(255,255,255,0.1)]
        shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]
        text-[#f5f5f7]
        overflow-hidden
      "
    >
      {/* Bouton principal */}
      <button
        className="
          w-full px-3 py-2 rounded-lg text-left
          bg-[rgba(37,37,65,0.6)]
          hover:bg-[rgba(45,45,74,0.6)]
          border border-[rgba(255,255,255,0.05)]
        "
        onClick={() => setOpen(!open)}
      >
        Franchises
      </button>

      {/* ZONE SCROLLABLE */}
      <div className="flex-1 overflow-y-auto mt-3 pr-1">
        {open && (
          <div className="flex flex-col gap-2 pl-2">
            {franchises.map(f => {
              const sitesForFranchise = sites.filter(s => s.franchiseId === f.id)

              return (
                <div key={f.id}>
                  {/* Franchise */}
                  <button
                    className={`
                      w-full text-left px-2 py-1 rounded
                      hover:text-[#8b5cf6]
                      ${selectedFranchise?.id === f.id ? "text-[#8b5cf6]" : ""}
                    `}
                    onClick={() => handleSelectFranchise(f)}
                  >
                    {f.name}
                  </button>

                  {/* Sites */}
                  {selectedFranchise?.id === f.id && (
                    <div className="pl-4 flex flex-col gap-1">
                      {sitesForFranchise.map(site => (
                        <button
                          key={site.id}
                          className={`
                            w-full text-left px-2 py-1 rounded
                            hover:text-[#6366f1]
                            ${selectedSite?.id === site.id ? "text-[#6366f1]" : ""}
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
            bg-[rgba(37,37,65,0.6)]
            hover:bg-[rgba(45,45,74,0.6)]
            border border-[rgba(255,255,255,0.05)]
          "
          onClick={() => setPage("create")}
        >
          ➕ Créer une entrée
        </button>

        <button
          className="
            w-full px-3 py-2 rounded-lg text-left
            bg-[rgba(37,37,65,0.6)]
            hover:bg-[rgba(45,45,74,0.6)]
            border border-[rgba(255,255,255,0.05)]
          "
          onClick={() => setPage("manage")}
        >
          ⚙️ Gérer les entrées
        </button>
      </div>
    </aside>
  )
}
