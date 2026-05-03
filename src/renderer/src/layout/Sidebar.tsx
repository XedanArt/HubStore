import { useState } from "react"
import { useFranchiseStore } from "../store/franchise.store"
import { useUIStore } from "../store/ui.store"

export default function Sidebar() {
  const {
    franchises,
    selectedFranchise,
    selectedSite,
    selectFranchise,
    selectSite
  } = useFranchiseStore()

  const [open, setOpen] = useState(false)

  // Correction : setPage au lieu de setView
  const setPage = useUIStore(s => s.setPage)

  return (
    <aside
      className="
        w-64 h-full p-4
        bg-[rgba(37,37,65,0.4)]
        backdrop-blur-xl
        border-r border-[rgba(255,255,255,0.1)]
        shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]
        text-[#f5f5f7]
        flex flex-col gap-4
      "
    >
      {/* Bouton principal */}
      <button
        className="
          w-full px-3 py-2 rounded-lg text-left
          bg-[rgba(37,37,65,0.6)]
          hover:bg-[rgba(45,45,74,0.6)]
          active:bg-[rgba(53,53,96,0.6)]
          border border-[rgba(255,255,255,0.05)]
          text-[#f5f5f7]
        "
        onClick={() => setOpen(!open)}
      >
        Franchises
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="flex flex-col gap-2 pl-2">
          {franchises.map(f => (
            <div key={f.id}>
              {/* Franchise */}
              <button
                className={`
                  w-full text-left px-2 py-1 rounded
                  text-[#f5f5f7]
                  hover:text-[#8b5cf6]
                  ${selectedFranchise === f.name ? "text-[#8b5cf6]" : ""}
                `}
                onClick={() => selectFranchise(f.name)}
              >
                {f.name}
              </button>

              {/* Villes */}
              {selectedFranchise === f.name && (
                <div className="pl-4 flex flex-col gap-1">
                  {f.cities.map(site => (
                    <button
                      key={site}
                      className={`
                        w-full text-left px-2 py-1 rounded
                        text-[#f5f5f7]
                        hover:text-[#6366f1]
                        ${selectedSite === site ? "text-[#6366f1]" : ""}
                      `}
                      onClick={() => selectSite(site)}
                    >
                      {site}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Boutons en bas */}
      <div className="mt-auto flex flex-col gap-2">
        {/* Créer une entrée */}
        <button
          className="
            w-full px-3 py-2 rounded-lg text-left
            bg-[rgba(37,37,65,0.6)]
            hover:bg-[rgba(45,45,74,0.6)]
            active:bg-[rgba(53,53,96,0.6)]
            border border-[rgba(255,255,255,0.05)]
            text-[#f5f5f7]
          "
          onClick={() => setPage("create")}
        >
          ➕ Créer une entrée
        </button>

        {/* Gérer les entrées */}
        <button
          className="
            w-full px-3 py-2 rounded-lg text-left
            bg-[rgba(37,37,65,0.6)]
            hover:bg-[rgba(45,45,74,0.6)]
            active:bg-[rgba(53,53,96,0.6)]
            border border-[rgba(255,255,255,0.05)]
            text-[#f5f5f7]
          "
          onClick={() => setPage("manage")}
        >
          ⚙️ Gérer les entrées
        </button>
      </div>
    </aside>
  )
}
