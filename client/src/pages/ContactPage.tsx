import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { Helmet } from "react-helmet";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Phoenix Marketplace</title>
        <meta name="description" content="Have questions about Phoenix? We're here to help buyers and sellers navigate the digital product marketplace." />
        <meta property="og:title" content="Contact Us | Phoenix Marketplace" />
        <meta property="og:description" content="Have questions about Phoenix Marketplace? We're here to help." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Contact Hero */}
          <div className="bg-dark">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Contact Us</h1>
                <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                  Have questions about Phoenix? We're here to help buyers and sellers navigate the digital product marketplace.
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
          <ContactInfo />
        </main>
        <Footer />
      </div>
    </>
  );
}
