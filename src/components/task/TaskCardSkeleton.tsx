import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const TaskCardSkeleton = () => {
  return (
    <article className="rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {/* Title */}
          <Skeleton height={16} width="40%" />

          {/* Grid info */}
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            <Skeleton height={14} width="80%" />
            <Skeleton height={14} width="60%" />
            <Skeleton height={14} width="70%" />
            <Skeleton height={14} width="65%" />
            <Skeleton height={14} width="75%" />
          </div>
        </div>

        {/* menu button */}
        <Skeleton circle width={32} height={32} />
      </div>
    </article>
  )
}

export default TaskCardSkeleton
