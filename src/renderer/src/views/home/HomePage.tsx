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
      <h1 className="text-2xl font-semibold text-text-primary">
        {searchQuery ? "Résultats de recherche" : "Dernières interventions"}
      </h1>

      {sorted.length === 0 && (
        <p className="text-text-secondary">
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
              
              bg-surface-base
              border border-border-base

              shadow-sm 
              hover:shadow-lg 
              
              hover:-translate-y-3 transform 
              
              hover:bg-surface-hover
              
              transition-all duration-200 ease-out 
              
              backdrop-blur-xl [html.theme-dark_&]:backdrop-blur-none
            "
          >
            {/* Titre */}
            <div className="font-semibold mb-1 text-text-primary">
              {inter.ticketCode} — {inter.title}
            </div>

            {/* Description */}
            <p className="text-text-secondary text-sm">
              {inter.description || "Aucune description"}
            </p>

            {/* Date */}
            <p className="text-text-tertiary text-xs mt-2">
              Créée le : {new Date(inter.date).toLocaleDateString("fr-FR")}
            </p>

            {/* Statut */}
            {inter.resolvedAt ? (
              <p className="text-accent-success text-xs mt-1">
                Résolue le : {new Date(inter.resolvedAt).toLocaleDateString("fr-FR")}
              </p>
            ) : (
              <p className="text-accent-warning text-xs mt-1">
                En cours
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
