import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Find an investor for your Tech Product in 3 easy steps</h1>
        <p className="mt-6 text-xl text-gray-200 max-w-3xl">Join our platform to connect with investors actively looking to fund innovative tech products like yours. Skip the pitch decks and guesswork, our 3-step process makes investor discovery simple, fast, and effective.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/buyers">
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
            <Link href="/sellers">
              Enter as Product Owner
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
