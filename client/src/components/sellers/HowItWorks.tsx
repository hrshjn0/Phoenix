import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Create Your Listing",
      description: "Fill out our comprehensive questionnaire about your product and business."
    },
    {
      number: 2,
      title: "Verification Process",
      description: "Our team validates your information and prepares your listing for the marketplace."
    },
    {
      number: 3,
      title: "Connect With Buyers",
      description: "Receive inquiries from interested investors and communicate directly."
    },
    {
      number: 4,
      title: "Close The Deal",
      description: "Finalize terms with your chosen buyer and complete the transaction."
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">How It Works For Sellers</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">We've simplified the process of selling your digital product.</p>
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-50 text-lg font-medium text-gray-500">
                Simple 4-step process
              </span>
            </div>
          </div>

          <div className="mt-12 max-w-lg mx-auto grid gap-10 lg:grid-cols-4 lg:max-w-none">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col text-center">
                <div className="flex-shrink-0 mx-auto">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary text-white text-xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-dark">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button 
            asChild 
            size="lg"
            className="bg-secondary text-white hover:bg-green-700"
          >
            <Link href="/product-questionnaire">
              Start Selling Your Product
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
