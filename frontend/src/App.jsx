import React, { useState } from 'react';
import Landing from './pages/Landing';
import Game from './pages/Game';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    setGameStarted(false);
  };

  return (
    <>
      {!gameStarted ? (
        <Landing onStart={handleStart} />
      ) : (
        <Game onRestart={handleRestart} />
      )}
    </>
  );
};

export default App;
