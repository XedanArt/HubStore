import { useUIStore } from "../store/ui.store"
import { useFranchiseStore } from "../store/franchise.store"
import { useInterventionStore } from "../store/intervention.store"
import { useThemeStore } from "../store/theme.store"

import HomeIcon from "../components/icons/HomeIcon"
import MoonIcon from "../components/icons/MoonIcon"
import SunIcon from "../components/icons/SunIcon"

export default function Header() {
  const setPage = useUIStore(state => state.setPage)

  const resetSelection = useFranchiseStore(state => state.resetSelection)
  const loadFranchises = useFranchiseStore(state => state.loadFranchises)

  const resetIntervention = useInterventionStore(state => state.resetIntervention)
  const loadInterventions = useInterventionStore(state => state.loadInterventions)

  const { setSearchQuery, searchQuery } = useInterventionStore()
  const { theme, toggleTheme } = useThemeStore()

  // Refresh global : franchises + interventions
  const refreshAll = async () => {
    await Promise.all([
      loadFranchises(),
      loadInterventions(),
    ])
  }

  return (
    <header
      className="
        w-full h-14 px-6
        flex items-center gap-4

        bg-surface-base
        border-b border-border-base

        text-text-primary

        backdrop-blur-xl
        [html.theme-dark_&]:backdrop-blur-none
      "
    >
      {/* Bouton Home */}
      <button
        onClick={() => {
          resetIntervention()
          resetSelection()
          setPage("home")
        }}
        className="
          group
          w-8 h-8 flex items-center justify-center
          rounded-lg

          bg-surface-base
          border border-border-base

          shadow-sm 
          hover:shadow-lg 
          hover:-translate-y-1 transform 

          hover:bg-surface-hover
          transition
        "
      >
        <HomeIcon
          className="
            w-5 h-5
            text-text-secondary
            transition-all duration-200
            group-hover:text-accent-primary
            group-hover:rotate-6
            group-hover:scale-125
          "
        />
      </button>

      {/* Titre */}
      <div className="text-xl font-semibold">
        HubStore
      </div>

      {/* Barre de recherche */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Rechercher un ticket..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="
            w-full max-w-md
            px-4 py-2
            rounded-lg

            bg-surface-base
            border border-border-base

            text-text-primary
            placeholder:text-text-tertiary

            focus:outline-none
            focus:border-accent-primary
            focus:ring-1 focus:ring-accent-primary/50
          "
        />
      </div>

      {/* Bouton Refresh global */}
      <button
        onClick={refreshAll}
        className="
          group
          w-8 h-8 flex items-center justify-center
          rounded-lg

          bg-surface-base
          border border-border-base

          shadow-sm 
          hover:shadow-lg 
          hover:-translate-y-1 transform 

          hover:bg-surface-hover
          transition
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="
            w-5 h-5
            text-text-secondary
            transition-all duration-200
            group-hover:text-accent-primary
            group-hover:rotate-180
          "
       >
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
          <path d="M8 16H3v5"/>
        </svg>

      </button>

      {/* Bouton thème */}
      <button
        onClick={toggleTheme}
        className="
          group
          w-8 h-8 flex items-center justify-center
          rounded-lg

          bg-surface-base
          border border-border-base

          shadow-sm 
          hover:shadow-lg 
          hover:-translate-y-1 transform 

          hover:bg-surface-hover
          transition
        "
      >
        {theme === "light" ? (
          <MoonIcon
            className="
              w-5 h-5
              text-text-secondary
              transition-all duration-200
              group-hover:text-accent-primary
              group-hover:rotate-6
              group-hover:scale-125
            "
          />
        ) : (
          <SunIcon
            className="
              w-5 h-5
              text-text-secondary
              transition-all duration-200
              group-hover:text-accent-primary
              group-hover:rotate-6
              group-hover:scale-125
            "
          />
        )}
      </button>
    </header>
  )
}
