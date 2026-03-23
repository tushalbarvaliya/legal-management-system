import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const CompanyPageSkeleton = () => {
  return (
    <section className="p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Card */}
        <div className="flex items-center justify-between gap-4 rounded-2xl border bg-white p-6 shadow-sm">
          {/* Left */}
          <div className="flex flex-1 items-center gap-4">
            <Skeleton height={56} width={56} borderRadius={12} />

            <div className="space-y-2">
              <Skeleton height={20} width={180} />
              <Skeleton height={14} width={120} />
            </div>
          </div>

          {/* Right Button */}
          <Skeleton height={36} width={140} borderRadius={8} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border bg-white p-4"
            >
              <Skeleton circle height={20} width={20} />

              <div className="w-full space-y-2">
                <Skeleton height={12} width={80} />
                <Skeleton height={14} width="80%" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-4">
          <Skeleton height={14} width={180} />
          <Skeleton height={16} width={60} borderRadius={999} />
        </div>
      </div>
    </section>
  )
}

export default CompanyPageSkeleton
