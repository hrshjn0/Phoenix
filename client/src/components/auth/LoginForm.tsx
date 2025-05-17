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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { loginUserSchema } from "@shared/schema";

type FormValues = z.infer<typeof loginUserSchema>;

interface LoginFormProps {
  userType: "buyer" | "seller";
  onLoginSuccess?: () => void;
}

export default function LoginForm({ userType, onLoginSuccess }: LoginFormProps) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
      role: userType, // Set default role based on userType prop
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('authToken', data.token);
      
      // Dispatch event to notify AuthContext of the change
      window.dispatchEvent(new Event('auth-changed'));
      
      // Show success toast
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.user.email}!`,
      });
      
      // Redirect to appropriate page based on user type and role
      if (data.user.role === "buyer") {
        navigate("/buyers");
      } else {
        navigate("/sellers");
      }
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    },
    onError: (error: any) => {
      setAuthError(error?.message || "Login failed. Please check your credentials.");
      toast({
        title: "Login Failed",
        description: error?.message || "Login failed. Please check your credentials.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormValues) {
    setAuthError(null);
    // Ensure that the role is always included in the form submission
    const dataWithRole = {
      ...values,
      role: userType
    };
    loginMutation.mutate(dataWithRole);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {userType === "buyer" ? "Investor/Buyer Login" : "Product Owner Login"}
        </CardTitle>
        <CardDescription>
          {userType === "buyer" 
            ? "Enter your credentials to access investment opportunities" 
            : "Enter your credentials to manage your product listings"}
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
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Hidden field for role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input type="hidden" {...field} value={userType} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 border-t pt-4">
        <div className="text-sm text-gray-500 text-center">
          Don't have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate(`/register?type=${userType}`)}>Register</span>
        </div>
        <div className="text-sm text-primary cursor-pointer hover:underline text-center">
          Forgot password?
        </div>
      </CardFooter>
    </Card>
  );
}