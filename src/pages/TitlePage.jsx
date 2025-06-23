import titleBg from "../assets/title.png"; // <-- caminho relativo

export default function TitlePage({ onNext }) {
  return (
    <section
      className="page"
      style={{
        background: `url(${titleBg}) center / cover no-repeat`,
      }}
    >
      {/* Botão “Iniciar” já faz parte da arte; colocamos um overlay invisível */}
      <button
        className="title-start-hotspot"
        onClick={onNext}
      >
        
      </button>
    </section>
  );
}
