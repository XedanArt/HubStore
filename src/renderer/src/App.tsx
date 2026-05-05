import { useEffect } from "react"

import { useFranchiseStore } from "./store/franchise.store"
import { useSiteStore } from "./store/site.store"
import { useAuthStore } from "./store/auth.store"

import AppLayout from "./layout/AppLayout"
import LoginPage from "./views/auth/LoginPage"

export default function App() {
  const loadFranchises = useFranchiseStore(s => s.loadFranchises)
  const loadSites = useSiteStore(s => s.loadSites)

  const user = useAuthStore(s => s.user)

  useEffect(() => {
    if (user) {
      loadFranchises()
      loadSites()
    }
  }, [user])

  // BLOQUAGE SI PAS CONNECTÉ
  if (!user) {
    return <LoginPage />
  }

  return <AppLayout />
}