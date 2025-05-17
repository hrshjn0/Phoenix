import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import BuyersPage from "@/pages/BuyersPage";
import SellersPage from "@/pages/SellersPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import ContactPage from "@/pages/ContactPage";
import ProductQuestionnairePage from "@/pages/ProductQuestionnairePage";
import SearchResultsPage from "@/pages/SearchResultsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import MessagingPage from "@/pages/MessagingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/buyers" component={BuyersPage} />
              <Route path="/sellers" component={SellersPage} />
              <Route path="/how-it-works" component={HowItWorksPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/product-questionnaire" component={ProductQuestionnairePage} />
              <Route path="/search" component={SearchResultsPage} />
              <Route path="/product/:id" component={ProductDetailPage} />
              <Route path="/messaging/:id" component={MessagingPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route component={NotFound} />
            </Switch>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
