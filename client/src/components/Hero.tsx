import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Shield, Users, TrendingUp } from "lucide-react";
import aleLogo from "@assets/AleLogo_1752165763606.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 animate-pulse">
        <div className="w-full h-full bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-md">
          <img 
            src={aleLogo} 
            alt="ALE Logo" 
            className="w-4 h-4 mr-2 object-contain rounded"
          />
          Combating Misinformation with AI
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Truth in the Age of
          <span className="bg-gradient-to-r from-white to-accent-soft bg-clip-text text-transparent">
            {" "}Viral Content
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Get unbiased, fact-based summaries of current events in engaging short-form videos. 
          See every perspective, make informed decisions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" size="xl" className="group">
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Explore Stories
          </Button>
          <Button variant="floating" size="xl">
            Learn How It Works
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <img 
                src={aleLogo} 
                alt="ALE Logo" 
                className="w-6 h-6 mr-2 object-contain rounded"
              />
              <span className="text-3xl font-bold text-white">100%</span>
            </div>
            <p className="text-white/80">Fact-Checked Content</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-white mr-2" />
              <span className="text-3xl font-bold text-white">All</span>
            </div>
            <p className="text-white/80">Perspectives Shown</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-white mr-2" />
              <span className="text-3xl font-bold text-white">0</span>
            </div>
            <p className="text-white/80">Bias in Reporting</p>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-gentle"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Hero;