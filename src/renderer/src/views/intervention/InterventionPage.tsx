export default function InterventionPage({ intervention }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Ticket {intervention.ticketCode}
      </h1>

      <div className="
        p-4 rounded-xl cursor-pointer
              
        bg-surface-base
        border border-border-base

        hover:bg-surface-hover
              
        transition-all duration-200 ease-out 
              
        backdrop-blur-xl [html.theme-dark_&]:backdrop-blur-none">
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
