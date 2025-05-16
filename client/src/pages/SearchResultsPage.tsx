import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function SearchResultsPage() {
  const [location] = useLocation();
  const queryParams = new URLSearchParams(location.split('?')[1] || '');
  
  const [searchQuery, setSearchQuery] = useState(queryParams.get('q') || '');
  const [industry, setIndustry] = useState(queryParams.get('industry') || 'All Industries');
  const [age, setAge] = useState(queryParams.get('age') || 'Any Age');
  const [revenue, setRevenue] = useState(queryParams.get('revenue') || 'Any Revenue');
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'query':
        setSearchQuery(value);
        break;
      case 'industry':
        setIndustry(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'revenue':
        setRevenue(value);
        break;
      default:
        break;
    }
  };

  const filteredProducts = () => {
    if (!products) return [];
    
    return products.filter(product => {
      const matchesSearchQuery = !searchQuery || 
        product.headline.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesIndustry = industry === 'All Industries' || product.industry === industry;
      const matchesAge = age === 'Any Age' || product.age === age;
      
      // Simple revenue filtering based on string patterns
      const matchesRevenue = revenue === 'Any Revenue' || 
        (revenue === '$0-50K ARR' && product.arr && parseInt(product.arr.replace(/[^\d]/g, '')) <= 50000) ||
        (revenue === '$50-250K ARR' && product.arr && parseInt(product.arr.replace(/[^\d]/g, '')) > 50000 && parseInt(product.arr.replace(/[^\d]/g, '')) <= 250000) ||
        (revenue === '$250K-1M ARR' && product.arr && parseInt(product.arr.replace(/[^\d]/g, '')) > 250000 && parseInt(product.arr.replace(/[^\d]/g, '')) <= 1000000) ||
        (revenue === '$1M+ ARR' && product.arr && parseInt(product.arr.replace(/[^\d]/g, '')) > 1000000);
      
      return matchesSearchQuery && matchesIndustry && matchesAge && matchesRevenue;
    });
  };

  return (
    <>
      <Helmet>
        <title>Search Results | Phoenix</title>
        <meta name="description" content="Browse tech products available for investment on Phoenix. Filter by industry, age, and revenue to find your next investment opportunity." />
        <meta property="og:title" content="Search Results | Phoenix" />
        <meta property="og:description" content="Find your next tech product investment on Phoenix." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Search Results Header */}
          <div className="bg-dark">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Search Results</h1>
                {searchQuery && (
                  <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                    Showing results for: <span className="font-semibold text-white">"{searchQuery}"</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <SearchFilters 
            searchQuery={searchQuery}
            industry={industry}
            age={age}
            revenue={revenue}
            onFilterChange={handleFilterChange}
          />

          <SearchResults 
            products={filteredProducts()}
            isLoading={isLoading}
            error={error}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
