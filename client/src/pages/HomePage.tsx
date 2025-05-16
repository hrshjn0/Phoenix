import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedListings from "@/components/home/FeaturedListings";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Phoenix - Tech Product Investment Platform</title>
        <meta name="description" content="Phoenix is the premier platform for tech product owners to connect with investors. Find your next investment opportunity or secure funding for your tech product." />
        <meta property="og:title" content="Phoenix - Tech Product Investment Platform" />
        <meta property="og:description" content="The premier platform for tech product owners to connect with investors." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <WhyChooseUs />
          <FeaturedListings />
        </main>
        <Footer />
      </div>
    </>
  );
}
