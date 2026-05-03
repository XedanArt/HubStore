import { useEffect } from "react"
import { useFranchiseStore } from "@/store/franchise.store"

export default function Franchises() {
  const { franchises, loadFranchises, createFranchise } = useFranchiseStore()

  useEffect(() => {
    loadFranchises()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Franchises</h2>

      <button
        onClick={() => createFranchise({ name: "Nouvelle franchise" })}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Ajouter
      </button>

      <div className="space-y-2">
        {franchises.map((f) => (
          <div key={f.id} className="p-3 bg-gray-100 rounded">
            {f.name}
          </div>
        ))}
      </div>
    </div>
  )
}
