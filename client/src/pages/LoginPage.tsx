import React from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";
import { Helmet } from "react-helmet";

export default function LoginPage() {
  const [location] = useLocation();
  
  // Get the user type from query parameter
  const params = new URLSearchParams(window.location.search);
  const userType = params.get("type") === "seller" ? "seller" : "buyer";

  return (
    <>
      <Helmet>
        <title>{userType === "buyer" ? "Investor Login" : "Product Owner Login"} | Phoenix Marketplace</title>
        <meta name="description" content={userType === "buyer" 
          ? "Log in to browse and invest in digital products." 
          : "Log in to manage your digital product listings."} 
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-dark sm:text-4xl">
                {userType === "buyer" ? "Investor Login" : "Product Owner Login"}
              </h1>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                {userType === "buyer" 
                  ? "Access your investor account to discover new opportunities." 
                  : "Access your account to manage your product listings."}
              </p>
            </div>
            
            <LoginForm userType={userType === "buyer" ? "buyer" : "seller"} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}