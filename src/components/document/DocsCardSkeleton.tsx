import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const DocsCardSkeleton = () => {
  return (
    <div className="flex w-full rounded-xl border p-4 shadow-sm">
      {/* Left Content */}
      <div className="flex-1">
        {/* Title */}
        <div className="mb-2">
          <Skeleton width={200} height={14} />
        </div>

        {/* Meta Info */}
        <div className="mt-2 mr-40 flex justify-between">
          <div className="flex items-center gap-2">
            <Skeleton width={40} height={10} />
            <Skeleton width={50} height={18} borderRadius={999} />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton width={50} height={10} />
            <Skeleton width={70} height={18} borderRadius={999} />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton width={55} height={10} />
            <Skeleton width={70} height={18} borderRadius={999} />
          </div>
        </div>
      </div>

      {/* Right Menu */}
      <div className="ml-2">
        <Skeleton width={32} height={32} borderRadius={6} />
      </div>
    </div>
  )
}

export default DocsCardSkeleton
