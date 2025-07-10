import Navigation from "@/components/Navigation";
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
  Play,
  Globe,
  MessageCircle,
  Smartphone
} from "lucide-react";
import { Link } from "wouter";

const About = () => {
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
                  <Globe className="w-8 h-8 text-white" />
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

            {/* Key Features Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                  Platform Features
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Built for the Next Generation
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive tools designed specifically for how Gen Z consumes and processes information.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">AI-Generated Media</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Staff-reviewed AI articles and videos created for maximum objectivity and conciseness.
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Video content created by AI bots or co-founder Theodore Dematatis using edited AI scripts.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Creator Network</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Verified creators from major outlets (Fox, CNN, MSNBC) and independent sources.
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Creators monitored for disinformation with community-style fact-checking notes.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Browser Extension</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Perform Aletheia AI scans of any article for bias analysis and background context.
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Access to Ale Chat Bot for detailed explanations and clarifications.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Discussion Boards</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Structured debates and discussions with community moderation.
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Balanced approach between diverse perspectives and factual accuracy.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="text-center">
              <Link href="/">
                <Button 
                  variant="hero" 
                  size="xl"
                  className="group mr-4"
                >
                  <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Get Started
                </Button>
              </Link>
              <Link href="/feed">
                <Button 
                  variant="outline" 
                  size="xl"
                  className="group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Try the Feed
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;