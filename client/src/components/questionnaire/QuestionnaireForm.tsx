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
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  category: z.string({
    required_error: "Please select a product category.",
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  businessModel: z.string({
    required_error: "Please specify if your product is B2B, B2C, or both.",
  }),
  launchYear: z.string({
    required_error: "Please select the year your product was launched.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  features: z.string().min(10, {
    message: "Please list some key features of your product.",
  }),
  logo: z.string().optional(),
  
  // Optional fields with appropriate validations
  thirdPartyRating: z.string().optional(),
  numberOfClients: z.string().optional(),
  totalUsers: z.string().optional(),
  activeUsers: z.string().optional(),
  revenue: z.string().optional(),
  averageDealSize: z.string().optional(),
  averageSalesCycle: z.string().optional(),
  investmentHistory: z.string().optional(),
  techStack: z.string().optional(),
  ipDetails: z.string().optional(),
  parentCompanyBackground: z.string().optional(),
  additionalDetails: z.string().optional(),
  brochureUrl: z.string().optional(),
  
  // Backend fields
  sellerId: z.number().default(1), // Will be replaced with actual user ID
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function QuestionnaireForm() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("preliminary");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      industry: "",
      businessModel: "",
      launchYear: "",
      description: "",
      features: "",
      logo: "",
      isActive: true,
      
      // Optional fields
      thirdPartyRating: "",
      numberOfClients: "",
      totalUsers: "",
      activeUsers: "",
      revenue: "",
      averageDealSize: "",
      averageSalesCycle: "",
      investmentHistory: "",
      techStack: "",
      ipDetails: "",
      parentCompanyBackground: "",
      additionalDetails: "",
      brochureUrl: "",
      
      // For backward compatibility
      headline: "",
      age: "",
      growthOpportunities: "",
      reasonForSelling: "",
      teamStructure: "",
      
      // Will get the actual user ID from context
      sellerId: 1,
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

                      {/* Required fields */}
                      <div className="mb-6 pb-4 border-b border-gray-200">
                        <h4 className="text-sm font-semibold text-blue-600 mb-4">Required Information</h4>
                        
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                The name of your product as it should appear to investors.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="SaaS">Software as a Service (SaaS)</SelectItem>
                                    <SelectItem value="Mobile App">Mobile Application</SelectItem>
                                    <SelectItem value="E-commerce">E-commerce Platform</SelectItem>
                                    <SelectItem value="Content Platform">Content Platform</SelectItem>
                                    <SelectItem value="Marketplace">Marketplace</SelectItem>
                                    <SelectItem value="AI/ML">AI/ML Solution</SelectItem>
                                    <SelectItem value="Analytics">Analytics Tool</SelectItem>
                                    <SelectItem value="DevOps">DevOps Tool</SelectItem>
                                    <SelectItem value="Hardware">Hardware Product</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
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
                                    <SelectItem value="Technology">Technology</SelectItem>
                                    <SelectItem value="Finance">Finance</SelectItem>
                                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                                    <SelectItem value="Education">Education</SelectItem>
                                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                                    <SelectItem value="Travel">Travel</SelectItem>
                                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                    <SelectItem value="Retail">Retail</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <FormField
                            control={form.control}
                            name="businessModel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Model</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select business model" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="B2B">B2B (Business to Business)</SelectItem>
                                    <SelectItem value="B2C">B2C (Business to Consumer)</SelectItem>
                                    <SelectItem value="Both">Both B2B and B2C</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="launchYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year of Launch</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select launch year" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from({ length: 25 }, (_, i) => {
                                      const year = new Date().getFullYear() - i;
                                      return <SelectItem key={year} value={year.toString()}>{year}</SelectItem>;
                                    })}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mt-6">
                          <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 rounded-lg border border-gray-200">
                                <div className="space-y-0.5">
                                  <FormLabel>Product Status</FormLabel>
                                  <FormDescription>
                                    Is this product currently active and being maintained?
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Select
                                    onValueChange={(value) => field.onChange(value === "true")}
                                    defaultValue={field.value ? "true" : "false"}
                                  >
                                    <SelectTrigger className="w-32">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="true">Active</SelectItem>
                                      <SelectItem value="false">Inactive</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mt-6">
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    rows={5}
                                    placeholder="Provide a comprehensive description of your product, including its purpose, target audience, and how it solves problems for users."
                                  />
                                </FormControl>
                                <FormDescription>
                                  A detailed description of your product, its value proposition, and core functionality.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mt-6">
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
                                    placeholder="List the main features of your product, one per line or separated by commas"
                                  />
                                </FormControl>
                                <FormDescription>
                                  The main features and capabilities that make your product valuable to users.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mt-6">
                          <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product Logo</FormLabel>
                                <FormControl>
                                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      id="logo-upload"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          // In a real implementation, you'd upload the file to a server
                                          // and update the field value with the URL
                                          field.onChange(`/uploads/${file.name}`);
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor="logo-upload"
                                      className="cursor-pointer flex flex-col items-center justify-center py-4"
                                    >
                                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                      <span className="text-sm font-medium text-gray-600">
                                        Click to upload your product logo
                                      </span>
                                      <span className="text-xs text-gray-400 mt-1">
                                        SVG, PNG, or JPG (max. 2MB)
                                      </span>
                                    </label>
                                    {field.value && (
                                      <div className="mt-2 text-sm text-blue-600">
                                        <span>File selected: {field.value.split('/').pop()}</span>
                                      </div>
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

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
                          Brochure Upload
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
                                PDF, PNG, JPG up to 10MB
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
