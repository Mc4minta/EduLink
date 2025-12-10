// src/pages/Dashboard.tsx
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, X, Upload } from "lucide-react";
import config from "@/config";
import { apiClient } from "@/services/api";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isCalculating, setIsCalculating] = useState(false);
  const [isUploadingPDF, setIsUploadingPDF] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    projectTopics: [] as string[],
    projectDescription: "",
  });

  const [topicInput, setTopicInput] = useState("");
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Student ID (can be from auth context in production)
  const [studentId, setStudentId] = useState("");

  useState(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setStudentId(user.id);
      } else {
        // Handle unauthenticated case, maybe redirect?
        // navigate("/auth");
      }
    };
    fetchUser();
  });

  // -------------------------------
  // TOPIC TAG HANDLING
  // -------------------------------
  const handleAddTopic = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && topicInput.trim()) {
      e.preventDefault();
      if (!formData.projectTopics.includes(topicInput.trim())) {
        setFormData({
          ...formData,
          projectTopics: [...formData.projectTopics, topicInput.trim()],
        });
      }
      setTopicInput("");
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setFormData({
      ...formData,
      projectTopics: formData.projectTopics.filter((t) => t !== topic),
    });
  };

  // -------------------------------
  // PDF UPLOAD HANDLER
  // -------------------------------
  const handleUploadPDF = async () => {
    if (!selectedPDF) {
      fileInputRef.current?.click();
      return;
    }

    setIsUploadingPDF(true);

    try {
      const result = await apiClient.extractPDF(selectedPDF);

      if (result.success && result.data) {
        setFormData({
          projectName: result.data.title || "",
          projectTopics: result.data.keywords || [],
          projectDescription: result.data.abstract || "",
        });

        toast({
          title: "PDF Extracted",
          description: "Content filled into the form.",
        });
      } else {
        throw new Error("Failed to extract PDF");
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.message || "Failed to extract PDF content",
        variant: "destructive",
      });
    } finally {
      setIsUploadingPDF(false);
      setSelectedPDF(null);
    }
  };

  // -------------------------------
  // SUBMIT PROJECT FORM
  // -------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.projectName.trim() || formData.projectTopics.length === 0 || !formData.projectDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to find matching professors.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    try {
      // Call backend API to submit project and get matches
      const response = await apiClient.submitProject({
        project_name: formData.projectName,
        project_topics: formData.projectTopics,
        short_description: formData.projectDescription,
        created_by: studentId,
      });

      if (response.status === "success") {
        toast({
          title: "Professors matched!",
          description: `Found ${response.matches?.length || 0} matching professors for your project.`,
        });

        // Navigate to results page with student ID
        navigate("/professor-matches", {
          state: {
            projectName: formData.projectName,
            projectTopics: formData.projectTopics,
            projectDescription: formData.projectDescription,
            studentId: studentId,
          },
        });
      } else {
        throw new Error(response.message || "Failed to match professors");
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.message || "Failed to find matching professors",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Enter your project details to find matching professors
          </p>
        </div>

        <Card className="shadow-[var(--shadow-card)] animate-scale-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Your Research Project</CardTitle>
                <CardDescription>
                  Tell us about your project to get matched with professors
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* PDF UPLOAD */}
              <div className="flex items-center gap-4 p-4 border-2 border-dashed border-border rounded-lg bg-muted/50">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file.type !== "application/pdf") {
                      toast({
                        title: "Invalid File",
                        description: "Please upload a PDF file.",
                        variant: "destructive",
                      });
                      return;
                    }
                    setSelectedPDF(file);
                    toast({ title: "PDF Selected", description: file.name });
                  }}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUploadingPDF}
                  onClick={handleUploadPDF}
                >
                  {isUploadingPDF ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : selectedPDF ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Upload & Extract Content
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Browse PDF
                    </>
                  )}
                </Button>

                <div className="flex-1 text-sm text-muted-foreground truncate">
                  {selectedPDF ? selectedPDF.name : "No file selected"}
                </div>
              </div>

              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-base">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="e.g., AI-Powered Climate Prediction Model"
                  className="h-12"
                />
              </div>

              {/* Project Topics */}
              <div className="space-y-2">
                <Label className="text-base">Project Topics</Label>
                <Input
                  placeholder="Type a topic and press Enter"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={handleAddTopic}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.projectTopics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="px-3 py-1">
                      {topic}
                      <button
                        type="button"
                        className="ml-2 text-xs"
                        onClick={() => handleRemoveTopic(topic)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="projectDescription" className="text-base">
                  Project Description
                </Label>
                <Textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDescription: e.target.value })
                  }
                  rows={5}
                  placeholder="Describe your project in detail..."
                />
              </div>

              <Button type="submit" disabled={isCalculating} className="w-full h-12 text-lg">
                {isCalculating ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Finding Matches...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Find Matching Professors
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
