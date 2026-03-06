import Header from "@/components/Header";
import TemplateCard from "@/components/TemplateCard";
import { homeMenuItems } from "@/const/const";
import type { RootState } from "@/store/store";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, Outlet, useLocation } from "react-router";

const HomePage = () => {
  const userObject = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (userObject.token == null) {
      navigate("/login");
    }
  }, [userObject.token, navigate]);

  const role = userObject.role;

  const filteredMenu = homeMenuItems.filter((item) => item.roles.includes(role));

  return (
    <div className="max-h-screen overflow-hidden flex">
      <aside className="h-screen w-20 bg-black text-white flex flex-col shadow-lg">
        {filteredMenu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col justify-center items-center h-20 w-full  animate-in fade-in zoom-in-90 slide-in-from-bottom-2 duration-300 hover:scale-101 hover:bg-stone-700"
            >
              <Icon className="transition-transform duration-300 hover:rotate-8" />
              <h6 className="font-bold text-xs mt-1">{item.name}</h6>
            </Link>
          );
        })}
      </aside>

      <div className="flex-1 flex flex-col">
        <Header />

        {pathname == "/" && (
          <div className="m-8 grid grid-cols-1 gap-4  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block h-full animate-in fade-in zoom-in-90 slide-in-from-bottom-2 duration-300 hover:scale-101"
              >
                <TemplateCard
                  Icon={item.icon}
                  title={item.cardTitle}
                  paragraph={item.cardParagraph}
                />
              </Link>
            ))}
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
