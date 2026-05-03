import { useEffect } from "react"
import { useFranchiseStore } from "./store/franchise.store"
import { useSiteStore } from "./store/site.store"
import AppLayout from "./layout/AppLayout"

export default function App() {
  const loadFranchises = useFranchiseStore(s => s.loadFranchises)
  const loadSites = useSiteStore(s => s.loadSites)

  useEffect(() => {
    loadFranchises()
    loadSites()
  }, [])

  return <AppLayout />
}
