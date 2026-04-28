export default function MainView() {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Interventions</h1>

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
          + Nouvelle intervention
        </button>
      </header>

      <div className="text-gray-400">
        Aucune intervention pour le moment.
      </div>
    </main>
  )
}
