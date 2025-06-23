import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "../game/sketch";
import "../pages/ui.css";

export default function GamePage({ difficulty, onGameOver }) {
  return (
    <div className="game-container">
      <ReactP5Wrapper
        sketch={sketch}
        difficulty={difficulty}
        onGameOver={onGameOver}
      />
    </div>
  );
}
