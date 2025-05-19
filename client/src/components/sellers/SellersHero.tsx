import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function SellersHero() {
  const { user, isAuthenticated } = useAuth();
  const isSeller = user?.role === "seller";
  
  return (
    <div className="relative bg-dark">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Tech startup workspace" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-900 bg-opacity-85"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Get in Front of Investors Ready to Back Great Products</h1>
        <p className="mt-6 text-xl text-gray-200 max-w-3xl">From application to investor match, our streamlined process helps you find the right backers for your tech product.</p>
        <div className="mt-10">
          <Button 
            asChild 
            size="lg"
            className="bg-gray-700 hover:bg-gray-800 text-white"
          >
            {(isAuthenticated && isSeller) ? (
              <Link href="/product-questionnaire">
                List Your Product
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            ) : (
              <Link href="/login?role=seller">
                Login as Product Owner to List
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
