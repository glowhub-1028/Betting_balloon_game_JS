import React, { useState } from "react";
import "./footer.css";
import { useGame } from "../../hooks/useGame";
import BetAmountSelector from "../betAmountSelector";

const Footer = () => {
  const [showBetSelector, setShowBetSelector] = useState(false);
  
  const { 
    handleHeatStart, 
    handleHeatEnd, 
    handleTake, 
    betAmount, 
    setBetAmount, 
    gameState, 
    coefficient, 
    currentBet,
    crashCountdown
  } = useGame();
  return (
    <>
      <div className="footer">
        <div className="control-panel">
          <div className="left">
            <div className="input-label">Bet USD</div>
            <input 
              type="number" 
              value={betAmount} 
              onChange={(e) => setBetAmount(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
              disabled={gameState === 'playing' || gameState === 'countdown'}
              step="0.01"
              min="0.1"
            />  
          </div>
          <div className="right">
            <button 
              className="minus"
              onClick={() => setBetAmount(prev => Math.max(0.1, Math.round((prev - 0.1) * 100) / 100))}
              disabled={gameState === 'playing' || gameState === 'countdown'}
            >
              <img src="/image/icon-minus.496f2e671ff32d15.svg" alt="" />
            </button>
            <button 
              className="coin"
              onClick={() => setShowBetSelector(true)}
              disabled={gameState === 'playing' || gameState === 'countdown'}
            >
              <img src="/image/icon-coin.35e2c2ac0b9fe1fa.svg" alt="" />
            </button>
            <button 
              className="plus"
              onClick={() => setBetAmount(prev => Math.round((prev + 0.1) * 100) / 100)}
              disabled={gameState === 'playing' || gameState === 'countdown'}
            >
              <img src="/image/icon-plus.feaff32a610ebd64.svg" alt="" />
            </button>
          </div>
        </div>
        <div className="button-group">
          <button className="return">
            <img src="/image/icon-auto-play.4977be4170e6076b.svg" />
          </button>
          <button
            className="heat"
            onMouseDown={handleHeatStart}
            onMouseUp={handleHeatEnd}
            onMouseLeave={handleHeatEnd}
            onTouchStart={handleHeatStart}
            onTouchEnd={handleHeatEnd}
          >
            <img src="/image/icon-balloon-fire.svg" />
            HEAT
          </button>
          <button 
            className="take" 
            onClick={handleTake}
            disabled={gameState !== 'playing' && gameState !== 'countdown'}
          >
            <span>
              <div>
                {gameState === 'countdown' ? `TAKE (${crashCountdown}s)` : 'TAKE'}
              </div>
              <div>
                {(gameState === 'playing' || gameState === 'countdown')
                  ? (coefficient * currentBet).toFixed(2)
                  : '0.00'
                }
              </div>
            </span>
          </button>
        </div>
      </div>
      
      <BetAmountSelector 
        isVisible={showBetSelector}
        onClose={() => setShowBetSelector(false)}
      />
    </>
  );
};

export default Footer;
