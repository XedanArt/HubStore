import { useUIStore } from "../store/ui.store"
import Dashboard from "../pages/Dashboard"
import Franchises from "../pages/Franchises"
import Sites from "../pages/Sites"
import Interventions from "../pages/Interventions"
import Settings from "../pages/Settings"
import type { JSX } from "react"

export default function MainView() {
  const currentPage = useUIStore(s => s.currentPage)

  const pages: Record<string, JSX.Element> = {
    dashboard: <Dashboard />,
    franchises: <Franchises />,
    sites: <Sites />,
    interventions: <Interventions />,
    settings: <Settings />,
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="animate-fade">{pages[currentPage]}</div>
    </div>
  )
}
