import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { User, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { updateStudentProfile, StudentProfile } from "@/services/studentService";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    bio: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setStudentId(user.id);
      setUserEmail(user.email || null);
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!studentId) {
      toast({ title: "Error", description: "Not authenticated", variant: "destructive" });
      return;
    }

    try {
      const payload: StudentProfile = {
        student_id: studentId,
        email: userEmail,
        name: formData.name,
        department: formData.department,
        bio: formData.bio,
        interests: [] // Setup doesn't ask for interests yet
      };

      await updateStudentProfile(payload);

      toast({
        title: "Profile saved!",
        description: "Welcome to your dashboard!",
      });
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Could not save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-[var(--shadow-card)] animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl">Set Up Your Profile</CardTitle>
          <CardDescription>
            Tell us about yourself to get personalized matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-12"
              />
            </div>

            {/* Department/Major */}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Department / Major
              </Label>
              <Input
                id="department"
                placeholder="e.g., Computer Science, Biology, Psychology"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
                className="h-12"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-base">
                Short Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us a bit about yourself, your academic background, and what you're looking for..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={5}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save & Continue →"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
