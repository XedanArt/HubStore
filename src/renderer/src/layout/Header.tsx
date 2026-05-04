import { useUIStore } from "../store/ui.store"
import { useFranchiseStore } from "../store/franchise.store"
import { useInterventionStore } from "../store/intervention.store"
import { useThemeStore } from "../store/theme.store"

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
        bg-[rgba(37,37,65,0.4)]
        backdrop-blur-xl
        border-b border-[rgba(255,255,255,0.1)]
        shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]
        text-[#f5f5f7]
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
          w-8 h-8 flex items-center justify-center
          rounded-lg
          bg-[#1f1f33]/70
          border border-[#3a3a5c]/40
          shadow-[0_0_10px_rgba(139,92,246,0.2)]
          hover:bg-[#2a2a44]/70
          transition
        "
      >
        🏠
      </button>

      {/* Titre */}
      <div className="text-xl font-semibold">HubStore</div>

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
            bg-[#252541]
            border border-[#3a3a5c]/50
            text-[#f5f5f7]
            placeholder-[#888899]
            focus:outline-none
            focus:border-[#8b5cf6]
            focus:ring-1 focus:ring-[#8b5cf6]/50
          "
        />
      </div>

      {/* Bouton thème */}
      <button
        onClick={toggleTheme}
        className="
          w-8 h-8 flex items-center justify-center
          rounded-lg
          bg-[#252541]
          border border-[#3a3a5c]/40
          hover:bg-[#2d2d4a]
          transition
        "
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {/* Avatar */}
      <div
        className="
          w-8 h-8 rounded-full
          bg-[#8b5cf6]
          shadow-[0_0_20px_rgba(139,92,246,0.3)]
        "
      />
    </header>
  )
}
