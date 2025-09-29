import React from "react";
import "./footer.css";

const Footer = ({ onHeat, onHeatEnd }) => {
  return (
    <>
      <div className="footer">
        <div className="control-panel">
          <div className="left">
            <div className="input-label">Bet USD</div>
            <input type="text" value={0.30}/>
          </div>
          <div className="right">
            <button className="minus">
              <img src="/image/icon-minus.496f2e671ff32d15.svg" alt="" />
            </button>
            <button className="coin">
              <img src="/image/icon-coin.35e2c2ac0b9fe1fa.svg" alt="" />
            </button>
            <button className="plus">
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
            onMouseDown={onHeat}
            onMouseUp={onHeatEnd}
            onMouseLeave={onHeatEnd}
            onTouchStart={onHeat}
            onTouchEnd={onHeatEnd}
          >
            <img src="/image/icon-balloon-fire.svg"/>
            HEAT
          </button>
          <button className="take">
            <span>
              <div>TAKE</div>
              <div>0.00</div>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
