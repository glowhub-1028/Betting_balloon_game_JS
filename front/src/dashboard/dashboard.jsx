import React, { useCallback, useState } from "react";
import "./dashboard.css";

import Header from "../component/header/header";
import Footer from "../component/footer/footer";

const Dashboard = () => {
  const [isFlowing, setIsFlowing] = useState(false);

  const handleHeatStart = useCallback(() => {
    setIsFlowing(true);
  }, []);

  const handleHeatEnd = useCallback(() => {
    setIsFlowing(false);
  }, []);

  return (
    <>
      <div className="dashboard">
        <Header />
        <div className={`bg-main${isFlowing ? " bg-main--flow" : ""}`}>
          
        </div>
        <div className="stars">
          <img className="star" src="/image/stars.png" alt="star" srcset="" />
          <img className="star" src="/image/stars.png" alt="star" srcset="" />
        </div>
        <img className="cloud" src="/image/clouds.png" />
        <img className="bg-img" src="/image/location3.png" />
        <Footer onHeat={handleHeatStart} onHeatEnd={handleHeatEnd} />
      </div>
    </>
  );
};

export default Dashboard;
