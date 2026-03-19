import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InvoiceCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="w-full">
          <Skeleton width={80} height={10} />
          <div >
            <Skeleton width={150} height={18} />
          </div>
          <div>
            <Skeleton width={120} height={12} />
          </div>
        </div>

        <Skeleton circle width={32} height={32} />
      </div>

      {/* Body */}
      <div className=" grid grid-cols-2 ">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <Skeleton width={60} height={10} />
            <div className="mt-1">
              <Skeleton width={80} height={14} />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default InvoiceCardSkeleton;