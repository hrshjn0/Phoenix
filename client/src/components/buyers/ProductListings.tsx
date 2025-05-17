import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { naturalLanguageSearch, generateSearchExplanation } from "@/lib/naturalLanguageSearch";

export default function ProductListings() {
  const [industry, setIndustry] = useState<string>("All Industries");
  const [age, setAge] = useState<string>("Any Age");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchExplanation, setSearchExplanation] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate a brief delay to show the searching feedback
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      
      if (products && searchTerm) {
        const nlResults = naturalLanguageSearch(products, searchTerm);
        const explanation = generateSearchExplanation(searchTerm, nlResults);
        setSearchExplanation(explanation);
      } else {
        setSearchExplanation("");
      }
    }, 800);
  };

  const filteredProducts = () => {
    if (!products) return [];
    
    // If there's a natural language search term, use it
    if (searchTerm && hasSearched) {
      const results = naturalLanguageSearch(products, searchTerm);
      
      // Then apply standard filters
      return results.filter(product => {
        const matchesIndustry = industry === "All Industries" || product.industry === industry;
        const matchesAge = age === "Any Age" || product.age === age;
        return matchesIndustry && matchesAge;
      });
    }
    
    // Otherwise, just apply standard filters
    return products.filter(product => {
      const matchesIndustry = industry === "All Industries" || product.industry === industry;
      const matchesAge = age === "Any Age" || product.age === age;
      
      if (!hasSearched) {
        // Simple text search when not using natural language
        const matchesText = searchTerm === "" || 
          product.headline.toLowerCase().includes(searchTerm.toLowerCase()) || 
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesIndustry && matchesAge && matchesText;
      }
      
      return matchesIndustry && matchesAge;
    });
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">Available Products</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Browse our curated selection of tech products for investment.</p>
        </div>
        
        {/* Natural Language Search */}
        <Card className="mb-6 shadow-md">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium text-dark">Describe your investment interests</h3>
              </div>
              
              <p className="text-gray-500 text-sm">
                Tell us in your own words what type of tech product you're looking to invest in.
              </p>
              
              <Textarea 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Example: I'm looking for a SaaS product with good revenue growth, at least 2 years in the market, and strong customer retention."
                className="min-h-[100px]"
              />
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  <p>Try: "Profitable e-commerce business" or "Mobile app with 10K+ users"</p>
                </div>
                
                <Button 
                  onClick={handleSearch}
                  className="bg-primary hover:bg-primary/90"
                  disabled={isSearching || searchTerm.trim().length === 0}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Find Products
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Search explanation */}
        {searchExplanation && hasSearched && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">{searchExplanation}</p>
          </div>
        )}

        {/* Filter bar */}
        <div className="mb-6 flex flex-col sm:flex-row justify-start items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Refine by:</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Industries">All Industries</SelectItem>
                <SelectItem value="SaaS">SaaS</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Content">Content</SelectItem>
                <SelectItem value="Marketplace">Marketplace</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={age} onValueChange={setAge}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Any Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any Age">Any Age</SelectItem>
                <SelectItem value="Less than 1 year">0-1 Year</SelectItem>
                <SelectItem value="1-2 years">1-2 Years</SelectItem>
                <SelectItem value="3-5 years">3-5 Years</SelectItem>
                <SelectItem value="5+ years">5+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product grid */}
        {isLoading ? (
          <div className="mt-8 text-center">
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="mt-8 text-center text-red-500">
            <p>Error loading products. Please try again later.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts().length > 0 ? (
              filteredProducts().map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.industry}
                        </span>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {product.age}
                        </span>
                      </div>

                    </div>
                    <Link href={`/product/${product.id}`} className="mt-4 block">
                      <h3 className="text-xl font-semibold text-dark hover:text-primary">{product.headline}</h3>
                      <p className="mt-3 text-base text-gray-500 line-clamp-3">
                        {product.description}
                      </p>
                    </Link>
                    <div className="mt-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{product.activeUsers} Active Users</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{product.arr}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild variant="outline" className="text-primary border-primary hover:bg-blue-50">
                        <Link href={`/product/${product.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No matching products found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria to find more products.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setIndustry("All Industries");
                    setAge("Any Age");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        )}

        {filteredProducts().length > 3 && (
          <div className="mt-12 text-center">
            <Button>
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
