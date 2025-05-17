import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SellersHero from "@/components/sellers/SellersHero";
import SellersWhyChooseUs from "@/components/sellers/SellersWhyChooseUs";
import HowItWorks from "@/components/sellers/HowItWorks";
import SellersFAQ from "@/components/sellers/SellersFAQ";
import { Helmet } from "react-helmet";

export default function SellersPage() {
  return (
    <>
      <Helmet>
        <title>For Product Owners | Phoenix Marketplace</title>
        <meta name="description" content="Ready to sell your digital product? Connect with qualified investors and buyers looking for established businesses like yours." />
        <meta property="og:title" content="For Product Owners | Phoenix Marketplace" />
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
