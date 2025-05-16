import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertProductSchema } from "@shared/schema";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";

// Create the extended schema with validations
const formSchema = insertProductSchema.extend({
  headline: z.string().min(5, {
    message: "Headline must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  features: z.string().min(10, {
    message: "Please list some key features of your product.",
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  age: z.string({
    required_error: "Please select your product's age.",
  }),
  sellerId: z.number().default(1), // Default to 1 for demo purposes
});

type FormValues = z.infer<typeof formSchema>;

export default function QuestionnaireForm() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("preliminary");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: "",
      description: "",
      industry: "",
      age: "",
      features: "",
      totalUsers: "",
      activeUsers: "",
      arr: "",
      techStack: "",
      teamStructure: "",
      growthOpportunities: "",
      reasonForSelling: "",
      sellerId: 1, // Default for demo
      isActive: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await apiRequest("POST", "/api/products", values);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Product Listed",
        description: "Your product has been successfully listed on our marketplace.",
      });
      navigate(`/product/${data.id}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting your product listing. Please try again.",
      });
    },
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="preliminary" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preliminary">Preliminary Information</TabsTrigger>
            <TabsTrigger value="additional">Additional Information</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <TabsContent value="preliminary">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-dark">Preliminary Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          This information will be displayed publicly on your listing.
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="headline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name / Headline</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              A concise title for your product (e.g., "SaaS Email Marketing Platform").
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                rows={5}
                              />
                            </FormControl>
                            <FormDescription>
                              A comprehensive description of your product, its features, and its value proposition.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="SaaS">SaaS</SelectItem>
                                <SelectItem value="E-commerce">E-commerce</SelectItem>
                                <SelectItem value="Content">Content/Media</SelectItem>
                                <SelectItem value="Mobile App">Mobile App</SelectItem>
                                <SelectItem value="Marketplace">Marketplace</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Age</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select age" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                                <SelectItem value="1-2 years">1-2 years</SelectItem>
                                <SelectItem value="3-5 years">3-5 years</SelectItem>
                                <SelectItem value="5+ years">5+ years</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key Features</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                rows={3}
                                placeholder="List the main features separated by commas"
                              />
                            </FormControl>
                            <FormDescription>
                              List the main features of your product that would appeal to potential buyers.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalUsers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Users/Customers</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="e.g., 1,000+"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="activeUsers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Active Users/Customers</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="e.g., 800+"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="arr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Annual Recurring Revenue (ARR)</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="e.g., $120,000"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          onClick={() => setActiveTab("additional")}
                        >
                          Next: Additional Information
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="additional">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-dark">Additional Information (Optional)</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          These details will help create a more comprehensive listing.
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="techStack"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technology Stack</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                rows={3}
                                placeholder="e.g., React, Node.js, MongoDB, AWS"
                              />
                            </FormControl>
                            <FormDescription>
                              Describe the technologies, frameworks, and services used to build and run your product.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teamStructure"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Structure</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                rows={3}
                                placeholder="e.g., 2 developers, 1 designer, 1 customer support"
                              />
                            </FormControl>
                            <FormDescription>
                              Describe your current team structure and any roles that would transfer with the sale.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="growthOpportunities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Growth Opportunities</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                rows={3}
                                placeholder="e.g., Expand to enterprise market, Add mobile app, New geographic markets"
                              />
                            </FormControl>
                            <FormDescription>
                              Describe potential growth areas or opportunities that a new owner could leverage.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="reasonForSelling"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Selling</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                rows={3}
                                placeholder="e.g., Focusing on other ventures, Consolidating product portfolio"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                        <div className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Logo Upload
                        </div>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setActiveTab("preliminary")}
                        >
                          Back to Preliminary Information
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-secondary hover:bg-green-700 text-white"
                          disabled={mutation.isPending}
                        >
                          {mutation.isPending ? "Submitting..." : "Submit Listing"}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
}
