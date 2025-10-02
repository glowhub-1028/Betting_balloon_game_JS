import React from "react";
import "./dashboard.css";

import Header from "../component/header/header";
import Footer from "../component/footer/footer";
import { useGame } from "../hooks/useGame";

const Dashboard = () => {
  const { isFlowing, coefficient, animationKey } = useGame();

  return (
    <>
      {/* <main className = "main_window"> */}
        <div className="dashboard">
          <Header />
          <div className="background" key={animationKey}>
            <div className={`bg-main${isFlowing ? " bg-main--flow" : ""}`}></div>
            <div className="stars">
              <img className="star" src="/image/stars.png" alt="star" srcSet="" />
              <img className="star" src="/image/stars.png" alt="star" srcSet="" />
            </div>
            <img className="cloud" src="/image/clouds.png" />
            <img className="bg-img" src="/image/location3.png" />
          </div>
          <div className="balloon_red">
            <div className="balloon_red_fire"></div>
            <img src="/image/airballoon-red.png" alt="" className="balloon" />
          </div>
          <div className = "coefficient">
            <span className = "coefficient_main">
              {coefficient.toFixed(2)}
              </span>
          </div>

          <Footer />
        </div>
      {/* </main> */}
    </>
  );
};


export default Dashboard;
