import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location === path;
  };

  const navItems = [
    { name: "Investors and Buyers", path: "/buyers" },
    { name: "Product Owners", path: "/sellers" },
    { name: "How it works", path: "/how-it-works" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-primary font-bold text-2xl">
                Phoenix
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`${
                    isActive(item.path)
                      ? "border-primary text-primary" 
                      : "border-transparent text-gray-500 hover:border-primary hover:text-primary"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/buyers">
              <Button>
                Login
              </Button>
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`${
                        isActive(item.path)
                          ? "bg-primary-50 border-primary text-primary"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary"
                      } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/buyers"
                    className="block pl-3 pr-4 py-2 border-l-4 border-primary text-primary bg-primary-50 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
