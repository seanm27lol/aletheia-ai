import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Search, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BiasAnalysis {
  score: number;
  explanation: string;
  confidence: number;
}

interface PerspectiveAnalysis {
  left: string;
  center: string;
  right: string;
  summary: string;
  biasScore: number;
}

interface FactCheck {
  verifiable: boolean;
  claims: Array<{
    claim: string;
    verifiable: boolean;
    sources_needed: string[];
  }>;
  overall_credibility: number;
}

const AIAnalysis = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [perspectiveResult, setPerspectiveResult] = useState<PerspectiveAnalysis | null>(null);
  const [biasResult, setBiasResult] = useState<BiasAnalysis | null>(null);
  const [factCheckResult, setFactCheckResult] = useState<FactCheck | null>(null);
  const { toast } = useToast();

  const perspectiveMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/analyze/perspectives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: (data) => {
      setPerspectiveResult(data);
      toast({
        title: "Analysis Complete",
        description: "Generated multiple perspectives successfully."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const biasMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/analyze/bias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: (data) => {
      setBiasResult(data);
      toast({
        title: "Bias Analysis Complete",
        description: "Content bias has been analyzed."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Bias Analysis Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const factCheckMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/analyze/factcheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: (data) => {
      setFactCheckResult(data);
      toast({
        title: "Fact-Check Complete",
        description: "Content has been analyzed for verifiable claims."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fact-Check Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const getBiasColor = (score: number) => {
    if (score < -3) return "text-blue-600 dark:text-blue-400";
    if (score > 3) return "text-red-600 dark:text-red-400";
    return "text-purple-600 dark:text-purple-400";
  };

  const getBiasLabel = (score: number) => {
    if (score < -5) return "Strong Left Bias";
    if (score < -2) return "Moderate Left Bias";
    if (score > 5) return "Strong Right Bias";
    if (score > 2) return "Moderate Right Bias";
    return "Balanced/Neutral";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-primary" />
          AI Content Analysis
        </h1>
        <p className="text-muted-foreground">
          Analyze news content for bias, generate multiple perspectives, and fact-check claims
        </p>
      </div>

      {/* Input Form */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Content Input</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter news story title..."
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste news article content here..."
              className="w-full min-h-32"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={() => perspectiveMutation.mutate()}
              disabled={!title || !content || perspectiveMutation.isPending}
              className="flex items-center gap-2"
            >
              {perspectiveMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Generate Perspectives
            </Button>
            <Button
              variant="outline"
              onClick={() => biasMutation.mutate()}
              disabled={!content || biasMutation.isPending}
              className="flex items-center gap-2"
            >
              {biasMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Analyze Bias
            </Button>
            <Button
              variant="outline"
              onClick={() => factCheckMutation.mutate()}
              disabled={!content || factCheckMutation.isPending}
              className="flex items-center gap-2"
            >
              {factCheckMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              Fact-Check
            </Button>
          </div>
        </div>
      </Card>

      {/* Results */}
      {perspectiveResult && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Perspectives</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">AI-Generated Summary</h3>
              <p className="text-muted-foreground bg-muted p-3 rounded">
                {perspectiveResult.summary}
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-4 border-l-4 border-l-blue-500">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  Progressive Viewpoint
                </h4>
                <p className="text-sm">{perspectiveResult.left}</p>
              </Card>
              
              <Card className="p-4 border-l-4 border-l-purple-500">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
                  Moderate Viewpoint
                </h4>
                <p className="text-sm">{perspectiveResult.center}</p>
              </Card>
              
              <Card className="p-4 border-l-4 border-l-red-500">
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                  Conservative Viewpoint
                </h4>
                <p className="text-sm">{perspectiveResult.right}</p>
              </Card>
            </div>
            
            <div className="text-center">
              <Badge className={getBiasColor(perspectiveResult.biasScore)}>
                Content Bias Score: {perspectiveResult.biasScore} ({getBiasLabel(perspectiveResult.biasScore)})
              </Badge>
            </div>
          </div>
        </Card>
      )}

      {biasResult && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Bias Analysis</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className={getBiasColor(biasResult.score)} variant="outline">
                Bias Score: {biasResult.score}
              </Badge>
              <Badge variant="outline">
                Confidence: {(biasResult.confidence * 100).toFixed(0)}%
              </Badge>
            </div>
            <div>
              <h3 className="font-medium mb-2">Analysis</h3>
              <p className="text-muted-foreground">{biasResult.explanation}</p>
            </div>
          </div>
        </Card>
      )}

      {factCheckResult && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Fact-Check Results</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge 
                variant={factCheckResult.verifiable ? "default" : "secondary"}
                className="flex items-center gap-1"
              >
                {factCheckResult.verifiable ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <AlertTriangle className="w-3 h-3" />
                )}
                {factCheckResult.verifiable ? "Contains Verifiable Claims" : "Limited Verifiable Content"}
              </Badge>
              <Badge variant="outline">
                Credibility: {(factCheckResult.overall_credibility * 100).toFixed(0)}%
              </Badge>
            </div>
            
            {factCheckResult.claims.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Identified Claims</h3>
                <div className="space-y-2">
                  {factCheckResult.claims.map((claim, index) => (
                    <Card key={index} className="p-3">
                      <div className="flex items-start gap-2">
                        {claim.verifiable ? (
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{claim.claim}</p>
                          {claim.sources_needed.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Sources needed: {claim.sources_needed.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIAnalysis;