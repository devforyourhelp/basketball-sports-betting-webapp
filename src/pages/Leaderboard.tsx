
import React, { useState } from 'react';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  isAuthenticated?: boolean;
  user?: { name: string; balance: number };
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  isAuthenticated = false, 
  user 
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [localIsAuthenticated, setLocalIsAuthenticated] = useState(isAuthenticated);
  const [localUser, setLocalUser] = useState(user);
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
    setLocalIsAuthenticated(true);
    setLocalUser({
      name: name || email.split('@')[0],
      balance: 1000.00
    });
    setIsAuthModalOpen(false);
    
    toast({
      title: "Welcome to CourtBet!",
      description: `Successfully ${authMode === 'login' ? 'signed in' : 'created account'}`,
    });
  };

  const leaderboardData = [
    { rank: 1, name: "BetMaster2024", winnings: "$15,420", icon: Trophy, color: "text-yellow-500" },
    { rank: 2, name: "CourtKing", winnings: "$12,890", icon: Medal, color: "text-gray-400" },
    { rank: 3, name: "HoopsDreamer", winnings: "$9,650", icon: Award, color: "text-amber-600" },
    { rank: 4, name: "BasketBaller", winnings: "$7,230", icon: null, color: "" },
    { rank: 5, name: "SlamDunk", winnings: "$6,890", icon: null, color: "" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        isAuthenticated={localIsAuthenticated}
        user={localUser}
      />
      
      <div className="pt-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="game-card p-6">
            <h2 className="text-2xl font-semibold mb-6">Top Bettors This Month</h2>
            
            <div className="space-y-4">
              {leaderboardData.map((player) => {
                const IconComponent = player.icon;
                return (
                  <div 
                    key={player.rank}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-muted-foreground">
                          #{player.rank}
                        </span>
                        {IconComponent && (
                          <IconComponent className={`w-6 h-6 ${player.color}`} />
                        )}
                      </div>
                      <span className="text-lg font-semibold">{player.name}</span>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{player.winnings}</div>
                      <div className="text-sm text-muted-foreground">Total Winnings</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onAuth={handleAuth}
      />
    </div>
  );
};

export default Leaderboard;
