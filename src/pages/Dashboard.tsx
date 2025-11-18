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

interface Professor {
  id: string;
  name: string;
  department: string;
  email: string;
  matchScore: number;
  expertise: string[];
}

const mockProfessors: Professor[] = [
  { id: "1", name: "Dr. Sarah Chen", department: "Computer Science", email: "s.chen@university.edu", matchScore: 95, expertise: ["Machine Learning", "AI", "Data Science"] },
  { id: "2", name: "Dr. Michael Roberts", department: "Engineering", email: "m.roberts@university.edu", matchScore: 88, expertise: ["Robotics", "AI Systems", "Control Theory"] },
  { id: "3", name: "Dr. Emily Thompson", department: "Applied Mathematics", email: "e.thompson@university.edu", matchScore: 82, expertise: ["Optimization", "Statistical Modeling", "Data Analysis"] },
  { id: "4", name: "Dr. James Wilson", department: "Computer Science", email: "j.wilson@university.edu", matchScore: 78, expertise: ["Natural Language Processing", "Deep Learning"] },
  { id: "5", name: "Dr. Lisa Anderson", department: "Information Systems", email: "l.anderson@university.edu", matchScore: 72, expertise: ["Data Mining", "Business Intelligence", "Analytics"] },
];

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
    const data = new FormData();
    data.append("file", selectedPDF);

    try {
      const res = await fetch(`${config.API_BASE_URL}/pdf/extract`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      setFormData({
        projectName: result.projectName,
        projectTopics: result.projectTopics,
        projectDescription: result.projectDescription,
      });

      toast({
        title: "PDF Extracted",
        description: "Content filled into the form.",
      });
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

    setTimeout(() => {
      const sorted = [...mockProfessors].sort((a, b) => b.matchScore - a.matchScore);
      setIsCalculating(false);

      toast({
        title: "Professors matched!",
        description: `Found ${sorted.length} matching professors for your project.`,
      });

      navigate("/professor-matches", {
        state: {
          projectName: formData.projectName,
          projectTopics: formData.projectTopics,
          projectDescription: formData.projectDescription,
        },
      });
    }, 1500);
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
                <Label htmlFor="projectName" className="text-base">Project Name</Label>
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
                  className="h-12"
                />

                {formData.projectTopics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.projectTopics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="px-3 py-1 text-sm">
                        {topic}
                        <button
                          type="button"
                          className="ml-2 hover:text-destructive"
                          onClick={() => handleRemoveTopic(topic)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="projectDescription" className="text-base">Short Project Description</Label>
                <Textarea
                  id="projectDescription"
                  rows={6}
                  className="resize-none"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Describe your project goals, methodology, and what you hope to achieve..."
                />
              </div>

              <Button type="submit" disabled={isCalculating} className="w-full h-12 text-base">
                {isCalculating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Finding Professors...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
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
