import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Mail, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data - matches Dashboard mock data
const mockProfiles: Record<string, any> = {
  "1": {
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    interests: ["Machine Learning", "AI Ethics", "Neural Networks", "Data Mining"],
    matchScore: 95,
    email: "sarah.johnson@university.edu",
    bio: "I'm passionate about advancing machine learning techniques while ensuring they're developed and deployed ethically. My research focuses on creating AI systems that are both powerful and responsible.",
    publications: 47,
    students: 12,
    experience: "15+ years",
  },
  "2": {
    name: "Prof. Michael Chen",
    department: "Data Science",
    interests: ["Deep Learning", "Computer Vision", "Robotics", "Image Processing"],
    matchScore: 88,
    email: "michael.chen@university.edu",
    bio: "My work centers on developing advanced computer vision systems for autonomous robotics. I believe in the potential of deep learning to revolutionize how machines perceive and interact with the world.",
    publications: 63,
    students: 18,
    experience: "20+ years",
  },
  "3": {
    name: "Dr. Emily Rodriguez",
    department: "Artificial Intelligence",
    interests: ["Natural Language Processing", "Machine Learning", "AI Safety", "Computational Linguistics"],
    matchScore: 85,
    email: "emily.rodriguez@university.edu",
    bio: "I specialize in natural language processing with a focus on AI safety and alignment. My goal is to ensure AI systems understand and communicate with humans in safe and beneficial ways.",
    publications: 38,
    students: 10,
    experience: "12+ years",
  },
  "4": {
    name: "Prof. David Kim",
    department: "Computer Science",
    interests: ["Reinforcement Learning", "Game AI", "Neural Networks", "Decision Systems"],
    matchScore: 82,
    email: "david.kim@university.edu",
    bio: "My research explores reinforcement learning and its applications in complex decision-making systems. I'm particularly interested in how AI can learn optimal strategies through interaction with dynamic environments.",
    publications: 52,
    students: 15,
    experience: "18+ years",
  },
};

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = mockProfiles[id || "1"];

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <p className="text-muted-foreground mb-4">Profile not found</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Matches</Button>
        </Card>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 animate-fade-in"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Profile Header Card */}
        <Card className="mb-6 shadow-[var(--shadow-card)] animate-scale-in">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                  <div>
                    <CardTitle className="text-3xl mb-2">{profile.name}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>{profile.department}</span>
                    </div>
                  </div>
                  
                  <div className="text-left md:text-right">
                    <p className="text-sm text-muted-foreground mb-1">Match Score</p>
                    <p className="text-4xl font-bold text-primary">{profile.matchScore}%</p>
                  </div>
                </div>
                
                <Progress value={profile.matchScore} className="h-2 mb-4" />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => window.location.href = `mailto:${profile.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button variant="outline">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content - Left Column (2/3) */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <Card className="shadow-[var(--shadow-card)] animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
              </CardContent>
            </Card>

            {/* Research Interests */}
            <Card className="shadow-[var(--shadow-card)] animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  Research Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="shadow-[var(--shadow-card)] animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Academic Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Experience</p>
                  <p className="text-lg font-semibold">{profile.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Publications</p>
                  <p className="text-lg font-semibold">{profile.publications}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Students</p>
                  <p className="text-lg font-semibold">{profile.students}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="shadow-[var(--shadow-card)] animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-primary hover:underline break-all"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
