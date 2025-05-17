import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BuyersHero from "@/components/buyers/BuyersHero";
import BuyersWhyChooseUs from "@/components/buyers/BuyersWhyChooseUs";
import ProductListings from "@/components/buyers/ProductListings";
import BuyersFAQ from "@/components/buyers/BuyersFAQ";
import { Helmet } from "react-helmet";
import { useRoleBasedAccess } from "@/lib/roleBasedAccess";
import { useAuth } from "@/contexts/AuthContext";

export default function BuyersPage() {
  // Only allow buyers to access this page, redirect others to home
  const { isAuthorized } = useRoleBasedAccess(['buyer']);
  const { isLoading } = useAuth();
  
  // If still loading or not authorized, show minimal content
  if (isLoading || !isAuthorized) {
    return null; // Will be redirected by the hook
  }

  return (
    <>
      <Helmet>
        <title>For Investors & Buyers | Phoenix</title>
        <meta name="description" content="Discover vetted digital products with proven track records. Find your next investment opportunity from our curated platform." />
        <meta property="og:title" content="For Investors & Buyers | Phoenix" />
        <meta property="og:description" content="Discover vetted digital products with proven track records." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <BuyersHero />
          <BuyersWhyChooseUs />
          <ProductListings />
          <BuyersFAQ />
          <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">Recommended Opportunities</h2>
                <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Based on your profile and browsing history.</p>
              </div>

              <div className="mt-8 text-center text-gray-500">
                <p>Personalized recommendations will appear here based on your browsing.</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
