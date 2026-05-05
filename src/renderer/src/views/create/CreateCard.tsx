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
        Créer une nouvelle {label.toLowerCase()}.
      </p>
    </div>
  )
}
