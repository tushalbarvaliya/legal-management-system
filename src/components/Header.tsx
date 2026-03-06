import { Link } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navItems = [
  {
    label: "Privacy Policy",
    to: "/privacy-policy",
    variant: "secondary" as const,
  },
  {
    label: "Terms & Conditions",
    to: "/terms-and-conditions",
    variant: "secondary" as const,
  },
  {
    label: "Profile",
    to: "/profile",
    variant: "default" as const,
  },
  {
    label: "Logout",
    to: "/logout",
    variant: "destructive" as const,
  },
];

const Header = () => {
  return (
    <header className="border-b bg-background px-4 py-3">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        {/* Logo with  */}
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/lawyer_logo.jpg"
            alt="logo"
            className="h-10 w-10 rounded-md object-cover transition-transform duration-300 group-hover:scale-105 md:h-12 md:w-12"
          />

          <div>
            <h1 className="text-lg font-semibold text-foreground md:text-xl">
              Lawyer
            </h1>
            <p className="text-sm text-muted-foreground">Your Dream Company</p>
          </div>
        </Link>

        {/* Menu for Tablet and Laptop screen */}
        <nav className="hidden items-center gap-1 md:flex md:flex-wrap md:justify-end lg:gap-2">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button
                variant={item.variant}
                className="h-8 px-3 text-xs transition-all duration-300 hover:scale-105 hover:shadow-md lg:h-9 lg:px-4 lg:text-sm"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Menu for smaller devices.*/}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu />
            </Button>
          </DialogTrigger>

          <DialogContent
            showCloseButton
            className="!top-0 !right-0 !left-auto !h-dvh !w-[85vw] !max-w-xs !translate-x-0 !translate-y-0 content-start rounded-none border-l border-r-0 p-4 duration-300 ease-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right sm:!max-w-xs"
          >
            <DialogTitle>Menu</DialogTitle>
            <nav className="mt-2 flex flex-col gap-2">
              {navItems.map((item) => (
                <DialogClose key={item.to} asChild>
                  <Link to={item.to} className="w-full">
                    <Button
                      variant={item.variant}
                      className="h-auto w-full whitespace-normal px-3 py-2 text-left leading-tight"
                    >
                      {item.label}
                    </Button>
                  </Link>
                </DialogClose>
              ))}
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
