import { useUIStore } from "../store/ui.store"

export default function Header() {
  const currentPage = useUIStore(s => s.currentPage)

  const titles: Record<string, string> = {
    dashboard: "Dashboard",
    franchises: "Franchises",
    sites: "Sites",
    interventions: "Interventions",
    settings: "Paramètres",
  }

  return (
    <header
      className="
        h-14 px-6 flex items-center justify-between
        bg-panel/80 backdrop-blur-md
        border-b border-gray-800
        shadow-soft">
      <h2 className="text-xl font-semibold tracking-wide text-white/90">
        {titles[currentPage]}
      </h2>

      {/* Zone d’actions (boutons, filtres, etc.) */}
      <div className="flex items-center gap-3">
        {/* Placeholder pour futurs boutons */}
      </div>
    </header>
  )
}
