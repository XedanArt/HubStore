import { useState } from "react"
import { useFranchiseStore } from "../../store/franchise.store"

function CreateCityForm({ onBack }) {
  const { franchises } = useFranchiseStore()

  const [name, setName] = useState("")
  const [franchiseId, setFranchiseId] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (!name.trim()) return alert("Le nom est obligatoire.")
    if (!franchiseId) return alert("La franchise est obligatoire.")

    console.log("Créer ville :", { name, franchiseId, phone, description })
  }

  return (
    <div className="flex flex-col justify-between max-w-md h-full">
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Créer une ville</h2>

        <input
          className="input"
          placeholder="Nom de la ville *"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <select
          className="input"
          value={franchiseId}
          onChange={e => setFranchiseId(e.target.value)}
        >
          <option value="">Sélectionner une franchise *</option>
          {franchises.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>

        <input
          className="input"
          placeholder="Numéro de téléphone (optionnel)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <textarea
          className="input"
          placeholder="Description (optionnel)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

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

export default CreateCityForm
