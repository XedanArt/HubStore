import { useInterventionStore } from "../../store/intervention.store"

export default function SitePage({ site, franchise }) {
  const { interventions, selectIntervention } = useInterventionStore()

  const siteInterventions = interventions.filter(i => i.siteId === site.id)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        {franchise.name} — {site.name}
      </h1>

      <div
        className="
              p-4 rounded-xl cursor-pointer
              
              bg-surface-base
              border border-border-base
              
              hover:bg-surface-hover
              
              transition-all duration-200 ease-out 
              
              backdrop-blur-xl [html.theme-dark_&]:backdrop-blur-none
        "
      >
        <p><strong>Téléphone :</strong> {site.phone || "—"}</p>
        <p><strong>Description :</strong> {site.description || "—"}</p>

        <hr className="my-4 border-white/10" />

        <h2 className="text-xl font-semibold mb-2">Interventions</h2>

        {siteInterventions.length === 0 && (
          <p className="opacity-60">Aucune intervention pour ce site.</p>
        )}

        <div className="space-y-3">
          {siteInterventions.map(inter => (
            <div
              key={inter.id}
              onClick={() => selectIntervention(inter)}
              className="
                p-4 rounded-lg cursor-pointer
                bg-[rgba(255,255,255,0.05)]
                border border-[rgba(255,255,255,0.1)]
                hover:bg-[rgba(255,255,255,0.1)]
                transition
              "
            >
              <h3 className="font-semibold">
                {inter.ticketCode} — {inter.title}
              </h3>

              <p className="opacity-80">{inter.description || "—"}</p>

              <p className="text-sm opacity-60 mt-2">
                Créée le : {new Date(inter.date).toLocaleDateString("fr-FR")}
              </p>

              {inter.resolvedAt && (
                <p className="text-sm text-green-400">
                  Résolue le : {new Date(inter.resolvedAt).toLocaleDateString("fr-FR")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
