import React from 'react';
import { WINGS } from '../data/floors';

const WingProgress = ({ currentFloor, completedFloors = [] }) => {
  const wingOrder = ['Ground Floor', 'Security Wing', 'Operations Wing', 'Executive Wing', 'The Vault'];
  const wingLabels = {
    'Ground Floor': 'Ground',
    'Security Wing': 'Security',
    'Operations Wing': 'Ops',
    'Executive Wing': 'Exec',
    'The Vault': 'Vault'
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-1 min-w-max">
        {wingOrder.map((wingName, idx) => {
          const wing = WINGS[wingName];
          const wingFloors = wing.floors;
          const completedInWing = wingFloors.filter(f => completedFloors.includes(f)).length;
          const totalInWing = wingFloors.length;
          const isCurrentWing = wingFloors.includes(currentFloor);
          const isComplete = completedInWing === totalInWing;

          return (
            <React.Fragment key={wingName}>
              {/* Wing indicator */}
              <div className="flex flex-col items-center" title={`${wingName}: ${completedInWing}/${totalInWing}`}>
                <div
                  className={`w-10 h-6 rounded flex items-center justify-center text-xs font-bold transition-all ${
                    isComplete
                      ? 'neon-border'
                      : isCurrentWing
                      ? 'border-2'
                      : 'border border-heist-border opacity-50'
                  }`}
                  style={{
                    borderColor: isComplete || isCurrentWing ? wing.color : undefined,
                    color: isComplete || isCurrentWing ? wing.color : '#888',
                    backgroundColor: isComplete ? wing.color + '20' : 'transparent',
                  }}
                >
                  {isComplete ? '✓' : `${completedInWing}/${totalInWing}`}
                </div>
                <span
                  className="text-[9px] mt-0.5 font-medium"
                  style={{ color: isComplete || isCurrentWing ? wing.color : '#888' }}
                >
                  {wingLabels[wingName]}
                </span>
              </div>

              {/* Connector line */}
              {idx < wingOrder.length - 1 && (
                <div
                  className={`h-0.5 w-2 flex-shrink-0 ${
                    isComplete ? '' : 'bg-heist-border'
                  }`}
                  style={isComplete ? { backgroundColor: wing.color } : {}}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WingProgress;
