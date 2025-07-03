
import React from 'react';
import GameCard from './GameCard';

interface FeaturedGamesProps {
  onBetClick: (gameId: string, team: string, odds: string) => void;
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ onBetClick }) => {
  const featuredGames = [
    {
      id: '1',
      team1: 'Los Angeles Lakers',
      team2: 'Golden State Warriors',
      team1Logo: '🟡',
      team2Logo: '🔵',
      odds1: '+150',
      odds2: '-180',
      time: 'Today 8:00 PM',
      isLive: true,
      status: '2Q 8:32'
    },
    {
      id: '2',
      team1: 'Boston Celtics',
      team2: 'Miami Heat',
      team1Logo: '🟢',
      team2Logo: '🔴',
      odds1: '+120',
      odds2: '-145',
      time: 'Today 9:30 PM',
      isLive: true,
      status: '3Q 5:15'
    },
    {
      id: '3',
      team1: 'Brooklyn Nets',
      team2: 'New York Knicks',
      team1Logo: '⚫',
      team2Logo: '🔶',
      odds1: '+200',
      odds2: '-250',
      time: 'Tomorrow 7:00 PM',
      isLive: false
    },
    {
      id: '4',
      team1: 'Chicago Bulls',
      team2: 'Detroit Pistons',
      team1Logo: '🔴',
      team2Logo: '🔵',
      odds1: '-110',
      odds2: '-110',
      time: 'Tomorrow 8:30 PM',
      isLive: false
    }
  ];

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Games</h2>
          <p className="text-xl text-muted-foreground">Don't miss these exciting matchups</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} onBetClick={onBetClick} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bet-button px-8 py-3 text-lg">
            View All Games
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames;
