
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
        
        {/* New Sections for Longer Landing Page */}
        
        {/* How It Works Section */}
        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground">Get started in just 3 simple steps</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
                <p className="text-muted-foreground">Create your account in seconds and get a welcome bonus</p>
              </div>
              
              <div className="text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="w-16 h-16 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Choose Games</h3>
                <p className="text-muted-foreground">Browse live and upcoming games with real-time odds</p>
              </div>
              
              <div className="text-center animate-fade-in" style={{animationDelay: '0.6s'}}>
                <div className="w-16 h-16 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Place Bets & Win</h3>
                <p className="text-muted-foreground">Place your bets and watch your winnings grow</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CourtBet?</h2>
              <p className="text-xl text-muted-foreground">The ultimate basketball betting experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="game-card text-center p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Instant Payouts</h3>
                <p className="text-muted-foreground text-sm">Get your winnings instantly with our fast payout system</p>
              </div>
              
              <div className="game-card text-center p-6">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold mb-2">Secure & Safe</h3>
                <p className="text-muted-foreground text-sm">Bank-grade security keeps your funds and data protected</p>
              </div>
              
              <div className="game-card text-center p-6">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-semibold mb-2">Mobile Ready</h3>
                <p className="text-muted-foreground text-sm">Bet anywhere, anytime with our responsive mobile design</p>
              </div>
              
              <div className="game-card text-center p-6">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-lg font-semibold mb-2">Daily Bonuses</h3>
                <p className="text-muted-foreground text-sm">Earn daily bonuses and special promotions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-xl text-muted-foreground">Join thousands of satisfied bettors</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="game-card p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-muted-foreground mb-4">"Best betting platform I've used. The live odds are incredibly accurate and payouts are super fast!"</p>
                <div className="flex items-center">
                  <div className="text-xl mr-3">🏀</div>
                  <div>
                    <p className="font-semibold">Mike Johnson</p>
                    <p className="text-sm text-muted-foreground">Professional Bettor</p>
                  </div>
                </div>
              </div>
              
              <div className="game-card p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-muted-foreground mb-4">"Love the user interface and the live betting feature. Made $5,000 last month!"</p>
                <div className="flex items-center">
                  <div className="text-xl mr-3">💪</div>
                  <div>
                    <p className="font-semibold">Sarah Davis</p>
                    <p className="text-sm text-muted-foreground">Top Bettor</p>
                  </div>
                </div>
              </div>
              
              <div className="game-card p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-muted-foreground mb-4">"Customer support is amazing and the mobile app works perfectly. Highly recommend!"</p>
                <div className="flex items-center">
                  <div className="text-xl mr-3">🎯</div>
                  <div>
                    <p className="font-semibold">Alex Chen</p>
                    <p className="text-sm text-muted-foreground">Daily User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 basketball-gradient">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Winning?</h2>
            <p className="text-xl text-white/90 mb-8">Join CourtBet today and get a $100 welcome bonus!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleRegisterClick} size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3">
                Get Started Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </section>
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
