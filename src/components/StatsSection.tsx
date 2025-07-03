
import React, { useEffect, useState } from 'react';
import { DollarSign, Users, Trophy, TrendingUp } from 'lucide-react';

const StatsSection: React.FC = () => {
  const [stats, setStats] = useState({
    totalPaid: 0,
    activeUsers: 0,
    biggestWin: 0,
    winRate: 0
  });

  useEffect(() => {
    // Animate numbers counting up
    const finalStats = {
      totalPaid: 2450000,
      activeUsers: 15420,
      biggestWin: 89500,
      winRate: 73.2
    };

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        totalPaid: Math.floor(finalStats.totalPaid * progress),
        activeUsers: Math.floor(finalStats.activeUsers * progress),
        biggestWin: Math.floor(finalStats.biggestWin * progress),
        winRate: parseFloat((finalStats.winRate * progress).toFixed(1))
      });

      if (step >= steps) {
        clearInterval(interval);
        setStats(finalStats);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CourtBet?</h2>
          <p className="text-xl text-muted-foreground">Join the winning community</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 game-card">
            <div className="w-12 h-12 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              ${stats.totalPaid.toLocaleString()}
            </div>
            <p className="text-muted-foreground">Total Paid Out</p>
          </div>

          <div className="text-center p-6 game-card">
            <div className="w-12 h-12 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              {stats.activeUsers.toLocaleString()}
            </div>
            <p className="text-muted-foreground">Active Bettors</p>
          </div>

          <div className="text-center p-6 game-card">
            <div className="w-12 h-12 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              ${stats.biggestWin.toLocaleString()}
            </div>
            <p className="text-muted-foreground">Biggest Win</p>
          </div>

          <div className="text-center p-6 game-card">
            <div className="w-12 h-12 basketball-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              {stats.winRate}%
            </div>
            <p className="text-muted-foreground">Average Win Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
