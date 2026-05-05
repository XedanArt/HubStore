import { useState } from "react"
import { useFranchiseStore } from "../../store/franchise.store"

function CreateFranchiseForm({ onBack }) {
  const { createFranchise } = useFranchiseStore()

  const [name, setName] = useState("")
  const [code, setCode] = useState("")

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Le nom est obligatoire.")
    if (!code.trim()) return alert("Le code est obligatoire.")

    await createFranchise({
      name,
      code: code.toUpperCase()
    })

    onBack()
  }

  return (
    <div className="flex flex-col justify-between max-w-md h-full">
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">
          Créer une franchise
        </h2>

        <input
          className="input"
          placeholder="Nom de la franchise *"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Code (ex: MCD) *"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
      </div>

      <div className="flex justify-between mt-6">
        
        <button 
          onClick={onBack} 
          className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
        >
          ← Retour
        </button>

        <button 
          className="btn-primary" 
          onClick={handleSubmit}
        >
          Créer
        </button>

      </div>
    </div>
  )
}

export default CreateFranchiseForm
