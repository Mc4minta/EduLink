import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Mail, User, GraduationCap, BookOpen } from "lucide-react";

import { ProfessorMatch } from "./ProfessorMatches";
/*
interface Professor {
  id: number;
  name: string;
  department: string;
  researchAreas: string[];
  matchScore: number;
  email: string;
}
*/

const FullRank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const matches = (location.state?.matches || []) as ProfessorMatch[];
  const { projectName, projectTopics, projectDescription } = location.state || {};

  /*
  const allProfessors: Professor[] = [
    // ... removed mock data ...
  ];
  */

  const handleSendEmail = (professor: ProfessorMatch) => {
    const email = professor.email || "professor@university.edu";
    window.location.href = `mailto:${email}?subject=Research Collaboration: ${projectName}`;
  };

  if (!projectName) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">No project data found. Please submit a project first.</p>
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
            onClick={() => navigate("/professor-matches", { state: { projectName, projectTopics, projectDescription, matches } })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Complete Professor Ranking</h1>
            <p className="text-muted-foreground mt-1">
              All {matches.length} professors ranked by match score
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

        {/* Professor Results */}
        <div className="space-y-4">
          {matches.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No matches found to rank.
            </div>
          ) : (
            matches.map((professor, index) => (
              <Card key={professor.author_id} className="shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                            #{index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                              <GraduationCap className="h-5 w-5 text-primary" />
                              {professor.professor_name}
                            </h3>
                            {professor.department && (
                              <p className="text-sm text-muted-foreground mt-1">{professor.department}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{(professor.score * 100).toFixed(0)}%</div>
                          <p className="text-xs text-muted-foreground">Match Score</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Topic Overlaps:</p>
                        <div className="flex flex-wrap gap-2">
                          {(professor.topics_set || []).slice(0, 5).map((area, areaIndex) => (
                            <Badge key={areaIndex} variant="outline">
                              {area}
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
