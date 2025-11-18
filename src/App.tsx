// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ProfileSetup from "./pages/ProfileSetup";
import ResearchInterests from "./pages/ResearchInterests";
import ComingSoon from "./pages/ComingSoon";

import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProfileDetail from "./pages/ProfileDetail";
import ProfileEdit from "./pages/ProfileEdit";
import ProfessorMatches from "./pages/ProfessorMatches";
import FullRank from "./pages/FullRank";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/auth"
          element={
            <PageTransition>
              <Auth />
            </PageTransition>
          }
        />
        <Route
          path="/profile-setup"
          element={
            <PageTransition>
              <ProfileSetup />
            </PageTransition>
          }
        />
        <Route
          path="/research-interests"
          element={
            <PageTransition>
              <ResearchInterests />
            </PageTransition>
          }
        />
        <Route
          path="/coming-soon"
          element={
            <PageTransition>
              <ComingSoon />
            </PageTransition>
          }
        />

        {/* Protected routes with DashboardLayout */}
        {/* No path on layout! It wraps all nested routes */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <Dashboard />
              </PageTransition>
            }
          />
          <Route
            path="/profile"
            element={
              <PageTransition>
                <ProfileEdit />
              </PageTransition>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <PageTransition>
                <ProfileDetail />
              </PageTransition>
            }
          />
          <Route
            path="/professor-matches"
            element={
              <PageTransition>
                <ProfessorMatches />
              </PageTransition>
            }
          />
          <Route
            path="/full-rank"
            element={
              <PageTransition>
                <FullRank />
              </PageTransition>
            }
          />
        </Route>

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
