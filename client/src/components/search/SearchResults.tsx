import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@shared/schema";
import { Users, DollarSign } from "lucide-react";

interface SearchResultsProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

export default function SearchResults({ products, isLoading, error }: SearchResultsProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 6;
  
  if (isLoading) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 text-red-500">
            <p>Error loading products. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-500 mb-6">
          Showing {products.length} results
        </div>
        
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentProducts.map((product) => (
                <Card key={product.id} className="bg-white overflow-hidden shadow-md">
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
                        <Users className="h-5 w-5 mr-2" />
                        <span>{product.activeUsers} Active Users</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <DollarSign className="h-5 w-5 mr-2" />
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
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center justify-center">
                  <Button
                    variant="outline"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mx-1"
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      onClick={() => paginate(pageNumber)}
                      className="mx-1"
                    >
                      {pageNumber}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="mx-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mt-12 text-center">
            <div className="mx-auto max-w-lg">
              <h3 className="text-lg font-medium text-dark">No matching products found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or filter criteria to find more products.
              </p>
              <div className="mt-6">
                <Button variant="outline">
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
