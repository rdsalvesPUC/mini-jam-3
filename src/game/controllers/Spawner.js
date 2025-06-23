import Fish from "../models/Fish.js";
import C from "../constants.js";

export default class Spawner {
  constructor(p, density) {
    this.p = p;
    this.density = density; // probabilidade por frame
  }

  maybeSpawn(list, camY) {
    if (this.p.random() < this.density) {
      list.push(
        new Fish(
          this.p,
          this.p.random(C.WALL_W + 30, C.W - C.WALL_W - 30),
          camY + C.H + this.p.random(50 * C.PX_PER_METER),
          this.p.random([1.2, -1.2])
        )
      );
    }
  }
}