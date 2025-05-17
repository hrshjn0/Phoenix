import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

interface NaturalLanguageSearchProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

export default function NaturalLanguageSearch({ initialQuery, onSearch }: NaturalLanguageSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-dark mb-2">
              Describe what you're looking for
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Tell us about the type of tech product you're interested in investing in. Be as specific as possible about your requirements.
            </p>
          </div>
          
          <Textarea 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Example: I'm looking for a SaaS product with steady revenue growth, at least 3 years in the market, and good customer retention. Preferably in the B2B space with a small but efficient team."
            className="min-h-[120px]"
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Products
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            <p>Try queries like:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>"SaaS business with high growth potential and a proven revenue model"</li>
              <li>"Established mobile app with at least 10,000 active users in the education sector"</li>
              <li>"E-commerce platform that's been profitable for at least 2 years"</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}