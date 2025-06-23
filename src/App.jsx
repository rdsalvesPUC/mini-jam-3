import { useState } from "react";
import TitlePage      from "./pages/TitlePage";
import DifficultyPage from "./pages/DifficultyPage";
import TutorialPage   from "./pages/TutorialPage";
import GamePage       from "./pages/GamePage";
import GameOverPage   from "./pages/GameOverPage";

import "./index.css";
import "./pages/ui.css";

export default function App() {
  const [page, setPage]       = useState("title");
  const [difficulty, setDiff] = useState("easy");
  const [lastScore, setLast]  = useState(0);

  /* callback recebido de GamePage (traz o score final) */
  const handleGameOver = (score) => {
    setLast(score);
    setPage("gameover");
  };

  /* opcional: salvar score em algum lugar */
  const saveScore = (score) => {
    // exemplo simples — substitua por lógica real
    alert(`Score ${score} salvo!`);
  };

  return (
    <>
      {page === "title" && (
        <TitlePage onNext={() => setPage("tutorial")} />
      )}

      {page === "tutorial" && (
        <TutorialPage onNext={() => setPage("difficulty")} />
      )}

      {page === "difficulty" && (
        <DifficultyPage
          onSelect={(level) => {
            setDiff(level);
            setPage("game");
          }}
        />
      )}

      {page === "game" && (
        <GamePage
  difficulty={difficulty}
  onExitToMenu={() => setPage("difficulty")}   // ou "title"
  onSaveScore={(s) => alert(`Score ${s} salvo!`)}
/>
      )}

      {page === "gameover" && (
        <GameOverPage
          score={lastScore}
          onRestart={() => setPage("difficulty")}
          onSave={saveScore}
        />
      )}
    </>
  );
}
