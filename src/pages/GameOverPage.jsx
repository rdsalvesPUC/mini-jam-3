import React from "react";
import "../pages/ui.css";   // usa mesmo CSS base das outras páginas

export default function GameOverPage({ score, onRestart, onSave }) {
  return (
    <div className="game-container flex-col">
      <h1 className="go-title">GAME OVER</h1>

      <p className="go-score">Score: {score}</p>

      <button className="go-btn" onClick={onRestart}>
        Jogar novamente
      </button>

      <button className="go-btn sec" onClick={() => onSave(score)}>
        Salvar pontuação
      </button>
    </div>
  );
}
