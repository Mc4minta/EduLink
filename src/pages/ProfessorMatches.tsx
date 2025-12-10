import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Mail, User, GraduationCap, BookOpen, Loader2 } from "lucide-react";
import { apiClient, Professor } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const MatchingResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projectName, projectTopics, projectDescription, studentId } = location.state || {};

  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectName || !studentId) {
      setError("No project data found. Please submit a project first.");
      return;
    }

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.matchProfessors(studentId, "tfidf", 10);

        if (response.success && response.data.matches) {
          setProfessors(response.data.matches);
          toast({
            title: "Success",
            description: `Found ${response.data.matches.length} matching professors`,
          });
        } else {
          setError("Failed to fetch professor matches");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch matches";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [projectName, studentId, toast]);

  if (error && !projectName) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Top Professor Matches</h1>
            <p className="text-muted-foreground mt-1">
              Showing {loading ? "loading..." : professors.length} professors matching your project
            </p>
          </div>
        </div>

        {/* Project Summary Card */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {projectName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Topics:</p>
              <div className="flex flex-wrap gap-2">
                {projectTopics?.map((topic: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
            {projectDescription && (
              <div>
                <p className="text-sm font-medium mb-1">Description:</p>
                <p className="text-sm text-muted-foreground">{projectDescription}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Finding the best professor matches...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Professor Results */}
        {!loading && professors.length > 0 && (
          <div className="space-y-4">
            {professors.slice(0, 4).map((professor, index) => (
              <Card key={index} className="shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            {professor.professor_name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {professor.author_id}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {(professor.score * 100).toFixed(0)}%
                          </div>
                          <p className="text-xs text-muted-foreground">Match Score</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Specialization:</p>
                        <div className="flex flex-wrap gap-2">
                          {professor.topics_set?.split(",").map((topic, idx) => (
                            <Badge key={idx} variant="outline">
                              {topic.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Progress value={professor.score * 100} className="h-2" />
                    </div>

                    <div className="flex lg:flex-col gap-2 lg:w-40">
                      <Button
                        variant="outline"
                        className="flex-1 lg:w-full gap-2"
                        onClick={() => navigate(`/profile/${professor.author_id}`)}
                      >
                        <User className="h-4 w-4" />
                        View Profile
                      </Button>
                      <Button
                        className="flex-1 lg:w-full gap-2"
                        onClick={() => {
                          window.location.href = `mailto:contact@university.edu?subject=Research Collaboration: ${projectName}`;
                        }}
                      >
                        <Mail className="h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && professors.length === 0 && !error && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">No professor matches found.</p>
            </CardContent>
          </Card>
        )}

        {/* Show Full Rank Button */}
        {professors.length > 4 && (
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/full-rank", { state: { projectName, projectTopics, projectDescription, studentId, professors } })}
              className="gap-2"
            >
              View Full Ranking ({professors.length} results)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingResults;
