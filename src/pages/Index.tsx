import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Sparkles, GraduationCap, Menu, X } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Edu<span className="text-primary">Link</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <Button 
                variant="default" 
                onClick={() => navigate("/auth")}
                className="rounded-full"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-border">
              <a 
                href="#features" 
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <Button 
                variant="default" 
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-full"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.08),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-primary border border-primary/20">
                <Sparkles className="h-4 w-4" />
                AI-Powered Academic Matching
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl font-extrabold tracking-tight text-foreground md:text-7xl lg:text-8xl leading-tight">
                  Edu<span className="text-primary">Link</span>
                </h1>
                
                <p className="text-2xl text-foreground font-medium md:text-3xl leading-snug">
                  Find your perfect academic match.
                </p>
                
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Connect with professors and mentors who share your research interests. 
                  Let our intelligent matching system guide you to meaningful academic collaborations.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-lg rounded-full shadow-[var(--shadow-soft)] hover:shadow-xl hover:scale-105 transition-all px-8 py-6 h-auto"
                  onClick={() => navigate("/auth")}
                >
                  Start Matching →
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg rounded-full hover:bg-muted/50 transition-all px-8 py-6 h-auto"
                  onClick={() => navigate("/auth")}
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="relative animate-fade-in lg:animate-slide-in-right">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-secondary/15 to-primary/10 rounded-[2rem] blur-3xl animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-border/50">
                <img 
                  src={heroIllustration} 
                  alt="Students and professors connecting through EduLink platform" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How EduLink Works
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Three simple steps to find your ideal academic connection
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div id="features" className="group bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-2 transition-all duration-300 animate-scale-in border border-border/50">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-semibold">
                  Step 1
                </div>
                <h3 className="text-2xl font-bold text-foreground">Share Your Interests</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tell us about your research areas and academic passions. Our AI analyzes your interests to find the best matches.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-2 transition-all duration-300 animate-scale-in border border-border/50" style={{ animationDelay: "0.1s" }}>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-secondary" />
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-secondary/5 text-secondary text-sm font-semibold">
                  Step 2
                </div>
                <h3 className="text-2xl font-bold text-foreground">Get Ranked Matches</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive a personalized list of professors ranked by compatibility with your academic interests and goals.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-2 transition-all duration-300 animate-scale-in border border-border/50" style={{ animationDelay: "0.2s" }}>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-accent/5 text-accent text-sm font-semibold">
                  Step 3
                </div>
                <h3 className="text-2xl font-bold text-foreground">Connect & Collaborate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reach out directly to your matches and start meaningful academic relationships that advance your research.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 rounded-[2.5rem] p-12 md:p-20 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-primary/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--secondary)/0.1),transparent_70%)]" />
            
            <div className="relative space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-primary border border-primary/20">
                <Sparkles className="h-4 w-4" />
                Start Your Journey
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Ready to find your<br />academic match?
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join EduLink today and discover professors who can guide your academic journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="text-lg rounded-full shadow-[var(--shadow-soft)] hover:shadow-xl hover:scale-105 transition-all px-8 py-6 h-auto"
                  onClick={() => navigate("/auth")}
                >
                  Get Started Now →
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg rounded-full hover:bg-muted/50 transition-all px-8 py-6 h-auto"
                  onClick={() => navigate("/auth")}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
