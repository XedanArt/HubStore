import { useFranchiseStore } from "../../store/franchise.store"

export default function HomePage() {
  const { franchises } = useFranchiseStore()

  // Mock : on génère des interventions fictives à partir des franchises
  const interventions = franchises.flatMap(f =>
    f.cities.map(site => ({
      id: `${f.name}-${site}`,
      franchise: f.name,
      site,
      object: "Intervention de maintenance",
      date: "2026-05-01",
      status: "pending"
    }))
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dernières interventions</h1>

      {interventions.length === 0 && (
        <p className="text-[#a8a8b8]">Aucune intervention pour le moment.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interventions.map(inter => (
          <div
            key={inter.id}
            className="
              p-4 rounded-xl
              bg-[rgba(37,37,65,0.6)]
              backdrop-blur-xl
              border border-[rgba(255,255,255,0.1)]
              shadow-[0_0_15px_rgba(0,0,0,0.25)]
              hover:bg-[rgba(45,45,74,0.6)]
              transition
            "
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold">{inter.object}</div>
              <span
                className={`
                  text-xs px-2 py-1 rounded
                  ${inter.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-green-500/20 text-green-300"}
                `}
              >
                {inter.status === "pending" ? "En cours" : "Résolue"}
              </span>
            </div>

            <p className="text-[#a8a8b8] text-sm">
              {inter.site} — {inter.franchise}
            </p>

            <p className="text-[#8888aa] text-xs mt-2">
              {inter.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
