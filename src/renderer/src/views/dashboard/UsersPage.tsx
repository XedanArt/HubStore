export default function UsersPage() {
  return (
    <div
      className="
        p-6 rounded-xl
        bg-surface-base
        border border-border-base
        backdrop-blur-xl
        [html.theme-dark_&]:backdrop-blur-none
      "
    >
      <h1 className="text-2xl font-semibold mb-4">
        Gestion des utilisateurs
      </h1>

      <p className="text-text-secondary mb-4">
        Créer, modifier ou supprimer des comptes utilisateurs.
      </p>

      <div className="text-text-secondary opacity-60">
        (Module à implémenter)
      </div>
    </div>
  )
}
