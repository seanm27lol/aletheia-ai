import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Home, 
  Play, 
  TrendingUp, 
  Settings, 
  Shield,
  Search
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">TruthScope</span>
            <Badge className="bg-verified text-verified-foreground text-xs">
              Beta
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Stories</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">
              How It Works
            </Button>
            <Button variant="hero">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start">
                <Home className="w-4 h-4 mr-3" />
                Home
              </Button>
              <Button variant="ghost" className="justify-start">
                <Play className="w-4 h-4 mr-3" />
                Stories
              </Button>
              <Button variant="ghost" className="justify-start">
                <TrendingUp className="w-4 h-4 mr-3" />
                Trending
              </Button>
              <Button variant="ghost" className="justify-start">
                <Search className="w-4 h-4 mr-3" />
                Search
              </Button>
              <Button variant="ghost" className="justify-start">
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
              <div className="pt-2 border-t border-border">
                <Button variant="outline" className="w-full mb-2">
                  How It Works
                </Button>
                <Button variant="hero" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;