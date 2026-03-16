const HomePageContent = () => {
  const taskList = [
    {
      title: "Total tasks assigned",
      value: "24",
      src: "/tasks.svg",
      alt: "menu",
    },
    {
      title: "Total tasks completed",
      value: "24",
      src: "/right.svg",
      alt: "task",
    },
    {
      title: "Total incomplete tasks",
      value: "24",
      src: "/clock-icon.svg",
      alt: "menu",
    },
    {
      title: "Total cases assigned",
      value: "24",
      src: "/cases.svg",
      alt: "menu",
    },
    {
      title: "Today's sessions",
      value: "24",
      src: "/session.svg",
      alt: "menu",
    },
    
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-x-2 gap-y-4">
        <div className="rounded-2xl bg-white p-5 shadow-soft sm:p-6 col-span-3">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Welcome back, {'Admin'} Tushal
          </h1>
          <p className="mt-2 text-sm text-zinc-600 sm:text-base">
            Here is a quick summary of your current workload and session
            activity.
          </p>
        </div>
        {taskList.map((item) => (
          <article
            className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300"
            key={item.src}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-sm font-semibold text-zinc-600">
                {item.title}
              </h2>
              <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 transition duration-200 group-hover:bg-zinc-200">
                <img src={item.src} alt={item.alt} className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-5 text-3xl font-extrabold text-zinc-900">{item.value}</p>
          </article>
        ))}
      </div>
    </>
  );
};

export default HomePageContent;
