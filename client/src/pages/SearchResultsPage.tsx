import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import NaturalLanguageSearch from "@/components/search/NaturalLanguageSearch";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Helmet } from "react-helmet";
import { naturalLanguageSearch, generateSearchExplanation } from "@/lib/naturalLanguageSearch";

export default function SearchResultsPage() {
  const [location] = useLocation();
  const queryParams = new URLSearchParams(location.split('?')[1] || '');
  
  // Parse query params
  const initialQuery = queryParams.get('q') || '';
  const initialIndustry = queryParams.get('industry') || 'All Industries';
  const initialAge = queryParams.get('age') || 'Any Age';
  const initialRevenue = queryParams.get('revenue') || 'Any Revenue';
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [industry, setIndustry] = useState(initialIndustry);
  const [age, setAge] = useState(initialAge);
  const [revenue, setRevenue] = useState(initialRevenue);
  const [searchExplanation, setSearchExplanation] = useState('');
  
  // Fetch all products
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Handle filter changes
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
    }
  };
  
  // State for search process
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Generate explanation when search happens
  const updateSearchExplanation = (query: string) => {
    if (query && products && products.length > 0) {
      const nlResults = naturalLanguageSearch(products, query);
      const explanation = generateSearchExplanation(query, nlResults);
      setSearchExplanation(explanation);
      setHasSearched(true);
    } else {
      setSearchExplanation('');
    }
  };
  
  // Memoize the filtered products to avoid recalculation on every render
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // First apply natural language search if there's a query
    let results = searchQuery ? naturalLanguageSearch(products, searchQuery) : [...products];
    
    // Then apply traditional filters
    return results.filter(product => {
      // Industry filter
      const matchesIndustry = industry === 'All Industries' || 
                             product.industry === industry;
                             
      // Age filter
      const matchesAge = age === 'Any Age' || 
                        product.age === age;
      
      // Revenue filter
      let matchesRevenue = revenue === 'Any Revenue';
      if (!matchesRevenue && product.arr) {
        const numericRevenue = parseInt(product.arr.replace(/[^\d]/g, ''));
        
        switch(revenue) {
          case '$0-50K ARR':
            matchesRevenue = numericRevenue <= 50000;
            break;
          case '$50-250K ARR':
            matchesRevenue = numericRevenue > 50000 && numericRevenue <= 250000;
            break;
          case '$250K-1M ARR':
            matchesRevenue = numericRevenue > 250000 && numericRevenue <= 1000000;
            break;
          case '$1M+ ARR':
            matchesRevenue = numericRevenue > 1000000;
            break;
        }
      }
      
      return matchesIndustry && matchesAge && matchesRevenue;
    });
  }, [products, searchQuery, industry, age, revenue]);

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
                {searchExplanation && (
                  <p className="mt-3 text-md text-gray-400 max-w-3xl mx-auto">
                    {searchExplanation}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <NaturalLanguageSearch 
              initialQuery={searchQuery}
              onSearch={(query) => {
                handleFilterChange("query", query);
                updateSearchExplanation(query);
              }}
            />
            
            {/* Search explanation */}
            {searchExplanation && hasSearched && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">{searchExplanation}</p>
              </div>
            )}
            
            <SearchFilters 
              searchQuery={searchQuery}
              industry={industry}
              age={age}
              revenue={revenue}
              onFilterChange={handleFilterChange}
            />
          </div>

          <SearchResults 
            products={filteredProducts}
            isLoading={isLoading}
            error={error as Error}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
