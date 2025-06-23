import { useState } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "../game/sketch";
import GameOverOverlay from "./GameOverOverlay";
import "../pages/ui.css";

export default function GamePage({ difficulty, onExitToMenu, onSaveScore }) {
  const [phase, setPhase]   = useState("play");   // 'play' | 'gameover'
  const [lastScore, setLast] = useState(0);

  const handleGameOver = (score) => {
    setLast(score);
    setPhase("gameover");
  };

  return (
    <div className="game-container" style={{ position: "relative" }}>
      <ReactP5Wrapper
        sketch={sketch}
        difficulty={difficulty}
        onGameOver={handleGameOver}
      />

      {/* overlay só depois do fim */}
      {phase === "gameover" && (
        <GameOverOverlay
          score={lastScore}
          onRestart={() => onExitToMenu()}   /* volta à Difficulty ou Title */
          onSave={onSaveScore}
        />
      )}
    </div>
  );
}
