import { Link } from "react-router";

const Header = () => {
  return (
    <header className="border-2 border-black p-4 flex items-center">
      <Link to={"/"} className="flex items-center w-fit">
        <img src="/lawyer_logo.jpg" alt="logo" className="h-15 w-15 rounded" />
        <div className="ml-2">
          <h1 className="text-2xl text-black font-bold">Lawyer</h1>
          <p className="text-gray-500 text-sm">Your Dream Company</p>
        </div>
      </Link>
      <nav className="ml-auto flex gap-2 ">
        <Link to={"/privacy-policy"}>
          <button className="bg-gray-600 text-white font-semibold p-2 ">
            Privacy Policy
          </button>
        </Link>
        <Link to={"/terms-and-conditions"}>
          <button className="bg-gray-600 text-white font-semibold p-2">
            Terms and Conditions
          </button>
        </Link>
        <Link to={"/profile"}>
          <button className="bg-yellow-400 text-white font-semibold p-2">
            Profile
          </button>
        </Link>
        <Link to={"/logout"}>
          <button className="bg-yellow-400 text-white font-semibold p-2">
            Logout
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
