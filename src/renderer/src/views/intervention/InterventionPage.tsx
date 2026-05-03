export default function InterventionPage({ intervention }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Ticket {intervention.ticketCode}
      </h1>

      <div className="p-6 rounded-xl bg-[rgba(37,37,65,0.6)] border border-white/10">
        <p><strong>Titre :</strong> {intervention.title}</p>

        <p className="mt-2 opacity-80">
          <strong>Description :</strong> {intervention.description || "—"}
        </p>

        <p className="mt-2 opacity-80">
          <strong>Date :</strong> {new Date(intervention.date).toLocaleDateString("fr-FR")}
        </p>

        {intervention.resolvedAt && (
          <p className="text-green-400 mt-1">
            <strong>Résolue le :</strong> {new Date(intervention.resolvedAt).toLocaleDateString("fr-FR")}
          </p>
        )}
      </div>
    </div>
  )
}
