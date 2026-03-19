import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SessionCardSkeleton = () => {
  return (
    <div className="relative bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      {/* top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-zinc-200 rounded-t-2xl"></div>

      <div className="flex justify-between items-start">
        <div className="space-y-2 w-full">
          {/* title */}
          <Skeleton height={18} width="60%" />

          {/* client */}
          <Skeleton height={14} width="40%" />
        </div>

        {/* case badge */}
        <Skeleton height={24} width={90} borderRadius={20} />
      </div>

      <div className="mt-5 space-y-3">
        {/* date */}
        <div className="flex items-center gap-2">
          <Skeleton circle width={20} height={20} />
          <Skeleton height={14} width={120} />
        </div>

        {/* time */}
        <div className="flex items-center gap-2">
          <Skeleton circle width={20} height={20} />
          <Skeleton height={14} width={90} />
        </div>

        {/* location */}
        <div className="flex items-center gap-2">
          <Skeleton circle width={20} height={20} />
          <Skeleton height={14} width={50} />
        </div>
      </div>
    </div>
  );
};

export default SessionCardSkeleton;
