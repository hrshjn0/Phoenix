import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import { Helmet } from "react-helmet";
import { useRoleBasedAccess } from "@/lib/roleBasedAccess";
import { useAuth } from "@/contexts/AuthContext";

export default function ProductQuestionnairePage() {
  // Only allow sellers/product owners to access this page, redirect others to home
  const { isAuthorized } = useRoleBasedAccess(['seller']);
  const { isLoading } = useAuth();
  
  // If still loading or not authorized, show minimal content
  if (isLoading || !isAuthorized) {
    return null; // Will be redirected by the hook
  }
  
  return (
    <>
      <Helmet>
        <title>List Your Product | Phoenix</title>
        <meta name="description" content="Complete the questionnaire to list your tech product on Phoenix. The more information you provide, the better we can showcase your product to potential investors." />
        <meta property="og:title" content="List Your Product | Phoenix" />
        <meta property="og:description" content="List your tech product on Phoenix to connect with investors." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Questionnaire Header */}
          <div className="bg-dark">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">List Your Product</h1>
                <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                  Complete the questionnaire below to create your product listing. The more information you provide, the better we can showcase your product to potential buyers.
                </p>
              </div>
            </div>
          </div>

          <QuestionnaireForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
