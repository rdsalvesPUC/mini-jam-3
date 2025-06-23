import C from "../constants.js";

export default class Hook {
  constructor(p) {
    this.p = p;
    this.reset();
  }

  reset() {
    this.x        = C.W / 2;
    this.y        = C.LAKE_Y + 20;
    this.vy       = C.DESC_SPEED_PX;
    this.hitsDown = 0;
    this.hooked   = [];    // peixes fisgados (subida)
    this.state    = "descending"; // ou 'ascending'
  }

  update() {
    this.y += this.vy;
    if (this.state === "ascending") {
      this.vy *= C.ASC_ACCEL;
    }
  }

  collides(fish) {
    return this.p.dist(this.x, this.y, fish.x, fish.y) < 18;
  }

  draw() {
    const p = this.p;

    // 1) Linha do anzol (do fim da vara até o anzol)
    const tx = 70 + 150 * p.cos(-p.PI / 8);
    const ty = 100 + 150 * p.sin(-p.PI / 8);
    p.stroke(255);
    p.strokeWeight(2);
    p.line(tx, ty, this.x, this.y);

    // 2) Anzol (triângulo branco)
    p.noStroke();
    p.fill(255);
    p.triangle(
      this.x - 6, this.y,
      this.x + 6, this.y,
      this.x,     this.y + 10
    );

    // 3) Desenha peixes fisgados abaixo do anzol
    for (const f of this.hooked) {
      const yPos = this.y + f.relOffset;
      p.fill(C.COLORS.fishHooked);
      p.ellipse(this.x, yPos, 40, 24);
      p.triangle(
        this.x - 20,         yPos,
        this.x - 30,         yPos - 6,
        this.x - 20,         yPos + 6
      );
    }
  }
}
