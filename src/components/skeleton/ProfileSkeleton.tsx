import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className="flex justify-center items-start">
      <section className="w-full max-w-4xl  rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <header className="flex justify-between items-center my-4">
          <div className="flex gap-3">
            <Skeleton height={56} width={56} borderRadius={12} />

            <div>
              <Skeleton height={24} width={150} />
              <Skeleton height={16} width={120} />
            </div>
          </div>

          <Skeleton height={40} width={140} borderRadius={6} />
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Skeleton height={14} width={100} />
            <Skeleton height={38} />
          </div>

          <div>
            <Skeleton height={14} width={100} />
            <Skeleton height={38} />
          </div>

          <div className="sm:col-span-2">
            <Skeleton height={14} width={100} />
            <Skeleton height={38} />
          </div>

          <div className="sm:col-span-2">
            <Skeleton height={14} width={100} />
            <Skeleton height={38} />
          </div>

          <div>
            <Skeleton height={14} width={100} />
            <Skeleton height={38} />
          </div>

          <div>
            <Skeleton height={14} width={100} />
            <Skeleton height={38} />
          </div>

          <div>
            <Skeleton height={14} width={100} />
            <Skeleton height={38} />
          </div>

          <div>
            <Skeleton height={14} width={100} />
            <Skeleton height={38} />
          </div>
        </div>

        <div className="mt-6">
          <Skeleton height={40} borderRadius={6} />
        </div>
      </section>
    </div>
  );
};

export default ProfileSkeleton;
