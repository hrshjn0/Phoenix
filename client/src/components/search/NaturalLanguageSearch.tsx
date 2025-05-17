import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";

interface NaturalLanguageSearchProps {
  initialQuery: string;
  onSearch: (query: string) => void;
  explanation?: string;
}

export default function NaturalLanguageSearch({ initialQuery, onSearch, explanation }: NaturalLanguageSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim().length === 0) return;
    
    setIsSearching(true);
    // Add slight delay to show loading state
    setTimeout(() => {
      onSearch(searchQuery);
      setIsSearching(false);
    }, 800);
  };

  return (
    <Card className="w-full mb-6 shadow-md">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium text-dark">
              Describe your investment interests
            </h3>
          </div>
          
          <p className="text-gray-500 text-sm">
            Tell us in your own words what type of tech product you're looking to invest in.
          </p>
          
          <Textarea 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              disabled={isSearching || searchQuery.trim().length === 0}
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
  );
}