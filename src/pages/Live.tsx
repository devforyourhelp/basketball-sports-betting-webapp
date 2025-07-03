
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import LiveTicker from '@/components/LiveTicker';
import GameCard from '@/components/GameCard';
import { useToast } from '@/hooks/use-toast';
import { Clock, TrendingUp, Users } from 'lucide-react';

interface LivePageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  isAuthenticated?: boolean;
  user?: { name: string; balance: number };
  onBetClick: (gameId: string, team: string, odds: string) => void;
}

const Live: React.FC<LivePageProps> = ({ 
  onLoginClick, 
  onRegisterClick, 
  isAuthenticated, 
  user, 
  onBetClick 
}) => {
  const { toast } = useToast();
  const [liveGames, setLiveGames] = useState([
    {
      id: '1',
      team1: 'Los Angeles Lakers',
      team2: 'Golden State Warriors',
      team1Logo: '🟡',
      team2Logo: '🔵',
      odds1: '+150',
      odds2: '-180',
      time: 'Live Now',
      isLive: true,
      status: '2Q 8:32',
      score: '62-58'
    },
    {
      id: '2',
      team1: 'Boston Celtics',
      team2: 'Miami Heat',
      team1Logo: '🟢',
      team2Logo: '🔴',
      odds1: '+120',
      odds2: '-145',
      time: 'Live Now',
      isLive: true,
      status: '3Q 5:15',
      score: '89-85'
    },
    {
      id: '3',
      team1: 'Chicago Bulls',
      team2: 'Detroit Pistons',
      team1Logo: '🔴',
      team2Logo: '🔵',
      odds1: '-110',
      odds2: '-110',
      time: 'Live Now',
      isLive: true,
      status: '4Q 2:45',
      score: '101-98'
    },
    {
      id: '4',
      team1: 'Phoenix Suns',
      team2: 'Denver Nuggets',
      team1Logo: '🟠',
      team2Logo: '🟦',
      odds1: '+180',
      odds2: '-220',
      time: 'Starting Soon',
      isLive: false,
      status: 'Pre-Game'
    }
  ]);

  useEffect(() => {
    // Simulate live odds updates
    const interval = setInterval(() => {
      setLiveGames(prev => prev.map(game => ({
        ...game,
        odds1: game.isLive ? (Math.random() > 0.5 ? `+${Math.floor(Math.random() * 200 + 100)}` : `-${Math.floor(Math.random() * 200 + 100)}`) : game.odds1,
        odds2: game.isLive ? (Math.random() > 0.5 ? `+${Math.floor(Math.random() * 200 + 100)}` : `-${Math.floor(Math.random() * 200 + 100)}`) : game.odds2
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        isAuthenticated={isAuthenticated}
        user={user}
      />
      
      <div className="pt-16">
        <LiveTicker />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                Live Basketball Matches
              </h1>
              <p className="text-xl text-muted-foreground">Bet on live games with real-time odds</p>
            </div>

            {/* Live Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="game-card text-center p-6">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{liveGames.filter(g => g.isLive).length}</div>
                <p className="text-muted-foreground">Live Games</p>
              </div>
              <div className="game-card text-center p-6">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">24/7</div>
                <p className="text-muted-foreground">Live Betting</p>
              </div>
              <div className="game-card text-center p-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">15,420</div>
                <p className="text-muted-foreground">Active Bettors</p>
              </div>
            </div>

            {/* Live Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveGames.map((game) => (
                <div key={game.id} className="relative">
                  {game.isLive && (
                    <div className="absolute -top-2 -right-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      LIVE
                    </div>
                  )}
                  <GameCard game={game} onBetClick={onBetClick} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Live;
