import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Mail, BookOpen, GraduationCap, Sparkles, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProfessorProfile {
  author_id: string;
  name: string;
  department: string;
  email: string;
  expertise: string[];
  // matchScore is transient, not in DB. We might pass it via route state or fetch match history later.
  // For now, we will omit or display generic info if navigating directly.
  matchScore?: number;
  bio?: string;
}

const ProfileDetail = () => {
  const { id } = useParams(); // This 'id' corresponds to 'author_id' in our new system
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfessorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      setLoading(true);
      try {
        // 1. Fetch Profile Data
        const { data, error } = await supabase
          .from("professors")
          .select("*")
          .eq("author_id", id)
          .single();

        if (error) throw error;

        // 2. Fetch Papers (The "Why")
        // Note: You can add a second query here to 'research_papers' to show their work
        // ignoring that for now as requested simple profile view first.

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <p className="text-muted-foreground mb-4">{error || "Profile not found"}</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return (name || "Unknown")
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
                      <span>{profile.department || "Department Info Not Available"}</span>
                    </div>
                  </div>

                  {/* Match Score Display - Only if available (passed via state or logic) 
                      Currently we don't have this in the GET /professors call.
                  */}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button onClick={() => window.location.href = `mailto:${profile.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  {/* Connect Button or Matches Link could go here */}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content - Left Column (2/3) */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio (Optional, if you add it to the DB later) */}
            {profile.bio && (
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
            )}

            {/* Research Interests (Expertise) */}
            <Card className="shadow-[var(--shadow-card)] animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  Areas of Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(profile.expertise || []).length > 0 ? (
                    profile.expertise.map((interest: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No specific expertise listed.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-6">

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
                      {profile.email || "No email provided"}
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
