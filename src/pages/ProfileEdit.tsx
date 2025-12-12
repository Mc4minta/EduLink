import { useState, useEffect } from "react";

import { supabase } from "@/integrations/supabase/client";
import { fetchStudentProfile, updateStudentProfile, StudentProfile } from "@/services/studentService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/contexts/ProfileContext";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { refetchProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);

  const [studentId, setStudentId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    bio: "",
  });

  const [dbName, setDbName] = useState<string | null>(null);

  // 1. Get user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setStudentId(user.id);
        setUserEmail(user.email || null);
      }
    };
    getUser();
  }, []);

  // 2. Load profile
  useEffect(() => {
    if (!studentId) return;

    const loadProfile = async () => {
      try {
        const { data } = await fetchStudentProfile(studentId);

        setFormData({
          name: data.name || "",
          department: data.department || "",
          bio: data.bio || "",
        });

        setDbName(data.name || null);

      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    loadProfile();
  }, [studentId]);

  // 3. Save profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!studentId) throw new Error("Missing Student ID");

      const payload: StudentProfile = {
        student_id: studentId,
        email: userEmail,
        name: formData.name,
        department: formData.department,
        bio: formData.bio,
      };

      await updateStudentProfile(payload);

      // Refetch profile to update sidebar
      await refetchProfile();

      toast({
        title: "Profile updated!",
        description: "Your changes have been saved successfully.",
      });

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground mt-1">Update your information</p>
        </div>

        <Card className="shadow-[var(--shadow-card)] animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Your Profile</CardTitle>
                <CardDescription>Keep your information up to date</CardDescription>
              </div>
            </div>
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
                  placeholder={dbName || "Your full name"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" className="text-base flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Department / Major
                </Label>
                <Input
                  id="department"
                  placeholder="e.g., Computer Engineering"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-base">Short Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ProfileEdit;
