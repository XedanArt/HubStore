export default function ManageUsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Gestion des utilisateurs
        </h1>

        <button className="btn-primary">
          + Nouvel utilisateur
        </button>
      </div>

      {/* Card principale */}
      <div
        className="
          p-6 rounded-xl

          bg-surface-base
          border border-border-base

          shadow-sm

          backdrop-blur-xl
          [html.theme-dark_&]:backdrop-blur-none
        "
      >
        {/* Empty state */}
        <div className="text-center py-12">
          <p className="text-text-secondary mb-2">
            Aucun utilisateur pour le moment
          </p>

          <p className="text-text-tertiary text-sm">
            Les utilisateurs apparaîtront ici une fois créés.
          </p>
        </div>
      </div>
    </div>
  )
}