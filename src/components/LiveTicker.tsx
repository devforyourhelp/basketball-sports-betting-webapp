
import React from 'react';

const LiveTicker: React.FC = () => {
  const liveOdds = [
    { team1: 'Lakers', team2: 'Warriors', odds1: '+150', odds2: '-180', time: '2Q 8:32' },
    { team1: 'Celtics', team2: 'Heat', odds1: '+120', odds2: '-145', time: '3Q 5:15' },
    { team1: 'Nets', team2: 'Knicks', odds1: '+200', odds2: '-250', time: '1Q 11:24' },
    { team1: 'Bulls', team2: 'Pistons', odds1: '-110', odds2: '-110', time: '4Q 2:45' },
  ];

  return (
    <div className="bg-primary/10 border-y border-primary/20 py-2 overflow-hidden">
      <div className="animate-ticker-scroll whitespace-nowrap">
        <div className="inline-flex space-x-8">
          {liveOdds.map((game, index) => (
            <div key={index} className="inline-flex items-center space-x-4 text-sm">
              <span className="text-primary font-semibold">LIVE</span>
              <span className="text-foreground">
                {game.team1} {game.odds1} vs {game.team2} {game.odds2}
              </span>
              <span className="text-muted-foreground">{game.time}</span>
              <span className="text-primary">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTicker;
