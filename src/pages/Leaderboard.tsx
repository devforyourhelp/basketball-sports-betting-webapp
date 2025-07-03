
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, TrendingUp, Users, Target } from 'lucide-react';

interface LeaderboardPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  isAuthenticated?: boolean;
  user?: { name: string; balance: number };
}

const Leaderboard: React.FC<LeaderboardPageProps> = ({ 
  onLoginClick, 
  onRegisterClick, 
  isAuthenticated, 
  user 
}) => {
  const topBettors = [
    { rank: 1, name: 'BetMaster_23', winnings: 45670, wins: 89, losses: 23, winRate: 79.5, avatar: '👑' },
    { rank: 2, name: 'CourtKing', winnings: 38920, wins: 76, losses: 31, winRate: 71.0, avatar: '🏀' },
    { rank: 3, name: 'OddsGuru', winnings: 34580, wins: 68, losses: 28, winRate: 70.8, avatar: '🎯' },
    { rank: 4, name: 'SlotShot', winnings: 29100, wins: 62, losses: 34, winRate: 64.6, avatar: '🔥' },
    { rank: 5, name: 'BallPredictor', winnings: 27850, wins: 59, losses: 37, winRate: 61.5, avatar: '⚡' },
    { rank: 6, name: 'FastBreak', winnings: 25200, wins: 54, losses: 32, winRate: 62.8, avatar: '🚀' },
    { rank: 7, name: 'ThreePointer', winnings: 22780, wins: 51, losses: 39, winRate: 56.7, avatar: '🎪' },
    { rank: 8, name: 'DunkMaster', winnings: 20150, wins: 47, losses: 41, winRate: 53.4, avatar: '🎭' },
    { rank: 9, name: 'ReboundKing', winnings: 18900, wins: 44, losses: 38, winRate: 53.7, avatar: '🎨' },
    { rank: 10, name: 'BlockBuster', winnings: 17650, wins: 41, losses: 35, winRate: 53.9, avatar: '🎵' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'border-yellow-500 bg-yellow-500/10';
      case 2: return 'border-gray-400 bg-gray-400/10';
      case 3: return 'border-orange-600 bg-orange-600/10';
      default: return 'border-border';
    }
  };

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
                <Trophy className="w-10 h-10 text-primary" />
                Leaderboard
              </h1>
              <p className="text-xl text-muted-foreground">See how you rank against the best bettors</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Total Bettors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">15,420</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Total Winnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">$2.4M</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Avg Win Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">62.8%</div>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard Tabs */}
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="alltime">All Time</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weekly" className="mt-8">
                <div className="space-y-4">
                  {topBettors.map((bettor) => (
                    <Card key={bettor.rank} className={`${getRankColor(bettor.rank)} transition-all duration-200 hover:scale-[1.02]`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                              {getRankIcon(bettor.rank)}
                              <div className="text-2xl">{bettor.avatar}</div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{bettor.name}</h3>
                              <p className="text-muted-foreground">
                                {bettor.wins}W - {bettor.losses}L ({bettor.winRate}% win rate)
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">${bettor.winnings.toLocaleString()}</div>
                            <p className="text-muted-foreground">Total Winnings</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="monthly" className="mt-8">
                <div className="space-y-4">
                  {topBettors.map((bettor) => (
                    <Card key={bettor.rank} className={`${getRankColor(bettor.rank)} transition-all duration-200 hover:scale-[1.02]`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                              {getRankIcon(bettor.rank)}
                              <div className="text-2xl">{bettor.avatar}</div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{bettor.name}</h3>
                              <p className="text-muted-foreground">Monthly Leader</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">${(bettor.winnings * 0.8).toLocaleString()}</div>
                            <p className="text-muted-foreground">Monthly Winnings</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="alltime" className="mt-8">
                <div className="space-y-4">
                  {topBettors.map((bettor) => (
                    <Card key={bettor.rank} className={`${getRankColor(bettor.rank)} transition-all duration-200 hover:scale-[1.02]`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                              {getRankIcon(bettor.rank)}
                              <div className="text-2xl">{bettor.avatar}</div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{bettor.name}</h3>
                              <p className="text-muted-foreground">Hall of Fame</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">${(bettor.winnings * 2.5).toLocaleString()}</div>
                            <p className="text-muted-foreground">Lifetime Winnings</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Your Rank Section */}
            {isAuthenticated && user && (
              <Card className="mt-12 border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-center">Your Rank</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">#847</div>
                  <p className="text-muted-foreground mb-4">You're in the top 5% of all bettors!</p>
                  <Button className="bet-button">
                    View My Stats
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Leaderboard;
