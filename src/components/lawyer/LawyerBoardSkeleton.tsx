const LawyerBoardSkeleton = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
        >
          <div className="h-3 w-24 rounded bg-zinc-200"></div>
          <div className="mt-4 h-6 w-16 rounded bg-zinc-300"></div>
        </div>
      ))}
    </div>
  )
}

export default LawyerBoardSkeleton
