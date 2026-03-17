import type { userData } from "@/api/lawyerAPI";

const LawyerCard = ({ lawyer }: { lawyer: userData }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {lawyer.firstName.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold text-zinc-900">
            {lawyer.firstName} {lawyer.lastName}
          </p>
          <p className="text-sm text-black">Email : {lawyer.email}</p>
          <p className="text-xs text-black">
            phone Number : {lawyer.phoneNumber}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Status */}
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            lawyer.isBlocked === "\u0000"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {lawyer.isBlocked === "\u0000" ? "Active" : "Blocked"}
        </span>
      </div>
    </div>
  );
};

export default LawyerCard;
