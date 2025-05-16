import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function SellersHero() {
  return (
    <div className="relative bg-dark">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Tech startup workspace" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-dark bg-opacity-70"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">For Product Owners</h1>
        <p className="mt-6 text-xl text-white max-w-3xl">Ready to sell your digital product? Connect with qualified investors and buyers looking for established businesses like yours.</p>
        <div className="mt-10">
          <Button 
            asChild 
            size="lg"
            className="bg-secondary hover:bg-green-700 text-white"
          >
            <Link href="/product-questionnaire">
              List Your Product
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
