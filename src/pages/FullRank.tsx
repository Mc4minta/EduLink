import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Mail, User, GraduationCap, BookOpen } from "lucide-react";

interface Professor {
  id: number;
  name: string;
  department: string;
  researchAreas: string[];
  matchScore: number;
  email: string;
}

const FullRank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectName, projectTopics, projectDescription } = location.state || {};

  // Full professor data with match scores
  const allProfessors: Professor[] = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      department: "Computer Science",
      researchAreas: ["Machine Learning", "AI Ethics", "Natural Language Processing"],
      matchScore: 95,
      email: "sarah.chen@university.edu"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      department: "Data Science",
      researchAreas: ["Deep Learning", "Computer Vision", "Neural Networks"],
      matchScore: 88,
      email: "m.rodriguez@university.edu"
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      department: "Information Systems",
      researchAreas: ["Human-Computer Interaction", "UX Research", "AI Applications"],
      matchScore: 82,
      email: "e.watson@university.edu"
    },
    {
      id: 4,
      name: "Dr. James Kim",
      department: "Computer Science",
      researchAreas: ["Robotics", "AI", "Machine Learning"],
      matchScore: 78,
      email: "j.kim@university.edu"
    },
    {
      id: 5,
      name: "Dr. Lisa Zhang",
      department: "Data Science",
      researchAreas: ["Statistical Learning", "Data Mining", "Predictive Analytics"],
      matchScore: 75,
      email: "l.zhang@university.edu"
    },
    {
      id: 6,
      name: "Dr. Robert Brown",
      department: "Computer Science",
      researchAreas: ["Software Engineering", "Cloud Computing", "DevOps"],
      matchScore: 72,
      email: "r.brown@university.edu"
    },
    {
      id: 7,
      name: "Dr. Maria Garcia",
      department: "Information Systems",
      researchAreas: ["Database Systems", "Data Warehousing", "Business Intelligence"],
      matchScore: 68,
      email: "m.garcia@university.edu"
    },
    {
      id: 8,
      name: "Dr. David Lee",
      department: "Computer Science",
      researchAreas: ["Cybersecurity", "Network Security", "Cryptography"],
      matchScore: 65,
      email: "d.lee@university.edu"
    }
  ];

  const handleSendEmail = (professor: Professor) => {
    window.location.href = `mailto:${professor.email}?subject=Research Collaboration: ${projectName}`;
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
            onClick={() => navigate("/professor-matches", { state: { projectName, projectTopics, projectDescription } })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Complete Professor Ranking</h1>
            <p className="text-muted-foreground mt-1">
              All {allProfessors.length} professors ranked by match score
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
          {allProfessors.map((professor, index) => (
            <Card key={professor.id} className="shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow">
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
                            {professor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{professor.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{professor.matchScore}%</div>
                        <p className="text-xs text-muted-foreground">Match Score</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Research Areas:</p>
                      <div className="flex flex-wrap gap-2">
                        {professor.researchAreas.map((area, areaIndex) => (
                          <Badge key={areaIndex} variant="outline">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Progress value={professor.matchScore} className="h-2" />
                  </div>

                  <div className="flex lg:flex-col gap-2 lg:w-40">
                    <Button
                      variant="outline"
                      className="flex-1 lg:w-full gap-2"
                      onClick={() => navigate(`/profile/${professor.id}`)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullRank;
