import { useState } from "react"
import { useFranchiseStore } from "../store/franchise.store"
import { useSiteStore } from "../store/site.store"
import { useUIStore } from "../store/ui.store"
import { useInterventionStore } from "../store/intervention.store"

import CreateIcon from "../components/icons/CreateIcon"
import ManageIcon from "../components/icons/ManageIcon"
import ManageUserIcon from "../components/icons/ManageUserIcon"
import QueryIcon from "../components/icons/QueryIcon"

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

  const handleSelectFranchise = (f: any) => {
    resetIntervention()

    if (selectedFranchise?.id === f.id) {
      selectFranchise(null)
    } else {
      selectFranchise(f)
    }

    setPage("home")
  }

  const handleSelectSite = (s: any) => {
    resetIntervention()
    selectSite(s)
    setPage("home")
  }

  return (
    <aside
      className="
        w-64 h-full flex flex-col p-4
        bg-surface-base border-r border-border-base
        text-text-primary
        backdrop-blur-xl [html.theme-dark_&]:backdrop-blur-none
        overflow-hidden
      "
    >
      {/* Bouton principal */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full px-3 py-2 rounded-lg text-left
          bg-surface-base border border-border-base
          shadow-sm hover:shadow-lg
          hover:-translate-y-1 transform
          hover:bg-surface-hover
          transition
        "
      >
        Franchises
      </button>

      {/* Liste */}
      <div className="flex-1 overflow-y-auto mt-3 pr-1">
        {open && (
          <div className="border border-border-base rounded-lg overflow-hidden divide-y divide-border-base">
            {franchises.map(f => {
              const sitesForFranchise = sites.filter(
                s => s.franchiseId === f.id
              )

              return (
                <div key={f.id}>
                  {/* Franchise */}
                  <button
                    onClick={() => handleSelectFranchise(f)}
                    className={`
                      w-full text-left px-3 py-2 transition
                      bg-surface-base hover:bg-surface-hover
                      ${
                        selectedFranchise?.id === f.id
                          ? "text-accent-primary bg-surface-hover border-l-2 border-accent-primary"
                          : "text-text-primary"
                      }
                    `}
                  >
                    {f.name}
                  </button>

                  {/* Sites */}
                  {selectedFranchise?.id === f.id && (
                    <div className="bg-bg-secondary border-t border-border-base pl-4">
                      {sitesForFranchise.map(site => (
                        <button
                          key={site.id}
                          onClick={() => handleSelectSite(site)}
                          className={`
                            w-full text-left pl-6 pr-3 py-2 text-sm transition
                            hover:bg-surface-hover
                            ${
                              selectedSite?.id === site.id
                                ? "text-accent-secondary bg-surface-hover border-l-2 border-accent-secondary"
                                : "text-text-secondary"
                            }
                          `}
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

      {/* Boutons bas */}
      <div className="mt-auto flex flex-col gap-2 pt-2">

        {/* CREATE */}
        <button
          onClick={() => setPage("create")}
          className="
            group flex items-center gap-2
            w-full px-3 py-2 rounded-lg text-left
            bg-surface-base border border-border-base
            shadow-sm hover:shadow-lg
            hover:-translate-y-1 transform
            hover:bg-surface-hover
            transition
          "
        >
          <CreateIcon className="w-4 h-4 text-text-secondary group-hover:text-accent-primary transition" />
          Créer une entrée
        </button>

        {/* MANAGE */}
        <button
          onClick={() => setPage("manage")}
          className="
            group flex items-center gap-2
            w-full px-3 py-2 rounded-lg text-left
            bg-surface-base border border-border-base
            shadow-sm hover:shadow-lg
            hover:-translate-y-1 transform
            hover:bg-surface-hover
            transition
          "
        >
          <ManageIcon className="w-4 h-4 text-text-secondary group-hover:text-accent-primary transition group-hover:rotate-12" />
          Gérer les entrées
        </button>

        {/* USERS */}
        <button
          onClick={() => setPage("users")}
          className="
            group flex items-center gap-2
            w-full px-3 py-2 rounded-lg text-left
            bg-surface-base border border-border-base
            shadow-sm hover:shadow-lg
            hover:-translate-y-1 transform
            hover:bg-surface-hover
            transition
          "
        >
          <ManageUserIcon className="w-4 h-4 text-text-secondary group-hover:text-accent-primary transition group-hover:rotate-6" />
          Gérer les utilisateurs
        </button>

        {/* QUERY */}
        <button
          onClick={() => setPage("query")}
          className="
            group flex items-center gap-2
            w-full px-3 py-2 rounded-lg text-left
            bg-surface-base border border-border-base
            shadow-sm hover:shadow-lg
            hover:-translate-y-1 transform
            hover:bg-surface-hover
            transition
          "
        >
          <QueryIcon className="w-4 h-4 text-text-secondary group-hover:text-accent-primary transition group-hover:scale-110" />
          Remote Query
        </button>

      </div>
    </aside>
  )
}