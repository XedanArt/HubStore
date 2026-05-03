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

  // 🔥 Reset automatique quand on revient sur la page "create"
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
        bg-[rgba(37,37,65,0.6)]
        backdrop-blur-xl
        border border-[rgba(255,255,255,0.1)]
        shadow-[0_0_20px_rgba(0,0,0,0.3)]
      "
    >

      {!selectedForm && (
        <>
          <p className="text-[#a8a8b8] mb-6">
            Choisissez ce que vous souhaitez créer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CreateCard label="Franchise" onClick={() => setSelectedForm("franchise")} />
            <CreateCard label="Site" onClick={() => setSelectedForm("site")} />
            <CreateCard label="Intervention" onClick={() => setSelectedForm("intervention")} />
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
