import React from 'react';
import { Lock, Unlock, CheckCircle } from 'lucide-react';
import { FLOORS, getWingForFloor } from '../data/floors';

const FloorIndicator = ({ currentFloor, completedFloors, onFloorSelect }) => {
  const wings = [
    { name: 'Ground Floor', floors: [1, 2] },
    { name: 'Security Wing', floors: [3, 4] },
    { name: 'Operations Wing', floors: [5, 6] },
    { name: 'Executive Wing', floors: [7, 8, 9] },
    { name: 'The Vault', floors: [10] },
  ];

  return (
    <div className="space-y-4">
      {wings.map((wing) => {
        const wingInfo = getWingForFloor(wing.floors[0]);
        const wingComplete = wing.floors.every(f => completedFloors.includes(f));

        return (
          <div key={wing.name} className="space-y-2">
            {/* Wing Header */}
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: wingInfo.color }}
              />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: wingComplete ? wingInfo.color : '#666' }}
              >
                {wing.name}
              </span>
              {wingComplete && (
                <CheckCircle
                  className="w-3 h-3"
                  style={{ color: wingInfo.color }}
                />
              )}
            </div>

            {/* Floors */}
            <div className="space-y-1 pl-4">
              {wing.floors.map((floorId) => {
                const floor = FLOORS[floorId];
                const isCompleted = completedFloors.includes(floorId);
                const isCurrent = currentFloor === floorId;
                const isAccessible = floorId <= currentFloor;

                return (
                  <button
                    key={floorId}
                    onClick={() => isAccessible && onFloorSelect(floorId)}
                    disabled={!isAccessible}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-heist-card border'
                        : isAccessible
                        ? 'hover:bg-heist-card/50'
                        : 'opacity-40 cursor-not-allowed'
                    }`}
                    style={isCurrent ? { borderColor: floor.accentColor + '60' } : {}}
                  >
                    {/* Floor number */}
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-green-500/20 text-green-400'
                          : isCurrent
                          ? ''
                          : 'bg-heist-border/50 text-gray-500'
                      }`}
                      style={isCurrent && !isCompleted ? {
                        backgroundColor: floor.accentColor + '20',
                        color: floor.accentColor,
                      } : {}}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : isAccessible ? (
                        floorId
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                    </div>

                    {/* Floor info */}
                    <div className="flex-1 text-left">
                      <p
                        className={`text-sm font-medium ${
                          isCurrent ? '' : 'text-gray-400'
                        }`}
                        style={isCurrent ? { color: floor.accentColor } : {}}
                      >
                        {floor.name}
                      </p>
                      <p className="text-xs text-gray-500">{floor.character}</p>
                    </div>

                    {/* Difficulty */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < floor.difficulty
                              ? isCompleted
                                ? 'bg-green-500'
                                : isCurrent
                                ? ''
                                : 'bg-gray-500'
                              : 'bg-heist-border'
                          }`}
                          style={
                            i < floor.difficulty && isCurrent && !isCompleted
                              ? { backgroundColor: floor.accentColor }
                              : {}
                          }
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloorIndicator;
