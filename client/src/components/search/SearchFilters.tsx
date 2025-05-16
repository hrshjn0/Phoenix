import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  industry: string;
  age: string;
  revenue: string;
  onFilterChange: (filterType: string, value: string) => void;
}

export default function SearchFilters({
  searchQuery,
  industry,
  age,
  revenue,
  onFilterChange
}: SearchFiltersProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-sm text-gray-500">Filter by:</span>
            <Select value={industry} onValueChange={(value) => onFilterChange("industry", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Industries">All Industries</SelectItem>
                <SelectItem value="SaaS">SaaS</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Content">Content</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="Marketplace">Marketplace</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={age} onValueChange={(value) => onFilterChange("age", value)}>
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

            <Select value={revenue} onValueChange={(value) => onFilterChange("revenue", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Any Revenue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any Revenue">Any Revenue</SelectItem>
                <SelectItem value="$0-50K ARR">$0-50K ARR</SelectItem>
                <SelectItem value="$50-250K ARR">$50-250K ARR</SelectItem>
                <SelectItem value="$250K-1M ARR">$250K-1M ARR</SelectItem>
                <SelectItem value="$1M+ ARR">$1M+ ARR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <div className="relative rounded-md shadow-sm">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => onFilterChange("query", e.target.value)}
                className="sm:w-64"
                placeholder="Search products..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
