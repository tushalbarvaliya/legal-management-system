import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const StaffCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <Skeleton circle height={48} width={48} />

        {/* Text */}
        <div className="space-y-2">
          <Skeleton height={14} width={120} />
          <Skeleton height={12} width={180} />
          <Skeleton height={10} width={140} />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Status Badge */}
        <Skeleton height={24} width={70} borderRadius={999} />

        {/* Menu Icon */}
        <Skeleton circle height={32} width={32} />
      </div>
    </div>
  )
}

export default StaffCardSkeleton
