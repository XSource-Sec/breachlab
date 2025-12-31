import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, RotateCcw, HelpCircle, Award } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import FloorIndicator from '../components/FloorIndicator';
import WingProgress from '../components/WingProgress';
import CodeInput from '../components/CodeInput';
import SuccessModal from '../components/SuccessModal';
import WingClearedModal from '../components/WingClearedModal';
import GameCompleteModal from '../components/GameCompleteModal';
import SecurityAlert from '../components/SecurityAlert';
import { FLOORS } from '../data/floors';
import { getProgress, resetGame } from '../utils/api';
import {
  getLocalProgress,
  saveLocalProgress,
  completeLevel,
  resetProgress,
  getBadgeForLevel,
  BADGES,
} from '../utils/badges';

const Game = ({ onRestart }) => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [completedFloors, setCompletedFloors] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Badge state
  const [highestLevel, setHighestLevel] = useState(0);
  const [currentBadge, setCurrentBadge] = useState(null);
  const [unlockedBadge, setUnlockedBadge] = useState(null);

  // Modals
  const [successModal, setSuccessModal] = useState({ open: false, floor: null });
  const [wingClearedModal, setWingClearedModal] = useState({ open: false, wingName: null });
  const [gameCompleteModal, setGameCompleteModal] = useState(false);
  const [securityAlert, setSecurityAlert] = useState({ visible: false, message: '' });

  const floor = FLOORS[currentFloor];

  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      // Load from API
      const progress = await getProgress();
      setCurrentFloor(progress.current_floor);
      setCompletedFloors(progress.completed_floors);

      // Also sync with localStorage for badge tracking
      const localProgress = getLocalProgress();

      // Merge API progress with local progress
      const mergedCompleted = [...new Set([...progress.completed_floors, ...localProgress.completedLevels])];
      const mergedHighest = Math.max(
        progress.completed_floors.length > 0 ? Math.max(...progress.completed_floors) : 0,
        localProgress.highestLevel
      );

      // Update local storage with merged data
      const newLocalProgress = {
        completedLevels: mergedCompleted,
        highestLevel: mergedHighest,
        currentBadge: getBadgeForLevel(mergedHighest)?.id || null,
      };
      saveLocalProgress(newLocalProgress);

      // Update state
      setHighestLevel(mergedHighest);
      setCurrentBadge(getBadgeForLevel(mergedHighest));
    } catch (error) {
      console.error('Failed to load progress:', error);

      // Fall back to localStorage
      const localProgress = getLocalProgress();
      setHighestLevel(localProgress.highestLevel);
      setCurrentBadge(getBadgeForLevel(localProgress.highestLevel));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFloorSelect = (floorId) => {
    if (floorId <= currentFloor) {
      setCurrentFloor(floorId);
    }
  };

  const handleCodeSuccess = (response) => {
    const levelCompleted = response.floor_id || currentFloor;
    console.log('[Game] Code success for level:', levelCompleted);

    // Update completed floors
    setCompletedFloors(prev => [...new Set([...prev, levelCompleted])]);

    // Track in localStorage and check for new badge
    const { progress, unlockedBadge: newBadge } = completeLevel(levelCompleted);
    console.log('[Game] Badge progress:', { progress, newBadge });

    setHighestLevel(progress.highestLevel);
    setCurrentBadge(getBadgeForLevel(progress.highestLevel));

    if (newBadge) {
      console.log('[Game] New badge unlocked:', newBadge);
      setUnlockedBadge(newBadge);
    }

    if (response.game_complete) {
      setGameCompleteModal(true);
    } else if (response.wing_cleared) {
      setWingClearedModal({ open: true, wingName: response.wing_name });
    } else {
      console.log('[Game] Opening success modal for floor:', FLOORS[currentFloor]);
      setSuccessModal({ open: true, floor: FLOORS[currentFloor] });
    }
  };

  const handleSuccessContinue = () => {
    setSuccessModal({ open: false, floor: null });
    setUnlockedBadge(null);
    if (currentFloor < 10) {
      setCurrentFloor(currentFloor + 1);
    }
  };

  const handleWingClearedContinue = () => {
    setWingClearedModal({ open: false, wingName: null });
    setUnlockedBadge(null);
    if (currentFloor < 10) {
      setCurrentFloor(currentFloor + 1);
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to restart? All progress will be lost.')) {
      try {
        await resetGame();
        resetProgress(); // Reset localStorage
        setCurrentFloor(1);
        setCompletedFloors([]);
        setHighestLevel(0);
        setCurrentBadge(null);
        setUnlockedBadge(null);
        onRestart?.();
      } catch (error) {
        console.error('Failed to reset:', error);
      }
    }
  };

  const handleCodeDetected = () => {
    setSecurityAlert({
      visible: true,
      message: 'Code detected in response! Check the conversation.',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-heist-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading heist data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heist-dark flex">
      {/* Security Alert */}
      <SecurityAlert
        isVisible={securityAlert.visible}
        message={securityAlert.message}
        onClose={() => setSecurityAlert({ visible: false, message: '' })}
      />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-heist-card border-r border-heist-border z-40 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-heist-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-display font-bold">
              <span className="text-white">BREACH</span>
              <span className="text-neon-green">LAB</span>
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-heist-border rounded lg:hidden"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Badge Progress Indicator */}
          <div className="bg-heist-darker rounded-xl p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-neon-green" />
                <span className="text-xs text-gray-400 uppercase tracking-wider">Progress</span>
              </div>
              {currentBadge && (
                <span className="text-lg" title={currentBadge.name}>
                  {currentBadge.icon}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white font-medium">
                {highestLevel}/10 levels
              </span>
              {currentBadge ? (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: currentBadge.color + '30', color: currentBadge.color }}>
                  {currentBadge.name}
                </span>
              ) : (
                <span className="text-xs text-gray-500">No badge yet</span>
              )}
            </div>
            {/* Next badge preview */}
            {highestLevel < 10 && (
              <div className="mt-2 pt-2 border-t border-heist-border">
                <p className="text-xs text-gray-500">
                  {highestLevel < 3 && `Next: ${BADGES.bronze.icon} at Level 3`}
                  {highestLevel >= 3 && highestLevel < 5 && `Next: ${BADGES.silver.icon} at Level 5`}
                  {highestLevel >= 5 && highestLevel < 7 && `Next: ${BADGES.gold.icon} at Level 7`}
                  {highestLevel >= 7 && highestLevel < 10 && `Next: ${BADGES.diamond.icon} at Level 10`}
                </p>
              </div>
            )}
          </div>

          {/* Wing Progress */}
          <WingProgress
            currentFloor={currentFloor}
            completedFloors={completedFloors}
          />
        </div>

        {/* Floor List */}
        <div className="flex-1 overflow-y-auto p-4">
          <FloorIndicator
            currentFloor={currentFloor}
            completedFloors={completedFloors}
            onFloorSelect={handleFloorSelect}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-heist-border space-y-2">
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Restart Heist</span>
          </button>
          <p className="text-xs text-gray-600 text-center">
            Built by XSource_Sec
          </p>
        </div>
      </motion.aside>

      {/* Mobile sidebar toggle */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-4 z-50 p-2 bg-heist-card border border-heist-border rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5 text-gray-400" />
        </button>
      )}

      {/* Main content */}
      <main
        className={`flex-1 flex flex-col transition-all ${
          sidebarOpen ? 'lg:ml-72' : ''
        }`}
      >
        {/* Top bar */}
        <header
          className="h-16 border-b flex items-center justify-between px-4"
          style={{ borderColor: floor.accentColor + '40' }}
        >
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-heist-card rounded-lg hidden lg:block"
              >
                <Menu className="w-5 h-5 text-gray-400" />
              </button>
            )}
            <div>
              <p className="text-xs text-gray-500">{floor.wing}</p>
              <p className="font-bold" style={{ color: floor.accentColor }}>
                Floor {floor.id}: {floor.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Badge indicator (mobile) */}
            {currentBadge && (
              <div className="flex items-center gap-2 lg:hidden">
                <span className="text-lg">{currentBadge.icon}</span>
                <span className="text-xs text-gray-400">{highestLevel}/10</span>
              </div>
            )}

            {/* Objective */}
            <div className="text-right hidden md:block">
              <p className="text-xs text-gray-500">Objective</p>
              <p className="text-sm text-gray-300">{floor.objective}</p>
            </div>

            {/* Difficulty */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < floor.difficulty ? '' : 'bg-heist-border'
                  }`}
                  style={
                    i < floor.difficulty
                      ? { backgroundColor: floor.accentColor }
                      : {}
                  }
                />
              ))}
            </div>
          </div>
        </header>

        {/* Chat area */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <ChatInterface
              floor={floor}
              onCodeDetected={handleCodeDetected}
            />
          </div>

          {/* Right sidebar - Code input & tips */}
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-heist-border p-4 space-y-4">
            {/* Code input */}
            <CodeInput
              floorId={currentFloor}
              onSuccess={handleCodeSuccess}
              accentColor={floor.accentColor}
            />

            {/* Tips */}
            <div className="bg-heist-card border border-heist-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-gray-400">Tips</span>
              </div>
              <ul className="space-y-2">
                {floor.tips?.map((tip, idx) => (
                  <li key={idx} className="text-sm text-gray-500 flex gap-2">
                    <span style={{ color: floor.accentColor }}>•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <SuccessModal
        isOpen={successModal.open}
        floor={successModal.floor}
        nextFloor={FLOORS[currentFloor + 1]}
        onContinue={handleSuccessContinue}
        unlockedBadge={unlockedBadge}
        currentLevel={currentFloor}
      />

      <WingClearedModal
        isOpen={wingClearedModal.open}
        wingName={wingClearedModal.wingName}
        onContinue={handleWingClearedContinue}
      />

      <GameCompleteModal
        isOpen={gameCompleteModal}
        onRestart={handleReset}
      />
    </div>
  );
};

export default Game;
