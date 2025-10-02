import React from "react";
import "./header.css";
import { useGame } from "../../hooks/useGame";

const Header = () => {
  const { balance } = useGame();
  return (
    <>
      <div className="header">
        <div className="left-btn-group">
          <button className="ballon">
            <img className="arrow-down" src="/image/icon-dd-arrow.e394e8c554623388.svg"/>
            BALLON
          </button>
          <button className="how-to-play">
            <img className="question-icon" src="/image/icon-question.svg" />
            <div>How to play?</div>
          </button>
        </div>
        <div className="right-btn-group">
          <span className="price">
            <strong>{balance.toFixed(2)}</strong> USD
          </span>
          <button className="menu">
            <div>
              <div className="icon"></div>
              <div className="icon center"></div>
              <div className="icon"></div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
