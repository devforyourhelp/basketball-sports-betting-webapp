
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Trophy } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center court-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Gateway to
            <span className="basketball-gradient bg-clip-text text-transparent"> Basketball Betting</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Experience the thrill of live betting with real-time odds, expert insights, and massive payouts
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button onClick={onGetStarted} size="lg" className="bet-button text-lg px-8 py-3">
              Start Betting Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Watch Live Games
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="game-card text-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="w-12 h-12 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Odds</h3>
              <p className="text-muted-foreground">Real-time betting odds that update as the game unfolds</p>
            </div>

            <div className="game-card text-center animate-fade-in" style={{animationDelay: '0.8s'}}>
              <div className="w-12 h-12 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">Join thousands of bettors and share winning strategies</p>
            </div>

            <div className="game-card text-center animate-fade-in" style={{animationDelay: '1s'}}>
              <div className="w-12 h-12 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Big Wins</h3>
              <p className="text-muted-foreground">Competitive odds and massive payouts on every game</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
