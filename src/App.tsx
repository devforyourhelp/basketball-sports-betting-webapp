
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Live from "./pages/Live";
import Matches from "./pages/Matches";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; balance: number } | null>(null);

  const handleAuth = (email: string, password: string, name?: string) => {
    setIsAuthenticated(true);
    setUser({
      name: name || email.split('@')[0],
      balance: 1000.00
    });
  };

  const handleBetClick = (gameId: string, team: string, odds: string) => {
    console.log('Bet clicked:', { gameId, team, odds });
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
  };

  const handleRegisterClick = () => {
    console.log('Register clicked');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/live" 
              element={
                <Live 
                  onLoginClick={handleLoginClick}
                  onRegisterClick={handleRegisterClick}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  onBetClick={handleBetClick}
                />
              } 
            />
            <Route 
              path="/matches" 
              element={
                <Matches 
                  onLoginClick={handleLoginClick}
                  onRegisterClick={handleRegisterClick}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  onBetClick={handleBetClick}
                />
              } 
            />
            <Route 
              path="/leaderboard" 
              element={
                <Leaderboard 
                  onLoginClick={handleLoginClick}
                  onRegisterClick={handleRegisterClick}
                  isAuthenticated={isAuthenticated}
                  user={user}
                />
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
