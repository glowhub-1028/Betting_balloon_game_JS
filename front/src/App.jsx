import React from "react";
import "./App.css";
import Dashboard from "./dashboard/dashboard";
import HowToPlay from "./component/how_to_play";
import AutoBetting from "./component/auto_betting";
import { GameProvider } from "./context/GameContext";

function App() {

  return (
    <GameProvider>
      <Dashboard />
       {/* <HowToPlay /> */}
       {/* <AutoBetting /> */}
    </GameProvider>
  );
}

export default App;
