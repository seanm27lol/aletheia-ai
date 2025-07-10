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
        <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-strong overflow-hidden">
          {/* Story Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary text-primary-foreground">
                {story.topic}
              </Badge>
              {story.verified && (
                <Badge className="bg-verified text-verified-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              <div className="flex items-center gap-4 text-muted-foreground text-sm ml-auto">
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
            
            <h1 className="text-2xl font-bold text-foreground mb-3 leading-tight">
              {story.title}
            </h1>
            
            <p className="text-muted-foreground text-base leading-relaxed">
              {story.summary}
            </p>
          </div>

          {/* Video/Media Area */}
          <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary">
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
              <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
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
          <div className="p-6 space-y-4">
            <h4 className="text-xl font-semibold text-card-foreground mb-4">Multiple Perspectives</h4>
            
            <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20">
              <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Progressive Viewpoint</h5>
              <p className="text-sm text-card-foreground leading-relaxed">
                {story.perspectives.left}
              </p>
            </Card>
            
            <Card className="p-4 border-l-4 border-l-purple-500 bg-purple-50 dark:bg-purple-900/20">
              <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Moderate Viewpoint</h5>
              <p className="text-sm text-card-foreground leading-relaxed">
                {story.perspectives.center}
              </p>
            </Card>
            
            <Card className="p-4 border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20">
              <h5 className="font-semibold text-red-700 dark:text-red-400 mb-2">Conservative Viewpoint</h5>
              <p className="text-sm text-card-foreground leading-relaxed">
                {story.perspectives.right}
              </p>
            </Card>
            
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-card-foreground mb-2">Sources:</p>
              <div className="flex flex-wrap gap-2">
                {story.sources.map((source, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="p-6 border-t border-border">
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStory(Math.max(0, currentStory - 1))}
                disabled={currentStory === 0}
              >
                Previous Story
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {currentStory + 1} of {transformedStories.length}
              </span>
              
              <Button 
                variant="outline"
                onClick={() => setCurrentStory(Math.min(transformedStories.length - 1, currentStory + 1))}
                disabled={currentStory === transformedStories.length - 1}
              >
                Next Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoFeed;