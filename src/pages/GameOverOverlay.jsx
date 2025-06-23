export default function GameOverOverlay({ score, onRestart, onSave }) {
  return (
    <div className="go-overlay">
      <h1>GAME OVER</h1>
      <p className="go-score">Score: {score}</p>

      <button onClick={onRestart}>Jogar novamente</button>
      <button className="sec" onClick={() => onSave(score)}>
        Salvar pontuação
      </button>
    </div>
  );
}
