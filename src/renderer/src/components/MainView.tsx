import { useUIStore } from "../store/ui.store"

export default function MainView() {
  const currentPage = useUIStore(s => s.currentPage)

  return (
    <div>
      <h2>{currentPage}</h2>
    </div>
  )
}
