import { useEffect } from "react"
import { useFranchiseStore } from "../store/franchise.store"
import { useUIStore } from "../store/ui.store"
import { useInterventionStore } from "../store/intervention.store"

import CreateEntryPage from "../views/create/CreateEntryPage"
import DashboardPage from "../views/dashboard/DashboardPage"
import HomePage from "../views/home/HomePage"
import SitePage from "../views/site/SitePage"
import InterventionPage from "../views/intervention/InterventionPage"

// pages Dashboard
import UsersPage from "../views/dashboard/UsersPage"
import ManagePage from "../views/dashboard/ManagePage"
import InterventionsPage from "../views/dashboard/InterventionsPage"
import LogsPage from "../views/dashboard/LogsPage"

export default function MainView() {
  const { selectedFranchise, selectedSite } = useFranchiseStore()
  const activeView = useUIStore(s => s.activeView)

  const {
    loadInterventions,
    selectedIntervention,
    resetIntervention
  } = useInterventionStore()

  // Charger interventions quand site change
  useEffect(() => {
    if (selectedSite) {
      loadInterventions()
    }
  }, [selectedSite, loadInterventions])

  // Reset contexte quand on change de page
  useEffect(() => {
    if (activeView !== "home") {
      resetIntervention()
    }
  }, [activeView, resetIntervention])

  const renderView = () => {
    switch (activeView) {

      // =========================
      // DASHBOARD
      // =========================
      case "dashboard":
        return <DashboardPage />

      // =========================
      // CREATE
      // =========================
      case "create":
        return <CreateEntryPage key={activeView} />

      // =========================
      // USERS
      // =========================
      case "users":
        return <UsersPage />

      // =========================
      // MANAGE (Franchises & Sites)
      // =========================
      case "manage":
        return <ManagePage />

      // =========================
      // INTERVENTIONS
      // =========================
      case "interventions":
        return <InterventionsPage />

      // =========================
      // LOGS
      // =========================
      case "logs":
        return <LogsPage />

      // =========================
      // HOME (logique complexe)
      // =========================
      case "home":
        return (
          <>
            {selectedIntervention && (
              <InterventionPage intervention={selectedIntervention} />
            )}

            {!selectedFranchise && !selectedIntervention && (
              <HomePage />
            )}

            {selectedFranchise && !selectedSite && !selectedIntervention && (
              <div
                className="
                  p-6 rounded-xl
                  bg-surface-base
                  border border-border-base
                  backdrop-blur-xl
                  [html.theme-dark_&]:backdrop-blur-none
                "
              >
                <h1 className="text-2xl font-semibold mb-2">
                  Franchise : {selectedFranchise.name}
                </h1>

                <p className="text-text-secondary">
                  Sélectionnez un site dans la sidebar pour afficher les interventions.
                </p>
              </div>
            )}

            {selectedSite && !selectedIntervention && (
              <SitePage
                site={selectedSite}
                franchise={selectedFranchise}
              />
            )}
          </>
        )

      // =========================
      // FALLBACK
      // =========================
      default:
        return <DashboardPage />
    }
  }

  return (
    <main
      className="
        flex-1 p-6
        text-text-primary
        bg-bg-primary
        overflow-y-auto
      "
    >
      {renderView()}
    </main>
  )
}
