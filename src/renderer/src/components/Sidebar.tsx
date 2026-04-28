export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Hubsites
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-2">
        <div className="text-gray-400 uppercase text-xs px-2">Franchises</div>

        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">
          Franchise A
        </button>

        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">
          Franchise B
        </button>

        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">
          + Ajouter une franchise
        </button>
      </nav>

      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        v0.1 — Dev mode
      </div>
    </aside>
  )
}
