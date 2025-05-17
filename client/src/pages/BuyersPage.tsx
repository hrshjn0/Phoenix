import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BuyersHero from "@/components/buyers/BuyersHero";
import BuyersWhyChooseUs from "@/components/buyers/BuyersWhyChooseUs";
import ProductListings from "@/components/buyers/ProductListings";
import BuyersFAQ from "@/components/buyers/BuyersFAQ";
import { Helmet } from "react-helmet";

export default function BuyersPage() {
  return (
    <>
      <Helmet>
        <title>For Investors & Buyers | Phoenix Marketplace</title>
        <meta name="description" content="Discover vetted digital products with proven track records. Find your next investment opportunity from our curated marketplace." />
        <meta property="og:title" content="For Investors & Buyers | Phoenix Marketplace" />
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
                <p>Login to see personalized recommendations based on your interests.</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
