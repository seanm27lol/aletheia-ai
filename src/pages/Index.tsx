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
  const [currentView, setCurrentView] = useState<'hero' | 'feed' | 'about'>('hero');

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

  if (currentView === 'about') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                  Our Mission
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                  How Aletheia Works
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  AI-powered fact-checking meets Gen Z engagement to combat misinformation
                  and restore trust in news media.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI Fact-Checking</h3>
                  <p className="text-muted-foreground">
                    Advanced AI analyzes multiple sources to verify claims and identify potential misinformation.
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Multiple Perspectives</h3>
                  <p className="text-muted-foreground">
                    Every story shows progressive, moderate, and conservative viewpoints to promote understanding.
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
                  <div className="w-16 h-16 bg-verified rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Engaging Format</h3>
                  <p className="text-muted-foreground">
                    Short-form videos designed for Gen Z attention spans without sacrificing accuracy.
                  </p>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={() => setCurrentView('feed')}
                  className="group"
                >
                  Try Aletheia Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
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
              Why Aletheia?
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
              <h3 className="text-lg font-semibold mb-2">100% Verified</h3>
              <p className="text-muted-foreground text-sm">
                Every story is fact-checked against multiple credible sources
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Eye className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Transparent Sources</h3>
              <p className="text-muted-foreground text-sm">
                Clear attribution to original reporting and primary sources
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <BookOpen className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">All Perspectives</h3>
              <p className="text-muted-foreground text-sm">
                See how different political viewpoints interpret the same events
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <TrendingUp className="w-10 h-10 text-warning mb-4" />
              <h3 className="text-lg font-semibold mb-2">Trending Stories</h3>
              <p className="text-muted-foreground text-sm">
                Stay updated on the most important current events
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
                onClick={() => setCurrentView('about')}
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
