import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Heart, 
  Share2, 
  BookOpen, 
  CheckCircle, 
  Eye, 
  Clock,
  MoreHorizontal
} from "lucide-react";

interface Story {
  id: string;
  title: string;
  summary: string;
  duration: string;
  views: string;
  topic: string;
  perspectives: {
    left: string;
    center: string;
    right: string;
  };
  sources: string[];
  verified: boolean;
  thumbnail: string;
}

const mockStories: Story[] = [
  {
    id: "1",
    title: "Climate Summit 2024: Key Agreements Reached",
    summary: "World leaders agree on new carbon reduction targets, but implementation details spark debate across political spectrum.",
    duration: "2:34",
    views: "1.2M",
    topic: "Environment",
    perspectives: {
      left: "Agreements don't go far enough - urgent action needed",
      center: "Balanced approach considering economic impacts",
      right: "Concerns about economic costs and feasibility"
    },
    sources: ["Reuters", "BBC", "AP News"],
    verified: true,
    thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=600&fit=crop"
  },
  {
    id: "2", 
    title: "New Healthcare Policy Debate",
    summary: "Proposed healthcare reforms face mixed reactions as lawmakers weigh coverage expansion against budget concerns.",
    duration: "3:12",
    views: "890K",
    topic: "Healthcare",
    perspectives: {
      left: "Essential for expanding access to underserved communities",
      center: "Support reform but need sustainable funding mechanisms",
      right: "Prefer market-based solutions over government expansion"
    },
    sources: ["CNN", "Fox News", "NPR"],
    verified: true,
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=600&fit=crop"
  }
];

const VideoFeed = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPerspectives, setShowPerspectives] = useState<string | null>(null);

  const story = mockStories[currentStory];

  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-card rounded-2xl shadow-strong overflow-hidden">
          {/* Video Area */}
          <div className="relative aspect-[9/16] bg-gradient-to-br from-muted to-secondary">
            <img 
              src={story.thumbnail} 
              alt={story.title}
              className="w-full h-full object-cover"
            />
            
            {/* Play/Pause Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="floating"
                size="icon"
                className="w-16 h-16 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </Button>
            </div>
            
            {/* Story Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground">
                  {story.topic}
                </Badge>
                {story.verified && (
                  <Badge className="bg-verified text-verified-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-1 leading-tight">
                {story.title}
              </h3>
              <p className="text-white/80 text-sm mb-2">
                {story.summary}
              </p>
              
              <div className="flex items-center gap-4 text-white/70 text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {story.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {story.views}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="p-4 border-b border-border">
            <div className="flex justify-around">
              <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
                <Heart className="w-5 h-5 mb-1" />
                <span className="text-xs">Like</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
                <Share2 className="w-5 h-5 mb-1" />
                <span className="text-xs">Share</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-col h-auto py-2"
                onClick={() => setShowPerspectives(showPerspectives ? null : story.id)}
              >
                <BookOpen className="w-5 h-5 mb-1" />
                <span className="text-xs">Perspectives</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
                <MoreHorizontal className="w-5 h-5 mb-1" />
                <span className="text-xs">More</span>
              </Button>
            </div>
          </div>
          
          {/* Perspectives Panel */}
          {showPerspectives === story.id && (
            <div className="p-4 space-y-3 animate-slide-up">
              <h4 className="font-semibold text-card-foreground mb-3">Key Perspectives</h4>
              
              <Card className="p-3 border-l-4 border-l-perspective-left bg-perspective-left/5">
                <p className="text-sm text-card-foreground">
                  <span className="font-medium text-perspective-left">Progressive: </span>
                  {story.perspectives.left}
                </p>
              </Card>
              
              <Card className="p-3 border-l-4 border-l-perspective-center bg-perspective-center/5">
                <p className="text-sm text-card-foreground">
                  <span className="font-medium text-perspective-center">Moderate: </span>
                  {story.perspectives.center}
                </p>
              </Card>
              
              <Card className="p-3 border-l-4 border-l-perspective-right bg-perspective-right/5">
                <p className="text-sm text-card-foreground">
                  <span className="font-medium text-perspective-right">Conservative: </span>
                  {story.perspectives.right}
                </p>
              </Card>
              
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Sources:</p>
                <div className="flex flex-wrap gap-1">
                  {story.sources.map((source, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <div className="p-4 flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStory(Math.max(0, currentStory - 1))}
              disabled={currentStory === 0}
            >
              Previous
            </Button>
            <span className="flex items-center text-sm text-muted-foreground">
              {currentStory + 1} of {mockStories.length}
            </span>
            <Button 
              variant="outline"
              onClick={() => setCurrentStory(Math.min(mockStories.length - 1, currentStory + 1))}
              disabled={currentStory === mockStories.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoFeed;