import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/product/ProductDetail";
import { useParams } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = parseInt(id || "0");
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId
  });

  return (
    <>
      <Helmet>
        <title>{product ? `${product.headline} | Phoenix Marketplace` : 'Product Details | Phoenix Marketplace'}</title>
        <meta 
          name="description" 
          content={product 
            ? `Learn more about ${product.headline}. ${product.description.substring(0, 150)}...` 
            : 'View detailed information about this digital product including financials, users, and technology stack.'}
        />
        <meta property="og:title" content={product ? `${product.headline} | Phoenix Marketplace` : 'Product Details'} />
        <meta 
          property="og:description" 
          content={product ? product.description.substring(0, 150) + '...' : 'Digital product details'} 
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <ProductDetail />
        </main>
        <Footer />
      </div>
    </>
  );
}
