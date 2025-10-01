import React from "react";
import "./how_to_play.css";

const HowToPlay = () => {
  return (
    <>
      <div className="how_to_play">
        <div className="modal_content">
          <div className="modal_title">
            <div className="modal_title_text">How to play</div>
            <button className="modal_title_close">
            </button>
          </div>
          <div className="balloon_how">
            <div className="balloon_how_content">
              <p className="balloon_how_content_text"> Fly a hot balloon and catch big winnings! </p>
              <img className="balloon_how_content_image" src="/image/how-to-play.png" alt="balloon_how_content_image" />
              <p className="balloon_how_content_text"> Simply tap and hold “HEAT’ button to boost your multiplier. Cash out at any time.  </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToPlay;