import { useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ChevronLeft, Check } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id || "0");
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading product details. The product may not exist or there was a server error.</p>
      </div>
    );
  }
  
  // Parse features from string to array
  const features = product.features.split(',').map(feature => feature.trim());
  
  // Function to handle expressing interest
  const handleExpressInterest = () => {
    window.location.href = `/messaging/${productId}`;
  };
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Product Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/search" className="text-primary hover:text-blue-700 flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to results
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                {product.industry}
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                {product.age}
              </Badge>
              <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                B2B
              </Badge>
              {product.isActive && (
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                  Active
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">{product.headline}</h1>
            
            <div className="mt-8">
              <h2 className="text-lg font-medium text-dark">Description</h2>
              <div className="mt-4 text-gray-500">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-dark">Key Features</h2>
              <ul className="mt-4 space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-gray-500">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Financial & Technical Info */}
          <div className="mt-10 lg:mt-0">
            <Card className="bg-gray-50 overflow-visible">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    {/* Placeholder for logo */}
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span className="block font-bold text-2xl text-dark">{product.arr}</span>
                    <span className="text-gray-500">Annual Recurring Revenue</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Total Users</span>
                    <span className="font-semibold text-dark">{product.totalUsers || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Active Users</span>
                    <span className="font-semibold text-dark">{product.activeUsers || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Monthly Recurring Revenue</span>
                    <span className="font-semibold text-dark">
                      {product.arr ? `$${parseInt(product.arr.replace(/[^\d]/g, '')) / 12}` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Average Deal Price</span>
                    <span className="font-semibold text-dark">{product.averageDealPrice || "N/A"}</span>
                  </div>
                </div>
                
                {product.techStack && (
                  <div className="mt-8">
                    <h3 className="font-medium text-dark mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.techStack.split(',').map((tech, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-8">
                  <Button
                    onClick={handleExpressInterest}
                    className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-blue-600"
                  >
                    Express Interest
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6 bg-gray-50">
              <CardContent className="p-8">
                <h3 className="font-medium text-dark mb-4">IP & Legal Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-500">IP Ownership</span>
                    <span className="font-semibold text-dark">{product.ipOwnership || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Registered Trademarks</span>
                    <span className="font-semibold text-dark">{product.registeredTrademarks || "None"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Patents</span>
                    <span className="font-semibold text-dark">{product.patents || "None"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
