import C from "../constants.js";

export default class HUD {
  /**
   * @param {p5}  p
   * @param {Hook} hook para pegar profundidade e hits
   */
  constructor(p, hook) {
    this.p = p;
    this.hook = hook;
  }

  draw(score) {
    const p = this.p;

    /* painel */
    const paneW = 110;
    const paneH = 60;
    p.noStroke();
    p.fill(0, 160);                 // preto semi-transparente
    p.rect(8, 8, paneW, paneH, 8);

    /* texto */
    p.fill(255);
    p.textFont("monospace");
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);

    const depthMeters = Math.floor(
      (this.hook.y - C.LAKE_Y) / C.PX_PER_METER
    );
    const lines = [
      `Depth: ${depthMeters} m`,
      `Hits:  ${this.hook.hitsDown}/${C.HITS_LIMIT}`,
      `Score: ${score}`,
    ];

    lines.forEach((txt, i) => {
      p.text(txt, 14, 14 + i * 16);
    });
  }
}
