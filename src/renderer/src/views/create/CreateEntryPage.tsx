import { useState, useEffect } from "react"
import { useUIStore } from "../../store/ui.store"

import CreateCard from "./CreateCard"
import CreateFranchiseForm from "./CreateFranchiseForm"
import CreateSiteForm from "./CreateSiteForm"
import CreateInterventionForm from "./CreateInterventionForm"

function CreateEntryPage() {
  const [selectedForm, setSelectedForm] =
    useState<null | "franchise" | "site" | "intervention">(null)

  const activeView = useUIStore(s => s.activeView)

  // Reset automatique quand on revient sur la page
  useEffect(() => {
    if (activeView === "create") {
      setSelectedForm(null)
    }
  }, [activeView])

  return (
    <div
      className="
        max-w-7xl mx-auto
        p-6
        rounded-xl

        bg-surface-base
        border border-border-base

        text-text-primary

        shadow-sm

        backdrop-blur-xl
        [html.theme-dark_&]:backdrop-blur-none

        transition-colors duration-200
      "
    >

      {!selectedForm && (
        <>
          <p className="text-text-secondary mb-6">
            Choisissez ce que vous souhaitez créer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CreateCard
              label="Franchise"
              gender="f"
              onClick={() => setSelectedForm("franchise")}
            />

            <CreateCard
              label="Site"
              gender="m"
              onClick={() => setSelectedForm("site")}
            />

            <CreateCard
              label="Intervention"
              gender="f"
              onClick={() => setSelectedForm("intervention")}
            />
          </div>
        </>
      )}

      {selectedForm === "franchise" && (
        <CreateFranchiseForm onBack={() => setSelectedForm(null)} />
      )}

      {selectedForm === "site" && (
        <CreateSiteForm onBack={() => setSelectedForm(null)} />
      )}

      {selectedForm === "intervention" && (
        <CreateInterventionForm onBack={() => setSelectedForm(null)} />
      )}

    </div>
  )
}

export default CreateEntryPage