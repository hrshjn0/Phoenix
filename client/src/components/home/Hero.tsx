import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Hero() {
  const { user, isAuthenticated } = useAuth();
  const isSeller = user?.role === "seller";
  const isBuyer = user?.role === "buyer";

  return (
    <div className="relative bg-dark">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Digital marketplace" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-900 bg-opacity-85"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your Tech-Enabled Product Deserves Investment.
          </h1>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl mt-2">
            Find an Investor Now.
          </h1>
        </div>
        <p className="mt-6 text-xl text-gray-200 max-w-3xl">Join our platform to connect with investors actively looking to fund innovative tech products like yours. Skip the pitch decks and guesswork, our 3-step process makes investor discovery simple, fast, and effective.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          {!isAuthenticated && (
            <>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/login?role=buyer">
                  Enter as Investor/Buyer
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-gray-700 text-white hover:bg-gray-800"
              >
                <Link href="/login?role=seller">
                  Enter as Product Owner
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </Button>
            </>
          )}
          
          {isBuyer && (
            <>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/buyers">
                  Browse Products
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-gray-700 text-white hover:bg-gray-800"
              >
                <Link href="/search">
                  Search Products
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </Link>
              </Button>
            </>
          )}
          
          {isSeller && (
            <>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/product-questionnaire">
                  List Your Product
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-gray-700 text-white hover:bg-gray-800"
              >
                <Link href="/sellers">
                  Seller Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
