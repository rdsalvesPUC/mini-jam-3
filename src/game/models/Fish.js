import C from "../constants.js";

export default class Fish {
  constructor(p, x, y, speed) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.hitDesc = false; // já colidiu na descida?
    this.relOffset = 0;   // usado se for fisgado na subida
  }

  update() {
    this.x += this.speed;
    if (this.x < C.WALL_W + 15 || this.x > C.W - C.WALL_W - 15) {
      this.speed *= -1;
    }
  }

  draw() {
    const { p } = this;
    p.fill(C.COLORS.fish);
    p.ellipse(this.x, this.y, 40, 24);
    p.triangle(
      this.x - 20,
      this.y,
      this.x - 30 * Math.sign(this.speed),
      this.y - 6,
      this.x - 20,
      this.y + 6
    );
  }
}