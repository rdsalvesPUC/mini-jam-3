import { useState } from "react";
import TitlePage from "./pages/TitlePage";
import DifficultyPage from "./pages/DifficultyPage";
import TutorialPage from "./pages/TutorialPage";
import GamePage from "./pages/GamePage";
import "./index.css";
import "./pages/ui.css";

export default function App() {
  const [page, setPage] = useState("title");
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <>
      {page === "title"      && <TitlePage      onNext={() => setPage("tutorial")} />}
      {page === "tutorial"   && <TutorialPage   onNext={() => setPage("difficulty")} />}
      {page === "difficulty" && (
        <DifficultyPage
          onSelect={(level) => { setDifficulty(level); setPage("game"); }}
        />
      )}
      {page === "game"       && (
        <GamePage
          difficulty={difficulty}
          onGameOver={() => setPage("title")}
        />
      )}
    </>
  );
}
