const NoClient = () => {
  return (
    <>
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-600">
        <p className="font-medium text-zinc-700">No clients available.</p>
        <p className="mt-1 text-xs text-zinc-500">
          Click \"Add Client\" to create your first client profile.
        </p>
      </div>
    </>
  );
};

export default NoClient;
