
import React, { useState } from 'react';
import Header from '@/components/Header';
import GameCard from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Filter } from 'lucide-react';

interface MatchesPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  isAuthenticated?: boolean;
  user?: { name: string; balance: number };
  onBetClick: (gameId: string, team: string, odds: string) => void;
}

const Matches: React.FC<MatchesPageProps> = ({ 
  onLoginClick, 
  onRegisterClick, 
  isAuthenticated, 
  user, 
  onBetClick 
}) => {
  const [selectedDate, setSelectedDate] = useState('today');
  
  const upcomingGames = [
    {
      id: '5',
      team1: 'Milwaukee Bucks',
      team2: 'Philadelphia 76ers',
      team1Logo: '🟢',
      team2Logo: '🔵',
      odds1: '+135',
      odds2: '-165',
      time: 'Today 8:00 PM',
      isLive: false
    },
    {
      id: '6',
      team1: 'Dallas Mavericks',
      team2: 'San Antonio Spurs',
      team1Logo: '🔵',
      team2Logo: '⚫',
      odds1: '-125',
      odds2: '+105',
      time: 'Today 9:30 PM',
      isLive: false
    },
    {
      id: '7',
      team1: 'Portland Trail Blazers',
      team2: 'Sacramento Kings',
      team1Logo: '🔴',
      team2Logo: '🟣',
      odds1: '+190',
      odds2: '-230',
      time: 'Tomorrow 7:00 PM',
      isLive: false
    },
    {
      id: '8',
      team1: 'Atlanta Hawks',
      team2: 'Orlando Magic',
      team1Logo: '🔴',
      team2Logo: '🔵',
      odds1: '-140',
      odds2: '+120',
      time: 'Tomorrow 8:00 PM',
      isLive: false
    },
    {
      id: '9',
      team1: 'Minnesota Timberwolves',
      team2: 'Utah Jazz',
      team1Logo: '🔵',
      team2Logo: '🟡',
      odds1: '+110',
      odds2: '-130',
      time: 'This Weekend',
      isLive: false
    },
    {
      id: '10',
      team1: 'New York Knicks',
      team2: 'Washington Wizards',
      team1Logo: '🔶',
      team2Logo: '🔴',
      odds1: '-180',
      odds2: '+150',
      time: 'This Weekend',
      isLive: false
    }
  ];

  const todayGames = upcomingGames.filter(game => game.time.includes('Today'));
  const tomorrowGames = upcomingGames.filter(game => game.time.includes('Tomorrow'));
  const weekendGames = upcomingGames.filter(game => game.time.includes('Weekend'));

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        isAuthenticated={isAuthenticated}
        user={user}
      />
      
      <div className="pt-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                <Calendar className="w-10 h-10 text-primary" />
                Upcoming Matches
              </h1>
              <p className="text-xl text-muted-foreground">Place your bets on upcoming basketball games</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Tabs for different time periods */}
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today ({todayGames.length})</TabsTrigger>
                <TabsTrigger value="tomorrow">Tomorrow ({tomorrowGames.length})</TabsTrigger>
                <TabsTrigger value="weekend">Weekend ({weekendGames.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {todayGames.map((game) => (
                    <GameCard key={game.id} game={game} onBetClick={onBetClick} />
                  ))}
                </div>
                {todayGames.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No games scheduled for today</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="tomorrow" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tomorrowGames.map((game) => (
                    <GameCard key={game.id} game={game} onBetClick={onBetClick} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="weekend" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {weekendGames.map((game) => (
                    <GameCard key={game.id} game={game} onBetClick={onBetClick} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Matches;
