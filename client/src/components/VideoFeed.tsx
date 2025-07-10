import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import type { Story } from "@shared/schema";

interface StoryWithPerspectives extends Omit<Story, 'perspectiveLeft' | 'perspectiveCenter' | 'perspectiveRight'> {
  perspectives: {
    left: string;
    center: string;
    right: string;
  };
}

const VideoFeed = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPerspectives, setShowPerspectives] = useState<number | null>(null);

  const { data: stories = [], isLoading, error } = useQuery({
    queryKey: ['/api/stories'],
    queryFn: async (): Promise<Story[]> => {
      const response = await fetch('/api/stories');
      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      return response.json();
    }
  });

  // Transform database stories to match component interface
  const transformedStories: StoryWithPerspectives[] = stories.map(story => ({
    ...story,
    perspectives: {
      left: story.perspectiveLeft,
      center: story.perspectiveCenter,
      right: story.perspectiveRight
    }
  }));

  if (isLoading) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading stories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load stories</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </section>
    );
  }

  if (transformedStories.length === 0) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No stories available</p>
        </div>
      </section>
    );
  }

  const story = transformedStories[currentStory];

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