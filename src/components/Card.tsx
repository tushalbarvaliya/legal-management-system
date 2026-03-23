const Card = ({
  title,
  icon,
  children,
}: {
  title: string
  icon: string
  children: React.ReactNode
}) => (
  <article className="group rounded-2xl border border-zinc-900 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-zinc-600">{title}</h2>
      <div className="rounded-xl bg-zinc-100 p-2 transition group-hover:bg-zinc-200">
        <img src={icon} className="h-5 w-5" />
      </div>
    </div>

    <div className="mt-5">{children}</div>
  </article>
)

export default Card
