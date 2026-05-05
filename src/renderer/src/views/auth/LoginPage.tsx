import { useState } from "react"
import { useAuthStore } from "../../store/auth.store"

export default function LoginPage() {
  const login = useAuthStore(s => s.login)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("")

    const success = await login(username, password)

    if (!success) {
      setError("Identifiants incorrects")
    }
    if (!username || !password) {
      setError("Veuillez remplir tous les champs")
    return
    }
  }

  return (
    <div
      className="
        h-screen flex items-center justify-center
        bg-bg-primary text-text-primary
      "
    >
      <div
        className="
          w-full max-w-md p-6 rounded-xl

          bg-surface-base
          border border-border-base

          shadow-sm

          backdrop-blur-xl
          [html.theme-dark_&]:backdrop-blur-none
        "
      >
        <h1 className="text-2xl font-semibold mb-4">
          Connexion
        </h1>

        <div className="space-y-4">
          <input
            className="input"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-accent-danger text-sm">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogin}
            className="btn-primary"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  )
}