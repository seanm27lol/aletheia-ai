import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router } from "wouter";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import VideoFeed from "./components/VideoFeed";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Route path="/" component={Index} />
        <Route path="/about" component={About} />
        <Route path="/feed" component={() => (
          <div className="min-h-screen bg-background">
            <Navigation />
            <div className="pt-16">
              <VideoFeed />
            </div>
          </div>
        )} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route component={NotFound} />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
