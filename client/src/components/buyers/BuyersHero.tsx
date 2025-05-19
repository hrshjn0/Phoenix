import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function BuyersHero() {
  const { user, isAuthenticated } = useAuth();
  const isBuyer = user?.role === "buyer";
  
  return (
    <div className="relative bg-dark">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Business meeting" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-900 bg-opacity-85"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Discover High-Growth Tech Products Seeking Capital</h1>
        <p className="mt-6 text-xl text-gray-200 max-w-3xl">Accelerate your portfolio with vetted tech-enabled products ready to scale with strategic investment.</p>
        <div className="mt-10">
          <Button asChild size="lg">
            {(isAuthenticated && isBuyer) ? (
              <a href="#available-products">
                Browse Products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </a>
            ) : (
              <Link href="/login?role=buyer">
                Login as Investor to Browse
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
