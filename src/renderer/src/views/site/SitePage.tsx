import { useInterventionStore } from "../../store/intervention.store"

export default function SitePage({ site, franchise }) {
  const { interventions, selectIntervention } = useInterventionStore()

  const siteInterventions = interventions.filter(i => i.siteId === site.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-text-primary">
        {franchise.name} — {site.name}
      </h1>

      {/* Card principale */}
      <div
        className="
          p-6 rounded-xl
          
          bg-surface-base
          border border-border-base
          
          transition-all duration-200
          
          backdrop-blur-xl
          [html.theme-dark_&]:backdrop-blur-none
        "
      >
        {/* Infos site */}
        <div className="space-y-1 text-text-secondary">
          <p>
            <span className="font-medium text-text-primary">Téléphone :</span>{" "}
            {site.phone || "—"}
          </p>
          <p>
            <span className="font-medium text-text-primary">Description :</span>{" "}
            {site.description || "—"}
          </p>
        </div>

        {/* Separator */}
        <hr className="my-4 border-border-base" />

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 text-text-primary">
          Interventions
        </h2>

        {/* Empty state */}
        {siteInterventions.length === 0 && (
          <p className="text-text-secondary">
            Aucune intervention pour ce site.
          </p>
        )}

        {/* List */}
        <div className="space-y-3">
          {siteInterventions.map(inter => (
            <div
              key={inter.id}
              onClick={() => selectIntervention(inter)}
              className="
                p-4 rounded-lg cursor-pointer
                
                bg-surface-base
                border border-border-base
                
                hover:bg-surface-hover
                hover:shadow-md
                hover:-translate-y-2
                
                transition-all duration-200 ease-out
              "
            >
              {/* Titre */}
              <h3 className="font-semibold text-text-primary">
                {inter.ticketCode} — {inter.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm">
                {inter.description || "—"}
              </p>

              {/* Date */}
              <p className="text-text-tertiary text-xs mt-2">
                Créée le :{" "}
                {new Date(inter.date).toLocaleDateString("fr-FR")}
              </p>

              {/* Statut */}
              {inter.resolvedAt ? (
                <p className="text-accent-success text-xs mt-1">
                  Résolue le :{" "}
                  {new Date(inter.resolvedAt).toLocaleDateString("fr-FR")}
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
    </div>
  )
}