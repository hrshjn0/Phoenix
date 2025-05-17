import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SellersHero from "@/components/sellers/SellersHero";
import SellersWhyChooseUs from "@/components/sellers/SellersWhyChooseUs";
import HowItWorks from "@/components/sellers/HowItWorks";
import SellersFAQ from "@/components/sellers/SellersFAQ";
import { Helmet } from "react-helmet";
import { useRoleBasedAccess } from "@/lib/roleBasedAccess";
import { useAuth } from "@/contexts/AuthContext";

export default function SellersPage() {
  // Only allow sellers to access this page, redirect others to home
  const { isAuthorized } = useRoleBasedAccess(['seller']);
  const { isLoading } = useAuth();
  
  // If still loading or not authorized, show minimal content
  if (isLoading || !isAuthorized) {
    return null; // Will be redirected by the hook
  }

  return (
    <>
      <Helmet>
        <title>For Product Owners | Phoenix</title>
        <meta name="description" content="Ready to sell your digital product? Connect with qualified investors and buyers looking for established businesses like yours." />
        <meta property="og:title" content="For Product Owners | Phoenix" />
        <meta property="og:description" content="Connect with qualified investors and buyers looking for established businesses like yours." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <SellersHero />
          <SellersWhyChooseUs />
          <HowItWorks />
          <SellersFAQ />
        </main>
        <Footer />
      </div>
    </>
  );
}
