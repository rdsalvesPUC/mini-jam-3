import tutorialBg from "../assets/tutorial.png";

export default function TutorialPage({ onNext }) {
  return (
    <div
      className="page"
      style={{ backgroundImage: `url(${tutorialBg})` }}
    >
      {/* texto no pergaminho */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 70,
          width: 230,
          height: 210,
          fontSize: 16,
          fontWeight: "bolder",
          textAlign: "center",
          lineHeight: "1.3em",
          color: "#2d3748",
        }}
      >
          {/* <span>Use ← → para mover o anzol.</span><br />
          <span>Desvie dos peixes na descida (máx. 3).</span><br />
        <span>Na subida, pesque o máximo que puder!</span> */}
        <p>
          Use ← → para mover o anzol<br /><br />
          Desvie dos peixes na descida (máx. 3)<br /><br />
        Na subida, pesque o máximo que puder!
        </p>
      </div>

      {/* botão invisível sobre “Escolher Dificuldade” */}
      <button
        className="tutorial-next-hotspot"
        onClick={onNext}
      />
    </div>
  );
}
