
import React, { useState } from 'react';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { useToast } from '@/hooks/use-toast';

interface LiveProps {
  isAuthenticated?: boolean;
  user?: { name: string; balance: number };
  onBetClick: (gameId: string, team: string, odds: string) => void;
}

const Live: React.FC<LiveProps> = ({ 
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
        <h1 className="text-4xl font-bold mb-8">Live Games</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Live games will be populated here */}
          <div className="game-card p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full">LIVE</span>
              <span className="text-sm text-muted-foreground">Q2 8:45</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    LAL
                  </div>
                  <span className="font-semibold">Lakers</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">67</div>
                  <button 
                    onClick={() => onBetClick('live-1', 'Lakers', '-2.5')}
                    className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                  >
                    -2.5
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    GSW
                  </div>
                  <span className="font-semibold">Warriors</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">72</div>
                  <button 
                    onClick={() => onBetClick('live-1', 'Warriors', '+2.5')}
                    className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                  >
                    +2.5
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

export default Live;
