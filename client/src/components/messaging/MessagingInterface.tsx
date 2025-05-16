import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { User } from "lucide-react";

interface MessagingInterfaceProps {
  productId: number;
}

interface Message {
  id: number;
  sender: "buyer" | "seller";
  content: string;
  timestamp: Date;
}

export default function MessagingInterface({ productId }: MessagingInterfaceProps) {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");
  
  // Fetch product details
  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId
  });

  // For demo purposes, we'll use static messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "seller",
      content: "Thank you for your interest in our product! I'd be happy to provide more information or answer any questions you have.",
      timestamp: new Date(Date.now() - 3600000 * 3) // 3 hours ago
    },
    {
      id: 2,
      sender: "buyer",
      content: "Hi there! I'm interested in learning more about your customer base. Could you share some information about the industries your users come from and your customer retention rates?",
      timestamp: new Date(Date.now() - 3600000 * 2) // 2 hours ago
    },
    {
      id: 3,
      sender: "seller",
      content: "Of course! Our customer base is primarily split across three main industries: 45% SaaS companies, 30% e-commerce, and 15% financial services, with the remaining 10% spread across various sectors.\n\nRegarding retention, we're proud of our 85% annual retention rate. Our monthly churn is approximately 3.2%, which we've been steadily improving over the past year through enhanced onboarding and customer success initiatives.\n\nWould you like me to share more specific information about customer acquisition costs or the typical sales cycle?",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: messages.length + 1,
      sender: "buyer",
      content: newMessage.trim(),
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    // Show a toast notification
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the seller.",
    });
  };

  if (productLoading) {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>Loading conversation...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
          {/* Product summary */}
          {product && (
            <div className="p-4 bg-gray-100 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-dark">
                    {product.headline}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.industry} | {product.arr} | {product.age}
                  </p>
                </div>
                <div className="ml-auto">
                  <Link href={`/product/${productId}`} className="text-primary text-sm hover:text-blue-700">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Message history */}
          <div className="p-4 h-96 overflow-y-auto bg-white">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'buyer' ? 'justify-end' : ''}`}>
                  {message.sender === "seller" && (
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                  )}
                  <div className={`${message.sender === 'buyer' ? 'mr-3 flex flex-col items-end' : 'ml-3'}`}>
                    <p className="text-sm font-medium text-dark">
                      {message.sender === "buyer" ? "You" : "Product Owner"}
                    </p>
                    <div className={`mt-1 text-sm ${message.sender === 'buyer' ? 'text-white bg-primary' : 'text-gray-700 bg-gray-100'} p-3 rounded-lg ${message.sender === 'buyer' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  {message.sender === "buyer" && (
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              <div className="flex-1">
                <Textarea 
                  rows={3} 
                  placeholder="Type your message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="resize-none"
                />
              </div>
              <div className="ml-3 flex-shrink-0 flex items-start">
                <Button onClick={handleSendMessage}>
                  Send
                </Button>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              All messages are confidential between you and the product owner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
