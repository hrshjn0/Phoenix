import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeaturedListings() {
  const mockListings = [
    {
      id: 1,
      title: "SaaS Customer Feedback Platform",
      description: "Established platform with 5,000+ active users and $250K ARR. Built with React, Node.js and MongoDB.",
      industry: "SaaS",
      ageRange: "3-5 years",
      revenue: "$250K ARR"
    },
    {
      id: 2,
      title: "E-learning Marketplace with 25K Users",
      description: "Profitable online learning platform connecting experts with students. Mobile apps for iOS and Android.",
      industry: "Education",
      ageRange: "5+ years",
      revenue: "$380K ARR"
    },
    {
      id: 3,
      title: "Subscription Analytics Dashboard",
      description: "SaaS tool helping subscription businesses track and optimize customer metrics. Growing 15% MoM.",
      industry: "SaaS",
      ageRange: "1-2 years",
      revenue: "$120K ARR"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">Featured Listings</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Browse some of our top opportunities currently available.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockListings.map(listing => (
            <Card key={listing.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">{listing.title}</CardTitle>
                  <Badge variant="outline" className="bg-gray-100">
                    {listing.industry}
                  </Badge>
                </div>
                <CardDescription>{listing.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Age</p>
                    <p className="font-medium">{listing.ageRange}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-medium">{listing.revenue}</p>
                  </div>

                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 mt-auto">
                <Button asChild className="w-full">
                  <Link href="/login/buyer">
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/login/buyer">
              View All Listings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}