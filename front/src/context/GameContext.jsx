import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GameContext } from './GameContextValue';

// Game Provider Component
export const GameProvider = ({ children }) => {
  const [isFlowing, setIsFlowing] = useState(false);
  const [coefficient, setCoefficient] = useState(1.00);
  const [balance, setBalance] = useState(3000.00); // Starting balance
  const [betAmount, setBetAmount] = useState(0.30); // Default bet amount
  const [gameState, setGameState] = useState('idle'); // idle, playing, won, crashed
  const [currentBet, setCurrentBet] = useState(0); // Amount bet in current game
  const [animationKey, setAnimationKey] = useState(0); // Force animation reset
  const [crashCountdown, setCrashCountdown] = useState(0); // Countdown to crash
  const intervalRef = useRef(null);
  const crashTimerRef = useRef(null);
  const isHeatingRef = useRef(false);

  const handleHeatStart = useCallback(() => {
    // Start new game if idle
    if (gameState === 'idle' && balance >= betAmount) {
      // Deduct bet amount from balance
      setBalance(prev => Math.round((prev - betAmount) * 100) / 100);
      setCurrentBet(betAmount);
      setGameState('playing');
      setIsFlowing(true);
      isHeatingRef.current = true;
      
      // Start incrementing the coefficient
      intervalRef.current = setInterval(() => {
        if (isHeatingRef.current) {
          setCoefficient(prev => {
            const increment = 0.01; // Increment by 0.01 every 100ms
            return Math.round((prev + increment) * 100) / 100; // Round to 2 decimal places
          });
        }
      }, 100); // Update every 100ms for smooth animation
      
      return;
    }

    // Resume heating if in countdown state
    if (gameState === 'countdown') {
      // Clear crash timer
      if (crashTimerRef.current) {
        clearTimeout(crashTimerRef.current);
        crashTimerRef.current = null;
      }
      
      setCrashCountdown(0);
      setGameState('playing');
      setIsFlowing(true);
      isHeatingRef.current = true;
      
      // Resume coefficient increment
      intervalRef.current = setInterval(() => {
        if (isHeatingRef.current) {
          setCoefficient(prev => {
            const increment = 0.01; // Increment by 0.01 every 100ms
            return Math.round((prev + increment) * 100) / 100; // Round to 2 decimal places
          });
        }
      }, 100); // Update every 100ms for smooth animation
    }
  }, [gameState, balance, betAmount]);

  const handleHeatEnd = useCallback(() => {
    // Only start countdown if currently playing
    if (gameState !== 'playing') {
      return;
    }

    setIsFlowing(false);
    isHeatingRef.current = false;
    
    // Clear the coefficient increment interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Start 7-second countdown
    setGameState('countdown');
    setCrashCountdown(7);
    
    // Start countdown timer
    let countdown = 7;
    crashTimerRef.current = setInterval(() => {
      countdown -= 1;
      setCrashCountdown(countdown);
      
      if (countdown <= 0) {
        // Auto-crash after 7 seconds
        clearInterval(crashTimerRef.current);
        crashTimerRef.current = null;
        
        // Game crashed - player loses bet
        setGameState('crashed');
        setCrashCountdown(0);
        
        // Reset after showing crash for 2 seconds
        setTimeout(() => {
          setCoefficient(1.00);
          setCurrentBet(0);
          setGameState('idle');
          setIsFlowing(false);
          setAnimationKey(prev => prev + 1);
        }, 2000);
      }
    }, 1000); // Update every second
  }, [gameState]);

  const handleTake = useCallback(() => {
    if (gameState === 'playing' || gameState === 'countdown') {
      // Clear crash timer if in countdown
      if (crashTimerRef.current) {
        clearInterval(crashTimerRef.current);
        crashTimerRef.current = null;
      }
      
      // Calculate winnings: coefficient × current bet
      const winnings = Math.round((coefficient * currentBet) * 100) / 100;
      
      // Add winnings to balance
      setBalance(prev => Math.round((prev + winnings) * 100) / 100);
      
      // Immediately stop animation and reset to initial state
      setGameState('won');
      isHeatingRef.current = false;
      setCrashCountdown(0);
      
      // Clear the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Reset coefficient after a short delay to show the winning amount
      setTimeout(() => {
        setCoefficient(1.00);
        setCurrentBet(0);
        setGameState('idle');
        setIsFlowing(false);
        setAnimationKey(prev => prev + 1); // Force animation reset by changing key
      }, 1000);
    }
  }, [gameState, coefficient, currentBet]);

  const resetGame = useCallback(() => {
    setCoefficient(1.00);
    setCurrentBet(0);
    setGameState('idle');
    setIsFlowing(false);
    setCrashCountdown(0);
    isHeatingRef.current = false;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (crashTimerRef.current) {
      clearInterval(crashTimerRef.current);
      crashTimerRef.current = null;
    }
  }, []);

  // Cleanup intervals on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (crashTimerRef.current) {
        clearInterval(crashTimerRef.current);
      }
    };
  }, []);

  const value = {
    isFlowing,
    coefficient,
    balance,
    betAmount,
    setBetAmount,
    gameState,
    currentBet,
    animationKey,
    crashCountdown,
    handleHeatStart,
    handleHeatEnd,
    handleTake,
    resetGame,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};