import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const ClientCardSkeleton = () => {
  return (
    <article className="rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex w-full min-w-0 gap-3">
          <Skeleton circle height={40} width={40} />

          <div className="w-full min-w-0">
            <Skeleton width={180} height={18} />

            <div className="mt-2 flex gap-2">
              <Skeleton width={60} height={20} borderRadius={999} />
              <Skeleton width={70} height={20} borderRadius={999} />
            </div>
          </div>
        </div>

        {/* Menu button */}
        <Skeleton width={30} height={30} borderRadius={6} />
      </div>
    </article>
  )
}

export default ClientCardSkeleton
