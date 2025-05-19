import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  LogOut, 
  User,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    return location === path;
  };

  const navItems = [
    { 
      name: "Investors and Buyers", 
      path: "/buyers",
      restricted: false // Show for all users
    },
    { 
      name: "Product Owners", 
      path: "/sellers",
      restricted: false // Show for all users
    },
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
                !item.restricted && (
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
                )
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>
                      {user?.firstName || user?.businessName || user?.email}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    {user?.role === "buyer" ? "Investor Account" : "Product Owner Account"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user?.role === "buyer" && (
                    <DropdownMenuItem asChild>
                      <Link href="/search">Find Products</Link>
                    </DropdownMenuItem>
                  )}
                  {user?.role === "seller" && (
                    <DropdownMenuItem asChild>
                      <Link href="/product-questionnaire">Add Product</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    Login
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/login?role=buyer" className="flex w-full cursor-pointer">
                      Investor Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login?role=seller" className="flex w-full cursor-pointer">
                      Product Owner Login
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
                  
                  {isAuthenticated ? (
                    <>
                      {user?.role === "buyer" && (
                        <Link
                          href="/search"
                          className="block pl-3 pr-4 py-2 border-l-4 text-gray-600 border-transparent hover:bg-gray-50 hover:border-primary hover:text-primary text-base font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Find Products
                        </Link>
                      )}
                      {user?.role === "seller" && (
                        <Link
                          href="/product-questionnaire"
                          className="block pl-3 pr-4 py-2 border-l-4 text-gray-600 border-transparent hover:bg-gray-50 hover:border-primary hover:text-primary text-base font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Add Product
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="w-full text-left block pl-3 pr-4 py-2 border-l-4 text-red-500 border-red-500 hover:bg-red-50 text-base font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="block pl-3 pr-4 py-2 border-l-4 border-primary text-primary bg-primary-50 text-base font-medium">
                        Login as:
                      </div>
                      <Link
                        href="/login?role=buyer"
                        className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Investor
                      </Link>
                      <Link
                        href="/login?role=seller"
                        className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Product Owner
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
