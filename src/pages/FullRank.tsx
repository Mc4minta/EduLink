import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Mail, User, GraduationCap, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface ProfessorMatch {
  professor_name: string;
  author_id: string;
  score: number;
  topics_set: string[];
  email?: string;
  department?: string;
}

const FullRank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const matches = (location.state?.matches || []) as ProfessorMatch[];
  const { projectName, projectTopics, projectDescription } = location.state || {};

  const handleSendEmail = (professor: ProfessorMatch) => {
    const email = professor.email || "professor@university.edu";
    window.location.href = `mailto:${email}?subject=Research Collaboration: ${projectName}`;
  };

  const getInitials = (name: string) => {
    return (name || "U")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!projectName && matches.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">No professor matched</p>
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
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/professor-matches", { state: { projectName, projectTopics, projectDescription, matches } })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Top Matches
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Complete Professor Ranking</h1>
            <p className="text-muted-foreground mt-1">
              All {matches.length} professors ranked by match score
            </p>
          </div>
        </div>

        {/* Project Summary */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {projectName || "Untitled Project"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Topics:</p>
              <div className="flex flex-wrap gap-2">
                {(projectTopics || []).map((topic: string, index: number) => (
                  <Badge key={index} variant="secondary">{topic}</Badge>
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

        {/* Professor Rankings */}
        <div className="space-y-4">
          {matches.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No matches found to rank.</div>
          ) : (
            matches.map((professor, index) => (
              <Card key={professor.author_id} className="shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">{getInitials(professor.professor_name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                              <span className="text-muted-foreground text-base font-normal">#{index + 1}</span>
                              {professor.professor_name}
                            </h3>
                            {professor.department && (
                              <p className="text-sm text-muted-foreground mt-1">{professor.department}</p>
                            )}
                          </div>
                        </div>

                        {/* Score display with decimals */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{(professor.score * 100).toFixed(2)}%</div>
                          <p className="text-xs text-muted-foreground">Match Score</p>
                        </div>
                      </div>

                      <div>
                        {professor.topics_set?.length > 0 && <p className="text-sm font-medium mb-2">Expertise / Matched Topics:</p>}
                        <div className="flex flex-wrap gap-2">
                          {(professor.topics_set || []).slice(0, 5).map((area, areaIndex) => (
                            <Badge key={areaIndex} variant="outline">{area}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Progress with tooltip for decimals */}
                      <div className="relative group">
                        <Progress value={professor.score * 100} className="h-2" />
                        <div className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg">
                          {(professor.score * 100).toFixed(2)}%
                        </div>
                      </div>
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
                        onClick={() => handleSendEmail(professor)}
                      >
                        <Mail className="h-4 w-4" />
                        Send Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FullRank;
