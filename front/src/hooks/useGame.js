import { useContext } from 'react';
import { GameContext } from '../context/GameContextValue';

// Custom hook to use the Game Context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
