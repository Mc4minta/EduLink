import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Sparkles, X, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const ResearchInterests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [interests, setInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [matchRank, setMatchRank] = useState<number | null>(null);

  const handleAddInterest = () => {
    if (inputValue.trim() && !interests.includes(inputValue.trim())) {
      setInterests([...interests, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddInterest();
    }
  };

  const calculateMatch = () => {
    if (interests.length === 0) {
      toast({
        title: "Add interests first",
        description: "Please add at least one research interest to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    // Simulate AI calculation
    setTimeout(() => {
      // Mock calculation based on number of interests
      const rank = Math.min(95, 60 + interests.length * 7 + Math.random() * 10);
      setMatchRank(Math.round(rank));
      setIsCalculating(false);
      
      toast({
        title: "Match rank calculated!",
        description: `You have a ${Math.round(rank)}% compatibility with available professors.`,
      });
    }, 2000);
  };

  const handleViewMatches = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-[var(--shadow-card)] animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-secondary" />
          </div>
          <CardTitle className="text-3xl">Research Interests</CardTitle>
          <CardDescription>
            Tell us what you're passionate about researching
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-2">
            <Label htmlFor="interest" className="text-base">
              Add your research interests or topics
            </Label>
            <div className="flex gap-2">
              <Input
                id="interest"
                placeholder="e.g., Machine Learning, Climate Change, Neuroscience"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-12"
              />
              <Button
                type="button"
                onClick={handleAddInterest}
                className="h-12 px-6"
              >
                Add
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Press Enter or click Add to save each interest
            </p>
          </div>

          {/* Interests Display */}
          {interests.length > 0 && (
            <div className="space-y-2">
              <Label className="text-base">Your Interests ({interests.length})</Label>
              <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg min-h-[80px]">
                {interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-2 px-3 pr-2 flex items-center gap-2"
                  >
                    {interest}
                    <button
                      onClick={() => handleRemoveInterest(interest)}
                      className="hover:bg-background/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Calculate Match Button */}
          <Button
            onClick={calculateMatch}
            disabled={isCalculating || interests.length === 0}
            className="w-full h-12 text-base"
          >
            {isCalculating ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Calculating Match...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-4 w-4" />
                Calculate My Match Rank
              </>
            )}
          </Button>

          {/* Match Rank Display */}
          {matchRank !== null && (
            <div className="space-y-4 p-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 rounded-xl border border-primary/20 animate-scale-in">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Your Match Rank</Label>
                  <p className="text-sm text-muted-foreground">
                    Based on your research interests
                  </p>
                </div>
                <div className="text-4xl font-bold text-primary">
                  {matchRank}%
                </div>
              </div>
              <Progress value={matchRank} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {matchRank >= 80
                  ? "Excellent! You have high compatibility with several professors."
                  : matchRank >= 60
                  ? "Good match! We found several compatible professors for you."
                  : "We found some matches. Try adding more interests to improve your rank."}
              </p>
              <Button
                onClick={handleViewMatches}
                className="w-full h-12 text-base"
                variant="default"
              >
                View My Matches →
              </Button>
            </div>
          )}

          {/* Help Text */}
          {matchRank === null && (
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 Add 3-5 research interests for the best matching results
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchInterests;
