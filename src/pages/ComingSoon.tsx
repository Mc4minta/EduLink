import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import comingSoonImage from "@/assets/coming-soon.png";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 shadow-[var(--shadow-card)] animate-fade-in text-center">
        <img
          src={comingSoonImage}
          alt="Coming Soon"
          className="w-64 h-64 mx-auto mb-8 rounded-2xl"
        />
        
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Professor Portal Coming Soon! 🎓
        </h1>
        
        <p className="text-xl text-muted-foreground mb-6">
          We're building your space next!
        </p>
        
        <p className="text-base text-muted-foreground max-w-md mx-auto mb-8">
          Our team is working hard to create an amazing experience for professors. 
          You'll soon be able to connect with passionate students who share your research interests.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <Button
            onClick={() => window.location.href = "mailto:support@edulink.com"}
            className="gap-2"
          >
            <Mail className="h-4 w-4" />
            Get Notified
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Expected launch: <span className="font-semibold text-foreground">Q2 2024</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ComingSoon;
