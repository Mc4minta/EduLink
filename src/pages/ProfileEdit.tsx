import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, BookOpen, Sparkles, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [interestInput, setInterestInput] = useState("");
  
  // Load user data from Supabase
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    bio: "",
  });

  const [researchInterests, setResearchInterests] = useState<string[]>([]);

  useState(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate("/auth");
          return;
        }

        const { data: student, error } = await supabase
          .from('Student')
          .select('*')
          .eq('student_id', user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        if (student) {
          setFormData({
            name: student.name || "",
            department: student.department || "",
            bio: student.bio || "",
          });
          
          if (student.interests) {
            // Assuming interests is stored as a comma-separated string or JSON
            // Adjust based on actual schema. Handling both for robustness.
            if (Array.isArray(student.interests)) {
                 setResearchInterests(student.interests);
            }
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    fetchProfile();
  });

  const handleAddInterest = () => {
    if (interestInput.trim() && !researchInterests.includes(interestInput.trim())) {
      setResearchInterests([...researchInterests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setResearchInterests(researchInterests.filter((i) => i !== interest));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddInterest();
    }
  };

  const handleSaveInterests = () => {
    setIsDialogOpen(false);
    toast({
      title: "Interests updated!",
      description: "Your research interests have been saved.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save profile.",
          variant: "destructive",
        });
        return;
      }

      const updates = {
        student_id: user.id,
        name: formData.name,
        department: formData.department,
        bio: formData.bio,
        interests: researchInterests, // Supabase usually handles array columns fine if defined as such
        email: user.email, 
      };

      const { error } = await supabase
        .from('Student')
        .upsert(updates);

      if (error) throw error;

      toast({
        title: "Profile updated!",
        description: "Your changes have been saved successfully.",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      const message = error.message || (error instanceof Error ? error.message : "An unknown error occurred");
      toast({
        title: "Error updating profile",
        description: message,
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
          <p className="text-muted-foreground mt-1">
            Update your information to improve your matches
          </p>
        </div>

        <Card className="shadow-[var(--shadow-card)] animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Your Profile</CardTitle>
                <CardDescription>
                  Keep your information up to date
                </CardDescription>
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
                  placeholder="John Doe"
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
                  placeholder="Tell us about yourself, your academic background, and what you're looking for..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={5}
                  className="resize-none"
                />
              </div>

              {/* Research Interests Display */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Research Interests
                  </Label>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                      >
                        Edit Interests
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-primary" />
                          Edit Research Interests
                        </DialogTitle>
                        <DialogDescription>
                          Add or remove your research interests and topics
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        {/* Input Section */}
                        <div className="space-y-2">
                          <Label htmlFor="interest-input">Add new interest</Label>
                          <div className="flex gap-2">
                            <Input
                              id="interest-input"
                              placeholder="e.g., Machine Learning"
                              value={interestInput}
                              onChange={(e) => setInterestInput(e.target.value)}
                              onKeyDown={handleKeyDown}
                            />
                            <Button
                              type="button"
                              size="icon"
                              onClick={handleAddInterest}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Interests List */}
                        <div className="space-y-2">
                          <Label>Your interests ({researchInterests.length})</Label>
                          <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg border min-h-[100px]">
                            {researchInterests.length > 0 ? (
                              researchInterests.map((interest, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-sm py-2 px-3 pr-2 flex items-center gap-2"
                                >
                                  {interest}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveInterest(interest)}
                                    className="hover:bg-background/20 rounded-full p-0.5 transition-colors"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground w-full text-center py-4">
                                No interests added yet
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="button" onClick={handleSaveInterests}>
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg border border-border/50">
                  {researchInterests.length > 0 ? (
                    researchInterests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No research interests added yet
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEdit;
