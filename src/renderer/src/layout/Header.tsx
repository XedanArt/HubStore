export default function Header() {
  return (
    <header
      className="
        w-full h-14 px-6
        flex items-center justify-between
        bg-[#252541]/50
        backdrop-blur-xl
        border-b border-[#3a3a5c]/40
        shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]
        text-[#f5f5f7]
      "
    >
      <div className="text-xl font-semibold">HubStore</div>

      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Rechercher..."
          className="
            w-full max-w-md
            px-4 py-2
            rounded-lg
            bg-[#252541]
            border border-[#3a3a5c]/50
            text-[#f5f5f7]
            placeholder-[#888899]
            focus:outline-none
            focus:border-[#8b5cf6]
            focus:ring-1 focus:ring-[#8b5cf6]/50
          "
        />
      </div>

      <div
        className="
          w-8 h-8 rounded-full
          bg-[#8b5cf6]
          shadow-[0_0_20px_rgba(139,92,246,0.3)]
        "
      />
    </header>
  )
}
