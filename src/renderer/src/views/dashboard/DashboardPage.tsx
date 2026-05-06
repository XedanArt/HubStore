import { useUIStore } from "../../store/ui.store"

export default function DashboardPage() {
  const setPage = useUIStore(s => s.setPage)

  const cards = [
    {
      title: "Gérer les utilisateurs",
      description: "Gérer les comptes utilisateurs",
      action: () => setPage("users"),
    },
    {
      title: "Gérer les entrées",
      description: "Administrer la structure",
      action: () => setPage("manage"),
    },
    {
      title: "Interventions",
      description: "Superviser les tickets",
      action: () => setPage("home"),
    },
    {
      title: "Logs",
      description: "Voir l’activité système",
      action: () => alert("Coming soon"),
    },
  ]

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>
        <p className="text-text-secondary">
          Vue globale et outils d’administration
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={card.action}
            className="
              text-left p-5 rounded-xl

              bg-surface-base
              border border-border-base

              shadow-sm hover:shadow-lg
              hover:-translate-y-1 transform
              hover:bg-surface-hover

              transition
            "
          >
            <h2 className="text-lg font-semibold mb-1">
              {card.title}
            </h2>

            <p className="text-sm text-text-secondary">
              {card.description}
            </p>
          </button>
        ))}
      </div>

    </div>
  )
}