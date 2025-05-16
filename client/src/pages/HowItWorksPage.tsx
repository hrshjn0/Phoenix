import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";

export default function HowItWorksPage() {
  return (
    <>
      <Helmet>
        <title>How It Works | Phoenix Marketplace</title>
        <meta name="description" content="Learn how Phoenix Marketplace connects quality digital products with the right investors, creating value for both buyers and sellers." />
        <meta property="og:title" content="How It Works | Phoenix Marketplace" />
        <meta property="og:description" content="Learn how Phoenix Marketplace creates value for both buyers and sellers." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Hero section */}
          <div className="relative bg-dark">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
                alt="Business meeting" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-dark bg-opacity-70"></div>
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">How Phoenix Works</h1>
              <p className="mt-6 text-xl text-white max-w-3xl">Our marketplace creates value by connecting quality digital products with the right investors. Learn how our process benefits both buyers and sellers.</p>
            </div>
          </div>

          {/* Process Flow */}
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Process</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
                  A transparent marketplace for digital products
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Phoenix provides a structured process to ensure successful transactions between product owners and investors.
                </p>
              </div>

              <div className="mt-16">
                <div className="space-y-24">
                  {/* For Sellers */}
                  <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div className="relative">
                      <img className="w-full rounded-xl shadow-xl" src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" alt="For Sellers" />
                    </div>
                    <div className="mt-10 lg:mt-0">
                      <h3 className="text-2xl font-extrabold text-dark">For Sellers</h3>
                      <div className="mt-10 space-y-10">
                        {/* Step 1 */}
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                              <span className="font-bold">1</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg leading-6 font-medium text-dark">List Your Product</h4>
                            <p className="mt-2 text-base text-gray-500">
                              Complete our comprehensive questionnaire with details about your product, financials, technology, and user base.
                            </p>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                              <span className="font-bold">2</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg leading-6 font-medium text-dark">Verification & Listing</h4>
                            <p className="mt-2 text-base text-gray-500">
                              Our team verifies your information and creates an optimized listing that highlights your product's value while maintaining appropriate confidentiality.
                            </p>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                              <span className="font-bold">3</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg leading-6 font-medium text-dark">Connect With Buyers</h4>
                            <p className="mt-2 text-base text-gray-500">
                              Receive inquiries from qualified buyers, review their profiles, and choose which ones to engage with through our secure messaging system.
                            </p>
                          </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                              <span className="font-bold">4</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg leading-6 font-medium text-dark">Close The Deal</h4>
                            <p className="mt-2 text-base text-gray-500">
                              Negotiate terms, complete due diligence with your chosen buyer, and finalize the transaction with optional support from our team.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* For Buyers */}
                  <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div className="mt-10 lg:mt-0 lg:order-last">
                      <img className="w-full rounded-xl shadow-xl" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" alt="For Buyers" />
                    </div>
                    <div className="relative">
                      <h3 className="text-2xl font-extrabold text-dark">For Buyers</h3>
                      <div className="mt-10 space-y-10">
                        {/* Step 1 */}
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                              <span className="font-bold">1</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg leading-6 font-medium text-dark">Browse Listings</h4>
                            <p className="mt-2 text-base text-gray-500">
                              Explore our curated marketplace of digital products, using filters to find opportunities that match your investment criteria.
                            </p>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                              <span className="font-bold">2</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg leading-6 font-medium text-dark">Express Interest</h4>
                            <p className="mt-2 text-base text-gray-500">
                              When you find an interesting opportunity, express interest to get access to more detailed information and connect with the seller.
                            </p>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                              <span className="font-bold">3</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg leading-6 font-medium text-dark">Due Diligence</h4>
                            <p className="mt-2 text-base text-gray-500">
                              Conduct thorough due diligence with full access to relevant documentation and data provided by the seller through our secure platform.
                            </p>
                          </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                              <span className="font-bold">4</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg leading-6 font-medium text-dark">Acquire The Product</h4>
                            <p className="mt-2 text-base text-gray-500">
                              Negotiate terms, finalize the agreement, and complete the acquisition with optional support from our transaction specialists.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
