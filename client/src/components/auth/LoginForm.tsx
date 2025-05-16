import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  userType: "buyer" | "seller";
  onLoginSuccess?: () => void;
}

export default function LoginForm({ userType, onLoginSuccess }: LoginFormProps) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormValues) {
    // This is a mock login, so we'll just simulate a successful login
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success toast
      toast({
        title: "Login Successful",
        description: `Welcome back, ${values.email}!`,
      });
      
      // Redirect to appropriate page based on user type
      if (userType === "buyer") {
        navigate("/buyers");
      } else {
        navigate("/sellers");
      }
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 1000);
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 border-t pt-4">
        <div className="text-sm text-gray-500 text-center">
          Don't have an account? <span className="text-primary cursor-pointer hover:underline">Register</span>
        </div>
        <div className="text-sm text-primary cursor-pointer hover:underline text-center">
          Forgot password?
        </div>
      </CardFooter>
    </Card>
  );
}