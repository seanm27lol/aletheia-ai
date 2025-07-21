import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import VideoFeed from "@/components/VideoFeed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Shield, 
  Eye, 
  TrendingUp, 
  Users,
  BookOpen,
  ArrowRight,
  Play
} from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'feed'>('hero');

  if (currentView === 'feed') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16">
          <VideoFeed />
        </div>
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <Button 
            variant="floating" 
            onClick={() => setCurrentView('hero')}
            className="shadow-strong"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 bg-gradient-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Why Aletheia AI?
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Unbiased News for the TikTok Generation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bridging the gap between viral content and reliable journalism with AI-powered
              fact-checking and perspective analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-medium transition-all duration-300 animate-fade-in">
              <CheckCircle className="w-10 h-10 text-verified mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI-Generated Content</h3>
              <p className="text-muted-foreground text-sm">
                Staff-reviewed AI articles and videos for maximum objectivity and conciseness
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Eye className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Topic Following</h3>
              <p className="text-muted-foreground text-sm">
                Follow specific topics like National Security or global conflicts for personalized feeds
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <BookOpen className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Creator Economy</h3>
              <p className="text-muted-foreground text-sm">
                Verified creators from major outlets and independent sources with community monitoring
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <TrendingUp className="w-10 h-10 text-warning mb-4" />
              <h3 className="text-lg font-semibold mb-2">Discussion & Debate</h3>
              <p className="text-muted-foreground text-sm">
                Engage in structured discussions while maintaining factual accuracy and civility
              </p>
            </Card>
          </div>
          
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => setCurrentView('feed')}
                className="group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Explore Stories
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => window.location.href = '/about'}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
