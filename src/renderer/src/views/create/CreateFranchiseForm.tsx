import { useState } from "react"

function CreateFranchiseForm({ onBack }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Le nom est obligatoire.")
      return
    }

    console.log("Créer franchise :", { name, description })
  }

  return (
    <div className="flex flex-col justify-between max-w-md h-full">
      
      {/* Contenu du formulaire */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Créer une franchise</h2>

        <input
          className="input"
          placeholder="Nom de la franchise *"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <textarea
          className="input"
          placeholder="Description (optionnel)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      {/* Bas de la card */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
        >
          ← Retour
        </button>

        <button className="btn-primary" onClick={handleSubmit}>
          Créer
        </button>
      </div>
    </div>
  )
}

export default CreateFranchiseForm
