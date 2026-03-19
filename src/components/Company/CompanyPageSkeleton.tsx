import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CompanyPageSkeleton = () => {
  return (
    <section className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-4 flex-1">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border p-4 flex items-center gap-3"
            >
              <Skeleton circle height={20} width={20} />

              <div className="space-y-2 w-full">
                <Skeleton height={12} width={80} />
                <Skeleton height={14} width="80%" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white rounded-xl border p-4 flex justify-between items-center">
          <Skeleton height={14} width={180} />
          <Skeleton height={16} width={60} borderRadius={999} />
        </div>
      </div>
    </section>
  );
};

export default CompanyPageSkeleton;
