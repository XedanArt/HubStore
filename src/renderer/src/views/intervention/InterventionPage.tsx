import { useState } from "react"
import { useInterventionStore } from "../../store/intervention.store"

export default function InterventionPage({ intervention }) {
  const { updateIntervention, resolveIntervention } = useInterventionStore()

  const [isEditing, setIsEditing] = useState(false)
  const [newDescription, setNewDescription] = useState(intervention.description || "")

  const handleSave = () => {
    updateIntervention(intervention.id, { description: newDescription })
    setIsEditing(false)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        Ticket {intervention.ticketCode}
      </h1>

      <div
        className="
          p-4 rounded-xl
          bg-surface-base border border-border-base
          transition-all duration-200
          backdrop-blur-xl
        "
      >
        <p><strong>Titre :</strong> {intervention.title}</p>

        {/* Description */}
        {!isEditing ? (
          <p className="mt-2 opacity-80">
            <strong>Description :</strong> {intervention.description || "—"}
          </p>
        ) : (
          <div className="mt-2">
            <strong>Description :</strong>
            <textarea
              className="w-full mt-1 p-2 rounded bg-surface-hover border border-border-base"
              rows={4}
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
            />
          </div>
        )}

        <p className="mt-2 opacity-80">
          <strong>Date :</strong>{" "}
          {new Date(intervention.date).toLocaleDateString("fr-FR")}
        </p>

        {intervention.resolvedAt && (
          <p className="text-green-400 mt-1">
            <strong>Résolue le :</strong>{" "}
            {new Date(intervention.resolvedAt).toLocaleDateString("fr-FR")}
          </p>
        )}

        {/* Boutons intégrés dans la card */}
        {!intervention.resolvedAt && (
          <div className="flex gap-3 mt-4">
            
            {/* Modifier */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="
                  px-4 py-2 rounded-lg text-sm font-medium
                  bg-blue-500/15 text-blue-400
                  border border-blue-500/20
                  backdrop-blur-sm
                  hover:bg-blue-500/25
                  transition
                "
              >
                Modifier
              </button>
            )}

            {/* Enregistrer */}
            {isEditing && (
              <button
                onClick={handleSave}
                className="
                  px-4 py-2 rounded-lg text-sm font-medium
                  bg-blue-500/15 text-blue-400
                  border border-blue-500/20
                  backdrop-blur-sm
                  hover:bg-blue-500/25
                  transition
                "
              >
                Enregistrer
              </button>
            )}

            {/* Résoudre */}
            <button
              onClick={() => resolveIntervention(intervention.id)}
              className="
                px-4 py-2 rounded-lg text-sm font-medium
                bg-green-500/15 text-green-400
                border border-green-500/20
                backdrop-blur-sm
                hover:bg-green-500/25
                transition
              "
            >
              Résoudre
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
