import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/components/auth/RegisterForm";
import { Helmet } from "react-helmet";

export default function RegisterPage() {
  const [location] = useLocation();
  
  // Get the user type from query parameter
  const params = new URLSearchParams(window.location.search);
  const userType = params.get("type") === "seller" ? "seller" : "buyer";

  return (
    <>
      <Helmet>
        <title>{userType === "buyer" ? "Investor Registration" : "Product Owner Registration"} | Phoenix</title>
        <meta name="description" content={userType === "buyer" 
          ? "Create an account to browse and invest in digital products." 
          : "Create an account to list and sell your digital products on our platform."} 
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-dark sm:text-4xl">
                {userType === "buyer" ? "Investor Registration" : "Product Owner Registration"}
              </h1>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                {userType === "buyer" 
                  ? "Create your investor account to discover new opportunities." 
                  : "Create your account to list and manage your product offerings."}
              </p>
            </div>
            
            <RegisterForm initialUserType={userType === "buyer" ? "buyer" : "seller"} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}