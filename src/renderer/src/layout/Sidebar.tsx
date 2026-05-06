import { useState, useRef, useEffect } from "react"
import { useFranchiseStore } from "../store/franchise.store"
import { useSiteStore } from "../store/site.store"
import { useUIStore } from "../store/ui.store"
import { useInterventionStore } from "../store/intervention.store"
import { useAuthStore } from "../store/auth.store"

import CreateIcon from "../components/icons/CreateIcon"
import ManageIcon from "../components/icons/ManageIcon"
import ManageUserIcon from "../components/icons/ManageUserIcon"

export default function Sidebar() {
  const {
    franchises,
    selectedFranchise,
    selectedSite,
    selectFranchise,
    selectSite
  } = useFranchiseStore()

  const { resetIntervention } = useInterventionStore()
  const { sites } = useSiteStore()

  const [open, setOpen] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const activeView = useUIStore(s => s.activeView)
  const setPage = useUIStore(s => s.setPage)

  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)

  const isAdmin = user?.role === "ADMIN"

  // ========================
  // CLOSE MENU ON OUTSIDE CLICK
  // ========================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ========================
  // HANDLERS
  // ========================
  const handleSelectFranchise = (f: any) => {
    resetIntervention()

    if (selectedFranchise?.id === f.id) {
      selectFranchise(null)
    } else {
      selectFranchise(f)
    }

    setPage("home")
  }

  const handleSelectSite = (s: any) => {
    resetIntervention()
    selectSite(s)
    setPage("home")
  }

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
  }

  // ========================
  // STYLES
  // ========================
  const baseBtn = `
    group flex items-center gap-2
    w-full px-3 py-2 rounded-lg text-left
    bg-surface-base border border-border-base
    shadow-sm hover:shadow-lg
    hover:-translate-y-1 transform
    hover:bg-surface-hover
    transition
  `

  const activeBtn = `
    bg-surface-hover border-accent-primary
    text-accent-primary
  `

  // ========================
  // AVATAR INITIALS
  // ========================
  const getInitials = (username?: string) => {
    if (!username) return "?"
    return username.slice(0, 2).toUpperCase()
  }

  return (
    <aside
      className="
        w-64 h-full flex flex-col p-4
        bg-surface-base border-r border-border-base
        text-text-primary
        backdrop-blur-xl [html.theme-dark_&]:backdrop-blur-none
        overflow-hidden
      "
    >
      {/* ========================
          AVATAR + DROPDOWN
      ======================== */}
      <div className="flex justify-center mb-4 relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            group relative
            w-16 h-16 rounded-xl
            bg-accent-primary
            flex items-center justify-center
            border border-white/20
            shadow-sm
            hover:shadow-[0_0_12px_rgba(0,0,0,0.25)]
            [html.theme-dark_&]:hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]
            hover:-translate-y-1 transform
            transition
          "
        >
          <span
            className="
              text-lg font-semibold
              text-black
              [html.theme-dark_&]:text-white
            "
          >
            {getInitials(user?.username)}
          </span>
        </button>

        {/* DROPDOWN */}
{menuOpen && (
  <div
    className="
      absolute top-20 w-56 p-3 rounded-xl

      bg-white text-black
      [html.theme-dark_&]:bg-surface-base
      [html.theme-dark_&]:text-text-primary

      border border-gray-200
      [html.theme-dark_&]:border-border-base

      shadow-xl
      z-50
    "
  >
    {/* USER */}
    <div className="mb-3">
      <p className="font-semibold text-inherit">
        {user?.username}
      </p>

      <p
        className="
          text-xs
          text-gray-500
          [html.theme-dark_&]:text-text-secondary
        "
      >
        {user?.role}
      </p>
    </div>

    {/* SEPARATOR */}
    <div
      className="
        border-t
        border-gray-200
        [html.theme-dark_&]:border-border-base
        my-2
      "
    />

    {/* HOME */}
    <button
      onClick={() => {
        setPage("home")
        setMenuOpen(false)
      }}
      className="
        w-full text-left px-2 py-1.5 rounded

        hover:bg-gray-100
        [html.theme-dark_&]:hover:bg-surface-hover

        transition
      "
    >
      Accueil
    </button>

    {/* DASHBOARD */}
    {isAdmin && (
      <button
        onClick={() => {
          setPage("dashboard")
          setMenuOpen(false)
        }}
        className="
          w-full text-left px-2 py-1.5 rounded

          hover:bg-gray-100
          [html.theme-dark_&]:hover:bg-surface-hover

          transition
        "
      >
        Dashboard
      </button>
    )}

    {/* SEPARATOR */}
    <div
      className="
        border-t
        border-gray-200
        [html.theme-dark_&]:border-border-base
        my-2
      "
    />

    {/* LOGOUT */}
    <button
      onClick={handleLogout}
      className="
        w-full text-left px-2 py-1.5 rounded

        text-red-600
        [html.theme-dark_&]:text-accent-danger

        hover:bg-gray-100
        [html.theme-dark_&]:hover:bg-surface-hover

        transition
      "
    >
      Se déconnecter
    </button>
  </div>
)}
      </div>

      {/* ========================
          FRANCHISE BUTTON
      ======================== */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full px-3 py-2 rounded-lg text-left
          bg-surface-base border border-border-base
          shadow-sm hover:shadow-lg
          hover:-translate-y-1 transform
          hover:bg-surface-hover
          transition
        "
      >
        Franchises
      </button>

      {/* ========================
          LIST
      ======================== */}
      <div className="flex-1 overflow-y-auto mt-3 pr-1">
        {open && (
          <div className="border border-border-base rounded-lg overflow-hidden divide-y divide-border-base">
            {franchises.map(f => {
              const sitesForFranchise = sites.filter(
                s => s.franchiseId === f.id
              )

              return (
                <div key={f.id}>
                  <button
                    onClick={() => handleSelectFranchise(f)}
                    className={`
                      w-full text-left px-3 py-2 transition
                      bg-surface-base hover:bg-surface-hover
                      ${
                        selectedFranchise?.id === f.id
                          ? "text-accent-primary bg-surface-hover border-l-2 border-accent-primary"
                          : ""
                      }
                    `}
                  >
                    {f.name}
                  </button>

                  {selectedFranchise?.id === f.id && (
                    <div className="bg-bg-secondary border-t border-border-base pl-4">
                      {sitesForFranchise.map(site => (
                        <button
                          key={site.id}
                          onClick={() => handleSelectSite(site)}
                          className={`
                            w-full text-left pl-6 pr-3 py-2 text-sm transition
                            hover:bg-surface-hover
                            ${
                              selectedSite?.id === site.id
                                ? "text-accent-secondary bg-surface-hover border-l-2 border-accent-secondary"
                                : "text-text-secondary"
                            }
                          `}
                        >
                          {site.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ========================
          NAVIGATION
      ======================== */}
      <div className="mt-auto flex flex-col gap-2 pt-2">

        <button
          onClick={() => setPage("create")}
          className={`${baseBtn} ${activeView === "create" ? activeBtn : ""}`}
        >
          <CreateIcon className="w-4 h-4 text-text-secondary group-hover:text-accent-primary transition" />
          Créer une entrée
        </button>

        {isAdmin && (
          <button
            onClick={() => setPage("dashboard")}
            className={`${baseBtn} ${activeView === "dashboard" ? activeBtn : ""}`}
          >
            <ManageUserIcon className="w-4 h-4 text-text-secondary group-hover:text-accent-primary transition group-hover:rotate-6" />
            Dashboard
          </button>
        )}

      </div>
    </aside>
  )
}