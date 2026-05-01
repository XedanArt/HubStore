import { useUIStore } from "../store/ui.store"

export default function Sidebar() {
  const currentPage = useUIStore(s => s.currentPage)
  const setPage = useUIStore(s => s.setPage)

  return (
    <div>
      <h1>Hubsites</h1>

      <nav>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("franchises")}>Franchises</button>
        <button onClick={() => setPage("sites")}>Sites</button>
        <button onClick={() => setPage("interventions")}>Interventions</button>
        <button onClick={() => setPage("settings")}>Paramètres</button>
      </nav>
    </div>
  )
}
