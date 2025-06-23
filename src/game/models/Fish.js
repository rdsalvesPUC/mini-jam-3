import C from "../constants.js";

export default class Fish {
  /**
   * @param {p5}  p
   * @param {number} x
   * @param {number} y
   * @param {number} speed  (positivo = →  , negativo = ←)
   * @param {p5.Image} img  sprite do peixe
   */
  constructor(p, x, y, speed, img) {
    this.p         = p;
    this.x         = x;
    this.y         = y;
    this.speed     = speed;
    this.img       = img;       // <-- novo
    this.hitDesc   = false;     // já colidiu na descida?
    this.relOffset = 0;         // usado se for fisgado na subida
  }

  update() {
    this.x += this.speed;
    if (this.x < C.WALL_W + 15 || this.x > C.W - C.WALL_W - 15) {
      this.speed *= -1;
    }
  }

  draw() {
    const { p } = this;
    const w = 60, h = 60;                 // ajuste se necessário
    p.push();
    p.imageMode(p.CENTER);

    // vira o sprite conforme direção
    if (this.speed < 0) {
      p.scale(-1, 1);
      p.image(this.img, -this.x, this.y, w, h);
    } else {
      p.image(this.img, this.x, this.y, w, h);
    }
    p.pop();
  }
}
