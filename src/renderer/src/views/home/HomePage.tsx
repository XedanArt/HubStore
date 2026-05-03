import { useEffect } from "react"
import { useInterventionStore } from "../../store/intervention.store"

export default function HomePage() {
  const {
    interventions,
    loadInterventions,
    selectIntervention,
    searchQuery,
    searchResults
  } = useInterventionStore()

  useEffect(() => {
    loadInterventions()
  }, [])

  const list = searchQuery ? searchResults : interventions

  const sorted = [...list].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        {searchQuery ? "Résultats de recherche" : "Dernières interventions"}
      </h1>

      {sorted.length === 0 && (
        <p className="text-[#a8a8b8]">
          {searchQuery ? "Aucun résultat." : "Aucune intervention pour le moment."}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map(inter => (
          <div
            key={inter.id}
            onClick={() => selectIntervention(inter)}
            className="
              p-4 rounded-xl cursor-pointer
              bg-[rgba(37,37,65,0.6)]
              backdrop-blur-xl
              border border-[rgba(255,255,255,0.1)]
              shadow-[0_0_15px_rgba(0,0,0,0.25)]
              hover:bg-[rgba(45,45,74,0.6)]
              transition
            "
          >
            {/* Titre + code */}
            <div className="font-semibold mb-1">
              {inter.ticketCode} — {inter.title}
            </div>

            {/* Description */}
            <p className="text-[#a8a8b8] text-sm">
              {inter.description || "Aucune description"}
            </p>

            {/* Date */}
            <p className="text-[#8888aa] text-xs mt-2">
              Créée le : {new Date(inter.date).toLocaleDateString("fr-FR")}
            </p>

            {/* Statut */}
            {inter.resolvedAt ? (
              <p className="text-green-400 text-xs mt-1">
                Résolue le : {new Date(inter.resolvedAt).toLocaleDateString("fr-FR")}
              </p>
            ) : (
              <p className="text-yellow-400 text-xs mt-1">
                En cours
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
