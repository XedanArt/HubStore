import { Home, Building2, MapPin, Wrench, Settings } from "lucide-react"
import { useUIStore } from "../store/ui.store"

const items = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "franchises", label: "Franchises", icon: Building2 },
  { id: "sites", label: "Sites", icon: MapPin },
  { id: "interventions", label: "Interventions", icon: Wrench },
  { id: "settings", label: "Paramètres", icon: Settings },
]

export default function Sidebar() {
  const currentPage = useUIStore((s: any) => s.currentPage)
  const setPage = useUIStore((s: any) => s.setPage)

  return (
    <div className="w-60 bg-panel p-4 flex flex-col shadow-soft border-r border-gray-800">
      <h1 className="text-xl font-bold mb-6 tracking-wide text-white/90">
        Hubsites
      </h1>

      <nav className="space-y-1">
        {items.map(item => {
          const Icon = item.icon
          const active = currentPage === item.id

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`
                flex items-center gap-3 w-full px-3 py-2 rounded-lg
                transition-all duration-200 ease-out
                ${active
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "hover:bg-gray-700/40 text-text-secondary hover:text-white"
                }
                ${!active ? "hover:translate-x-1" : ""}
              `}
            >
              <Icon
                size={20}
                className={`
                  transition-all duration-200
                  ${active ? "text-white" : "text-text-secondary group-hover:text-white"}
                `}
              />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
