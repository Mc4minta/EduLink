import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Sparkles,
  GraduationCap,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark Mode State
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Edu<span className="text-primary">Link</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </a>

              {/* Desktop Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

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

              {/* Mobile Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

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
                  Connect with professors and mentors who share your research
                  interests. Let our intelligent matching system guide you to
                  meaningful academic collaborations.
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
    </div>
  );
};

export default Index;
