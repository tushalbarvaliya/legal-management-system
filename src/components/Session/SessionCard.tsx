import type { SessionData } from "@/types/sessionType";

const formatData = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const SessionCard = (data: SessionData) => {
  return (
    <>
      <div className="sessionCard relative group bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-black rounded-t-2xl"></div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-zinc-900 group-hover:text-black">
              {data.title}
            </h3>

            <p className="text-sm text-black mt-1">
              Client:
              <span className="text-zinc-700 font-semibold">
                {" "}{data.clientName}
              </span>
            </p>
          </div>

          <span className="text-xs bg-zinc-100 text-black px-3 py-1 rounded-full font-medium">
            {data.caseTitle}
          </span>
        </div>

        <div className="mt-5 space-y-2 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">
              <img src="/session.svg" alt="session" className="h-5 w-5" />
            </span>
            <span>
              {formatData(data.date)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">
              <img src="/clock-icon.svg" alt="clock" className="h-5 w-5" />
            </span>
            <span>{data.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">
              <img src="/location.svg" alt="location" className="h-5 w-5" />
            </span>
            <span>{data.location}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionCard;
