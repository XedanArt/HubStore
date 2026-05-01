import { useFranchiseStore } from "../store/franchise.store"

export default function MainView() {
  return (
    <main
      className="
        flex-1 p-6
        text-[#f5f5f7]
        overflow-y-auto
      "
    >
      {/* Exemple de contenu */}
      <h1 className="text-2xl font-semibold mb-4">
        Bienvenue dans Hubsites
      </h1>

      <p className="text-[#a8a8b8] mb-6">
        Sélectionnez une franchise ou une ville dans la sidebar pour afficher les interventions.
      </p>

      {/* Ici tu mettras tes cards plus tard */}
    </main>
  )
}
