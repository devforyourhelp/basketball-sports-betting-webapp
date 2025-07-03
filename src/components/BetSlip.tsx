
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Calculator } from 'lucide-react';

interface Bet {
  id: string;
  team: string;
  odds: string;
  stake: number;
}

interface BetSlipProps {
  bets: Bet[];
  onRemoveBet: (betId: string) => void;
  onUpdateStake: (betId: string, stake: number) => void;
  onPlaceBets: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const BetSlip: React.FC<BetSlipProps> = ({
  bets,
  onRemoveBet,
  onUpdateStake,
  onPlaceBets,
  isOpen,
  onClose
}) => {
  const [error, setError] = useState('');

  const calculatePayout = (odds: string, stake: number): number => {
    const numericOdds = parseFloat(odds.replace('+', '').replace('-', ''));
    if (odds.startsWith('+')) {
      return stake * (numericOdds / 100);
    } else {
      return stake * (100 / numericOdds);
    }
  };

  const totalStake = bets.reduce((sum, bet) => sum + bet.stake, 0);
  const totalPayout = bets.reduce((sum, bet) => sum + calculatePayout(bet.odds, bet.stake), 0);

  const handlePlaceBets = () => {
    if (totalStake === 0) {
      setError('Please enter stake amounts');
      setTimeout(() => setError(''), 3000);
      return;
    }
    onPlaceBets();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Bet Slip</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {bets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your bet slip is empty</p>
              <p className="text-sm">Add some bets to get started!</p>
            </div>
          ) : (
            bets.map((bet) => (
              <div key={bet.id} className="bg-secondary/50 p-3 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{bet.team}</p>
                    <p className="text-primary text-sm">{bet.odds}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveBet(bet.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Stake ($)"
                    value={bet.stake || ''}
                    onChange={(e) => onUpdateStake(bet.id, parseFloat(e.target.value) || 0)}
                    className="h-8"
                  />
                  {bet.stake > 0 && (
                    <p className="text-xs text-muted-foreground">
                      To win: <span className="text-win font-semibold">
                        ${calculatePayout(bet.odds, bet.stake).toFixed(2)}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {bets.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Total Stake:</span>
                <span className="font-semibold">${totalStake.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Potential Payout:</span>
                <span className="font-semibold text-win">${totalPayout.toFixed(2)}</span>
              </div>
              {error && (
                <p className="text-destructive text-sm animate-pulse">{error}</p>
              )}
              <Button 
                onClick={handlePlaceBets} 
                className="w-full bet-button"
                disabled={totalStake === 0}
              >
                Place Bets
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BetSlip;
