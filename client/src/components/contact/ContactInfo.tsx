import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">Other Ways to Reach Us</h2>
          <p className="mt-4 text-lg text-gray-500">
            Choose the method that works best for you.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white overflow-hidden shadow">
            <CardContent className="px-4 py-5 sm:p-6 text-center">
              <div className="text-4xl text-primary mb-4 flex justify-center">
                <Mail className="h-10 w-10" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-dark">Email</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>info@phoenixmarketplace.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white overflow-hidden shadow">
            <CardContent className="px-4 py-5 sm:p-6 text-center">
              <div className="text-4xl text-primary mb-4 flex justify-center">
                <Phone className="h-10 w-10" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-dark">Phone</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>+1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white overflow-hidden shadow">
            <CardContent className="px-4 py-5 sm:p-6 text-center">
              <div className="text-4xl text-primary mb-4 flex justify-center">
                <MapPin className="h-10 w-10" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-dark">Office</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>123 Tech Avenue<br />San Francisco, CA 94107</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
