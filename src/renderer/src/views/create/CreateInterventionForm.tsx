import { useState } from "react"
import { useFranchiseStore } from "../../store/franchise.store"
import { InterventionService } from "../../services/intervention.service"

function CreateInterventionForm({ onBack }) {
  const { franchises, loadFranchises } = useFranchiseStore()

  const [franchiseId, setFranchiseId] = useState("")
  const [siteId, setSiteId] = useState("")
  const [object, setObject] = useState("")
  const [description, setDescription] = useState("")
  const [dateStart, setDateStart] = useState("")
  const [dateEnd, setDateEnd] = useState("")

  const selectedFranchise = franchises.find(f => f.id === Number(franchiseId))

  const handleSubmit = async () => {
    if (!franchiseId) return alert("La franchise est obligatoire.")
    if (!siteId) return alert("Le site est obligatoire.")
    if (!object.trim()) return alert("L'objet est obligatoire.")
    if (!dateStart) return alert("La date d'intervention est obligatoire.")

    await InterventionService.create({
      title: object,
      description,
      siteId: Number(siteId),
      date: dateStart,
      resolvedAt: dateEnd || null
    })

    await loadFranchises()
    onBack()
  }

  return (
    <div className="flex flex-col justify-between max-w-md h-full">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Créer une intervention</h2>

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

        <select
          className="input"
          value={siteId}
          onChange={e => setSiteId(e.target.value)}
          disabled={!selectedFranchise}
        >
          <option value="">Sélectionner un site *</option>
          {selectedFranchise?.sites.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <input
          className="input"
          placeholder="Objet *"
          value={object}
          onChange={e => setObject(e.target.value)}
        />

        <textarea
          className="input"
          placeholder="Description (optionnel)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="input"
          value={dateStart}
          onChange={e => setDateStart(e.target.value)}
        />

        <input
          type="date"
          className="input"
          value={dateEnd}
          onChange={e => setDateEnd(e.target.value)}
        />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">
          ← Retour
        </button>

        <button className="btn-primary" onClick={handleSubmit}>
          Créer
        </button>
      </div>
    </div>
  )
}

export default CreateInterventionForm
