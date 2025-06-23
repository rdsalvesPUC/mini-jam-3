import C from "../constants.js";

export default class HUD {
  constructor(p, hook) {
    this.p = p;
    this.hook = hook;
  }

  draw(score) {
    const { p } = this;
    p.fill(0);
    p.rect(0, 0, C.W, 70);
    p.fill(255);
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    const depth = p.int((this.hook.y - C.LAKE_Y) / C.PX_PER_METER);
    p.text(`Depth: ${depth} m`, 10, 8);
    p.text(`Hits:  ${this.hook.hitsDown}/${C.HITS_LIMIT}`, 10, 26);
    p.text(`Score: ${score}`, 10, 44);
    if (this.hook.state === "ascending") {
      p.textAlign(p.RIGHT, p.TOP);
      p.text("↑ Reel in!", C.W - 10, 8);
    }
  }
}