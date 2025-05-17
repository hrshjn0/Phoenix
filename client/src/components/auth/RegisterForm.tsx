import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { registerUserSchema } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = z.infer<typeof registerUserSchema>;

interface RegisterFormProps {
  initialUserType?: "buyer" | "seller";
  onRegisterSuccess?: () => void;
}

export default function RegisterForm({ initialUserType = "buyer", onRegisterSuccess }: RegisterFormProps) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      password: "",
      role: initialUserType,
      businessName: "",
      firstName: "",
      lastName: ""
    },
  });
  
  // We'll use the initialUserType directly from props instead of watching the form value
  const userType = initialUserType;

  const registerMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('authToken', data.token);
      
      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      
      // Redirect to appropriate page based on user type and role
      if (data.user.role === "buyer") {
        navigate("/buyers");
      } else {
        navigate("/sellers");
      }
      
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    },
    onError: (error: any) => {
      setAuthError(error?.message || "Registration failed. Please try again.");
      toast({
        title: "Registration Failed",
        description: error?.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormValues) {
    setAuthError(null);
    registerMutation.mutate(values);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>
          {userType === "buyer" 
            ? "Register as an investor to access investment opportunities" 
            : "Register as a product owner to list your digital products"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {authError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {authError}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Role is hidden and automatically set based on URL parameter */}
            <input type="hidden" {...form.register("role")} />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a strong password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {userType === "seller" && (
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 border-t pt-4">
        <div className="text-sm text-gray-500 text-center">
          Already have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate(`/login?type=${userType}`)}>Login</span>
        </div>
      </CardFooter>
    </Card>
  );
}