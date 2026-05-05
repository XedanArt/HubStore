import { useState } from "react"

export default function RemoteQueryPage() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const handleRun = () => {
    // placeholder
    setResult("Résultat simulé de la requête...")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Remote Query
      </h1>

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
        {/* Input */}
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Écrire une requête SQL ou commande..."
          className="
            w-full h-32 p-3 rounded-lg

            bg-bg-secondary
            border border-border-base

            text-text-primary
            placeholder:text-text-tertiary

            focus:outline-none
            focus:border-accent-primary
          "
        />

        {/* Actions */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleRun}
            className="btn-primary"
          >
            Exécuter
          </button>
        </div>

        {/* Résultat */}
        {result && (
          <div
            className="
              mt-4 p-4 rounded-lg

              bg-bg-secondary
              border border-border-base

              text-sm font-mono
              text-text-secondary
            "
          >
            {result}
          </div>
        )}
      </div>
    </div>
  )
}