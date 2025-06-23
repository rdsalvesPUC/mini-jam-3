import Fish from "../models/Fish.js";
import C from "../constants.js";

export default class Spawner {
  constructor(p, spawnRate, fishImages) {
    this.p          = p;
    this.spawnRate  = spawnRate;
    this.fishImages = fishImages;  // array de p5.Image
  }

  /**
   * @param {Fish[]} list   lista de peixes já ativos
   * @param {number} camY   topo da viewport atual
   */
  maybeSpawn(list, camY) {
    if (this.p.random() < this.spawnRate) {
      const img = this.p.random(this.fishImages);
      const x   = this.p.random(C.WALL_W + 30, C.W - C.WALL_W - 30);
      const y   = camY + this.p.height + this.p.random(200);
      const sp  = this.p.random([1.2, -1.2]);

      list.push(new Fish(this.p, x, y, sp, img));
    }
  }
}
