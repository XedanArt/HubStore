type CreateCardProps = {
  label: string
  gender: "m" | "f"
  onClick: () => void
}

export default function CreateCard({ label, gender, onClick }: CreateCardProps) {
  const article = gender === "f" ? "une nouvelle" : "un nouveau"

  return (
    <div
      onClick={onClick}
      className="
        p-6 rounded-xl cursor-pointer

        bg-surface-base
        border border-border-base

        text-text-primary

        shadow-sm
        hover:shadow-lg

        transform hover:-translate-y-1

        hover:bg-surface-hover

        transition-all duration-200 ease-out

        backdrop-blur-xl
        [html.theme-dark_&]:backdrop-blur-none
      "
    >
      <h2 className="text-xl font-semibold mb-2">
        {label}
      </h2>

      <p className="text-text-secondary">
        Créer {article} {label.toLowerCase()}.
      </p>
    </div>
  )
}