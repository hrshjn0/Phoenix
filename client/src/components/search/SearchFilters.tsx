import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  industry: string;
  age: string;
  revenue: string;
  onFilterChange: (filterType: string, value: string) => void;
}

export default function SearchFilters({
  industry,
  age,
  revenue,
  onFilterChange
}: SearchFiltersProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-md font-medium">Refine results by:</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <Select value={industry} onValueChange={(value) => onFilterChange("industry", value)}>
              <SelectTrigger className="w-full">
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
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Age</label>
            <Select value={age} onValueChange={(value) => onFilterChange("age", value)}>
              <SelectTrigger className="w-full">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue</label>
            <Select value={revenue} onValueChange={(value) => onFilterChange("revenue", value)}>
              <SelectTrigger className="w-full">
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
        </div>
      </div>
    </div>
  );
}
