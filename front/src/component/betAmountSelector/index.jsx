import React from "react";
import "./style.css";
import { useGame } from "../../hooks/useGame";

const BetAmountSelector = ({ isVisible, onClose }) => {
  const { setBetAmount, betAmount } = useGame();

  const betAmounts = [
    0.10, 0.20,
    0.30, 0.40,
    0.50, 0.60,
    0.70, 0.80,
    1.20, 2.00,
    4.00, 10.00,
    20.00, 50.00,
    100.00
  ];

  const handleBetSelect = (amount) => {
    setBetAmount(amount);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="bet-selector-overlay" onClick={onClose}>
      <div className="bet-selector-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bet-selector-header">
          <h3>Bet USD</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="bet-selector-grid">
          {betAmounts.map((amount) => (
            <button
              key={amount}
              className={`bet-option ${betAmount === amount ? 'selected' : ''}`}
              onClick={() => handleBetSelect(amount)}
            >
              {amount.toFixed(2)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BetAmountSelector;
