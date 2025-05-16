import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Phoenix - Digital Product Marketplace</title>
        <meta name="description" content="Phoenix is the premier marketplace for buying and selling established digital products and services. Connect with quality investors or find your next opportunity." />
        <meta property="og:title" content="Phoenix - Digital Product Marketplace" />
        <meta property="og:description" content="The premier marketplace for buying and selling established digital products and services." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <WhyChooseUs />
        </main>
        <Footer />
      </div>
    </>
  );
}
