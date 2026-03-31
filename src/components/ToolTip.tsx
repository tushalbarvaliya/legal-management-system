type Props = {
  title: string
  description: string
}
const ToolTip = ({ title, description }: Props) => {
  return (
    <>
      <div className="flex items-start gap-3">
        <div className="group relative w-fit">
          <h2 className="cursor-pointer truncate text-sm font-semibold text-zinc-900">
            {title}
          </h2>

          <div className="absolute top-full left-0 z-10 mt-2 hidden w-64 translate-y-1 rounded-lg bg-zinc-900/95 p-3 text-xs text-zinc-100 opacity-0 shadow-lg transition-all duration-200 group-hover:block group-hover:translate-y-0 group-hover:opacity-100">
            {description}
          </div>
        </div>
      </div>
    </>
  )
}

export default ToolTip
