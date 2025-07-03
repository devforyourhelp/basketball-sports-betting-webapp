
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface GameCardProps {
  game: {
    id: string;
    team1: string;
    team2: string;
    team1Logo: string;
    team2Logo: string;
    odds1: string;
    odds2: string;
    time: string;
    isLive?: boolean;
    status?: string;
  };
  onBetClick: (gameId: string, team: string, odds: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onBetClick }) => {
  const [oddsChange1, setOddsChange1] = useState<'up' | 'down' | null>(null);
  const [oddsChange2, setOddsChange2] = useState<'up' | 'down' | null>(null);

  const simulateOddsChange = (team: 1 | 2) => {
    const change = Math.random() > 0.5 ? 'up' : 'down';
    if (team === 1) {
      setOddsChange1(change);
      setTimeout(() => setOddsChange1(null), 500);
    } else {
      setOddsChange2(change);
      setTimeout(() => setOddsChange2(null), 500);
    }
  };

  return (
    <div className="game-card group">
      {game.isLive && (
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-500 text-sm font-semibold">LIVE</span>
          <span className="text-muted-foreground text-sm">{game.status}</span>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{game.time}</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Team 1 */}
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xs">{game.team1Logo}</span>
            </div>
            <span className="font-semibold">{game.team1}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span 
              className={`text-lg font-bold transition-all duration-200 ${
                oddsChange1 === 'up' ? 'text-win' : 
                oddsChange1 === 'down' ? 'text-lose' : ''
              }`}
            >
              {game.odds1}
            </span>
            {oddsChange1 && (
              oddsChange1 === 'up' ? 
                <TrendingUp className="w-4 h-4 text-win" /> : 
                <TrendingDown className="w-4 h-4 text-lose" />
            )}
            <Button 
              size="sm" 
              onClick={() => {
                onBetClick(game.id, game.team1, game.odds1);
                simulateOddsChange(1);
              }}
              className="bet-button"
            >
              Bet
            </Button>
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xs">{game.team2Logo}</span>
            </div>
            <span className="font-semibold">{game.team2}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span 
              className={`text-lg font-bold transition-all duration-200 ${
                oddsChange2 === 'up' ? 'text-win' : 
                oddsChange2 === 'down' ? 'text-lose' : ''
              }`}
            >
              {game.odds2}
            </span>
            {oddsChange2 && (
              oddsChange2 === 'up' ? 
                <TrendingUp className="w-4 h-4 text-win" /> : 
                <TrendingDown className="w-4 h-4 text-lose" />
            )}
            <Button 
              size="sm" 
              onClick={() => {
                onBetClick(game.id, game.team2, game.odds2);
                simulateOddsChange(2);
              }}
              className="bet-button"
            >
              Bet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
