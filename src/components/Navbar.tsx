import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Book, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { useState } from "react";

const navItems = [
  { to: "/books", label: "All Books" },
  { to: "/borrow-summary", label: "Borrow Summary" },
  { to: "/create-book", label: "Add Book" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-2 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto md:px-4 flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <Book />
          <span className="text-xl font-bold">LibraQuantum</span>
        </NavLink>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map(({ to, label }) => (
              <NavigationMenuItem key={to}>
                <NavigationMenuLink asChild>
                  <NavLink
                    to={to}
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      pathname === to && "bg-accent text-accent-foreground"
                    )}
                  >
                    {label}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <button
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-2 mt-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block w-full rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none",
                  pathname === to && "bg-accent text-accent-foreground"
                )}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
