
import React, { useState } from 'react';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { useToast } from '@/hooks/use-toast';

interface MatchesProps {
  isAuthenticated?: boolean;
  user?: { name: string; balance: number };
  onBetClick: (gameId: string, team: string, odds: string) => void;
}

const Matches: React.FC<MatchesProps> = ({ 
  isAuthenticated = false, 
  user,
  onBetClick 
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

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        isAuthenticated={localIsAuthenticated}
        user={localUser}
      />
      
      <div className="pt-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Upcoming Matches</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming matches */}
          <div className="game-card p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded-full">UPCOMING</span>
              <span className="text-sm text-muted-foreground">Tonight 8:00 PM</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    BOS
                  </div>
                  <span className="font-semibold">Celtics</span>
                </div>
                <div className="text-right">
                  <button 
                    onClick={() => onBetClick('match-1', 'Celtics', '-4.5')}
                    className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                  >
                    -4.5
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    MIA
                  </div>
                  <span className="font-semibold">Heat</span>
                </div>
                <div className="text-right">
                  <button 
                    onClick={() => onBetClick('match-1', 'Heat', '+4.5')}
                    className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                  >
                    +4.5
                  </button>
                </div>
              </div>
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

export default Matches;
