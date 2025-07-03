
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Menu, Bell, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  isAuthenticated?: boolean;
  user?: { name: string; balance: number };
}

const Header: React.FC<HeaderProps> = ({ 
  onLoginClick, 
  onRegisterClick, 
  isAuthenticated = false,
  user 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) => {
    return `text-foreground hover:text-primary transition-colors ${
      isActiveRoute(path) ? 'text-primary font-semibold' : ''
    }`;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 basketball-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🏀</span>
            </div>
            <span className="text-xl font-bold text-primary">CourtBet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/live" className={navLinkClass('/live')}>Live</Link>
            <Link to="/matches" className={navLinkClass('/matches')}>Matches</Link>
            <Link to="/leaderboard" className={navLinkClass('/leaderboard')}>Leaderboard</Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated && user ? (
              <>
                <div className="hidden md:flex items-center space-x-2 bg-card px-3 py-1 rounded-lg">
                  <Wallet className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">${user.balance.toFixed(2)}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline ml-2">{user.name}</span>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={onLoginClick}
                  className="hidden md:inline-flex"
                >
                  Login
                </Button>
                <Button 
                  onClick={onRegisterClick}
                  className="animate-pulse-glow"
                >
                  Join Now
                </Button>
              </>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className={navLinkClass('/')}>Home</Link>
              <Link to="/live" className={navLinkClass('/live')}>Live</Link>
              <Link to="/matches" className={navLinkClass('/matches')}>Matches</Link>
              <Link to="/leaderboard" className={navLinkClass('/leaderboard')}>Leaderboard</Link>
              {!isAuthenticated && (
                <div className="flex space-x-2 mt-3">
                  <Button variant="ghost" onClick={onLoginClick} size="sm">Login</Button>
                  <Button onClick={onRegisterClick} size="sm">Join Now</Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
