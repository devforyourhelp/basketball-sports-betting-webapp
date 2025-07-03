
import React, { useState } from 'react';
import Header from '@/components/Header';
import LiveTicker from '@/components/LiveTicker';
import HeroSection from '@/components/HeroSection';
import FeaturedGames from '@/components/FeaturedGames';
import StatsSection from '@/components/StatsSection';
import BetSlip from '@/components/BetSlip';
import AuthModal from '@/components/AuthModal';
import { useToast } from '@/hooks/use-toast';

interface Bet {
  id: string;
  team: string;
  odds: string;
  stake: number;
}

interface User {
  name: string;
  balance: number;
}

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);
  const [bets, setBets] = useState<Bet[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleLoginClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  const handleAuth = (email: string, password: string, name?: string) => {
    // Simulate authentication
    setIsAuthenticated(true);
    setUser({
      name: name || email.split('@')[0],
      balance: 1000.00
    });
    setIsAuthModalOpen(false);
    
    toast({
      title: "Welcome to CourtBet!",
      description: `Successfully ${authMode === 'login' ? 'signed in' : 'created account'}`,
    });
  };

  const handleBetClick = (gameId: string, team: string, odds: string) => {
    const existingBetIndex = bets.findIndex(bet => 
      bet.id === `${gameId}-${team}`
    );

    if (existingBetIndex >= 0) {
      toast({
        title: "Bet Updated",
        description: `Updated bet for ${team}`,
      });
      return;
    }

    const newBet: Bet = {
      id: `${gameId}-${team}`,
      team,
      odds,
      stake: 0
    };

    setBets([...bets, newBet]);
    setIsBetSlipOpen(true);
    
    toast({
      title: "Bet Added",
      description: `Added ${team} to your bet slip`,
    });
  };

  const handleRemoveBet = (betId: string) => {
    setBets(bets.filter(bet => bet.id !== betId));
    toast({
      title: "Bet Removed",
      description: "Bet removed from slip",
    });
  };

  const handleUpdateStake = (betId: string, stake: number) => {
    setBets(bets.map(bet => 
      bet.id === betId ? { ...bet, stake } : bet
    ));
  };

  const handlePlaceBets = () => {
    const totalStake = bets.reduce((sum, bet) => sum + bet.stake, 0);
    
    if (user && user.balance >= totalStake) {
      setUser({ ...user, balance: user.balance - totalStake });
      setBets([]);
      setIsBetSlipOpen(false);
      
      toast({
        title: "Bets Placed Successfully!",
        description: `${bets.length} bet(s) placed for $${totalStake.toFixed(2)}`,
      });
    } else {
      toast({
        title: "Insufficient Balance",
        description: "Please add funds to your account",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        isAuthenticated={isAuthenticated}
        user={user}
      />
      
      <div className="pt-16">
        <LiveTicker />
        <HeroSection onGetStarted={handleRegisterClick} />
        <FeaturedGames onBetClick={handleBetClick} />
        <StatsSection />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onAuth={handleAuth}
      />

      <BetSlip
        bets={bets}
        onRemoveBet={handleRemoveBet}
        onUpdateStake={handleUpdateStake}
        onPlaceBets={handlePlaceBets}
        isOpen={isBetSlipOpen}
        onClose={() => setIsBetSlipOpen(false)}
      />

      {/* Floating Bet Slip Button */}
      {bets.length > 0 && (
        <button
          onClick={() => setIsBetSlipOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse-glow z-40"
        >
          Bet Slip ({bets.length})
        </button>
      )}
    </div>
  );
};

export default Index;
