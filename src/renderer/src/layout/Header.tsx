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
  const resetIntervention = useInterventionStore(state => state.resetIntervention)

  const { setSearchQuery, searchQuery } = useInterventionStore()
  const { theme, toggleTheme } = useThemeStore()

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