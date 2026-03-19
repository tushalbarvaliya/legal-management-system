import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CasesCardSkeleton = () => {
  return (
    <>
      {/* Card */}
      <article className="rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            {/* Title */}
            <Skeleton width={220} height={14} />

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {/* Created */}
              <div className="flex items-center gap-2">
                <Skeleton width={60} height={10} />
                <Skeleton width={80} height={10} />
              </div>

              {/* Priority */}
              <div className="flex items-center gap-2">
                <Skeleton width={55} height={10} />
                <Skeleton width={60} height={18} borderRadius={999} />
              </div>

              {/* Client */}
              <div className="flex items-center gap-2">
                <Skeleton width={80} height={10} />
                <Skeleton width={90} height={10} />
              </div>

              {/* Case Type */}
              <div className="flex items-center gap-2">
                <Skeleton width={70} height={10} />
                <Skeleton width={80} height={10} />
              </div>
            </div>
          </div>

          {/* Menu */}
          <Skeleton width={32} height={32} borderRadius={6} />
        </div>
      </article>
    </>
  );
};

export default CasesCardSkeleton;
