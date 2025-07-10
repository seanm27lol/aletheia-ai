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
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Traditional news media is losing younger audiences who prefer TikTok and Instagram for news. 
                  Aletheia bridges this gap with AI-powered fact-checking in short-form content that Gen Z actually wants to consume.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">AI Bias Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    Get bias scores for news companies, journalists, and stories with detailed explanations.
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Multiple Perspectives</h3>
                  <p className="text-muted-foreground text-sm">
                    Every story shows progressive, moderate, and conservative viewpoints with source links.
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
                  <div className="w-16 h-16 bg-verified rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Short-Form Content</h3>
                  <p className="text-muted-foreground text-sm">
                    TikTok-style videos and posts designed for Gen Z consumption without losing accuracy.
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Browser Extension</h3>
                  <p className="text-muted-foreground text-sm">
                    Scan any article for bias analysis and background context with our AI chatbot.
                  </p>
                </Card>
              </div>

              {/* Problem Statement Section */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-16">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400 border-red-200">
                    The Problem
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    Traditional News Media is Failing Gen Z
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    CNN lost over $400 million in revenue from 2021-2023. Prime-time audiences dropped 47% for CNN and 53% for MSNBC. 
                    Young people get news from TikTok and Instagram, not traditional sources.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Revenue Decline</h3>
                    <p className="text-sm text-muted-foreground">Traditional media losing millions annually</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Audience Shift</h3>
                    <p className="text-sm text-muted-foreground">Gen Z consumes news through social media</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Attention Span</h3>
                    <p className="text-sm text-muted-foreground">Short-form content preferred over long articles</p>
                  </div>
                </div>
              </div>

              {/* Revenue Model Section */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-16">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 border-green-200">
                    Our Solution
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    Sustainable Revenue Through Premium Features
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Aletheia offers both free and premium tiers, plus enterprise solutions for educational institutions.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-400">Free Tier</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Daily short-form updates</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Basic bias analysis</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Limited AI scans</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Premium ($5-10/month)</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" /> Unlimited AI article scans</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" /> Deep bias breakdowns</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" /> Personalized briefings</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" /> Ad-free experience</li>
                    </ul>
                  </div>
                </div>
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
