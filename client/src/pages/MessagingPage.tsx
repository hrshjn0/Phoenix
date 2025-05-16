import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MessagingInterface from "@/components/messaging/MessagingInterface";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function MessagingPage() {
  const { id } = useParams();
  const productId = parseInt(id || "0");
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId
  });

  return (
    <>
      <Helmet>
        <title>{product ? `Inquire About ${product.headline} | Phoenix Marketplace` : 'Product Inquiry | Phoenix Marketplace'}</title>
        <meta 
          name="description" 
          content="Discuss product details securely with the product owner. Our messaging platform ensures confidential communication between buyers and sellers." 
        />
        <meta property="og:title" content="Product Inquiry | Phoenix Marketplace" />
        <meta property="og:description" content="Secure communication platform for digital product buyers and sellers." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Messaging Header */}
          <div className="bg-dark">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Product Inquiry</h1>
                {product && (
                  <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                    Discuss <span className="font-semibold">{product.headline}</span> with the product owner
                  </p>
                )}
              </div>
            </div>
          </div>

          <MessagingInterface productId={productId} />
        </main>
        <Footer />
      </div>
    </>
  );
}
