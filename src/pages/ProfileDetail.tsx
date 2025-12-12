import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Mail,
  BookOpen,
  GraduationCap,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// ---------- ExpertiseCard Component ----------
interface ExpertiseCardProps {
  expertise: string[];
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ expertise }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_VISIBLE = 5;
  const displayedExpertise = expanded ? expertise : expertise.slice(0, MAX_VISIBLE);

  return (
    <Card className="shadow-lg rounded-xl backdrop-blur-sm bg-white/30 border border-white/20 p-4 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="h-5 w-5 text-secondary" />
          Areas of Expertise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {displayedExpertise.map((item, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-sm py-2 px-3 hover:scale-105 transition-transform"
            >
              {item}
            </Badge>
          ))}
        </div>

        {expertise.length > MAX_VISIBLE && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-sm text-primary hover:underline transition-colors"
          >
            {expanded ? "Show Less" : `+${expertise.length - MAX_VISIBLE} More`}
          </button>
        )}
      </CardContent>
    </Card>
  );
};

// ---------- ProfileDetail Component ----------
interface ProfessorProfile {
  author_id: string;
  name: string;
  department: string;
  email: string;
  expertise: string[];
  matchScore?: number;
  bio?: string;
}

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfessorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("professors")
          .select("*")
          .eq("author_id", id)
          .single();
        if (error) throw error;
        setProfile(data);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError("Could not load professor profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const getInitials = (name: string) =>
    (name || "Unknown")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md text-center p-8 shadow-lg rounded-xl">
          <p className="text-muted-foreground mb-4">{error || "Profile not found"}</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Profile Header */}
        <Card className="mb-6 shadow-lg rounded-2xl backdrop-blur-sm bg-white/30 border border-white/20 p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <Avatar className="h-28 w-28 ring-4 ring-primary/30 shadow-lg">
              <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            {profile.matchScore !== undefined && (
              <div className="absolute -bottom-2 -right-2">
                <Progress
                  value={profile.matchScore}
                  className="h-12 w-12 rounded-full"
                />
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <CardTitle className="text-3xl font-bold mb-1">{profile.name}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>{profile.department || "Department Info Not Available"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-transform"
                onClick={() => (window.location.href = `mailto:${profile.email}`)}
              >
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:scale-105 transition-transform"
                onClick={() => navigator.clipboard.writeText(profile.email)}
              >
                Copy Email
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {profile.bio && (
              <Card className="shadow-lg rounded-xl backdrop-blur-sm bg-white/30 border border-white/20 p-4 animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <BookOpen className="h-5 w-5 text-primary" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                </CardContent>
              </Card>
            )}

            <ExpertiseCard expertise={profile.expertise || []} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg rounded-xl backdrop-blur-sm bg-white/30 border border-white/20 p-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-primary hover:underline break-all"
                  >
                    {profile.email || "No email provided"}
                  </a>
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
