type CreateCardProps = {
  label: string
  onClick: () => void
}

export default function CreateCard({ label, onClick }: CreateCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        p-6 rounded-xl cursor-pointer
        bg-[rgba(37,37,65,0.6)]
        backdrop-blur-xl
        border border-[rgba(255,255,255,0.1)]
        shadow-[0_0_20px_rgba(0,0,0,0.3)]
        hover:bg-[rgba(45,45,74,0.6)]
        transition
      "
    >
      <h2 className="text-xl font-semibold mb-2">{label}</h2>
      <p className="text-[#a8a8b8]">
        Créer une nouvelle {label.toLowerCase()}.
      </p>
    </div>
  )
}
