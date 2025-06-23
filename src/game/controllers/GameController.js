import C from "../constants.js";
import Hook from "../models/Hook.js";
import Spawner from "./Spawner.js";
import HUD from "../views/HUD.js";
import { drawLake } from "../views/Background.js";
import { drawFisherman, drawRod } from "../views/FishermanView.js";

export default class GameController {
  constructor(p, difficulty, onGameOver, assets) {
    this.p          = p;
    this.difficulty = difficulty;
    this.onGameOver = onGameOver;

    // imagens pré-carregadas
    this.imgBG     = assets.bg;
    this.imgFisher = assets.fisher;
    this.imgRod    = assets.rod;

    this.hook      = new Hook(p);
    this.spawner   = new Spawner(p, { easy: 0.015, medium: 0.025, hard: 0.035 }[difficulty]);
    this.hud       = new HUD(p, this.hook);
    this.fishes    = [];
    this.score     = 0;
    this.flashTimer= 0;
  }

  update() {
    const p = this.p;

    // movimento horizontal do anzol
    if (p.keyIsDown(p.LEFT_ARROW))  this.hook.x -= 4;
    if (p.keyIsDown(p.RIGHT_ARROW)) this.hook.x += 4;
    this.hook.x = p.constrain(this.hook.x, C.WALL_W + 5, C.W - C.WALL_W - 5);

    // spawn e atualização dos peixes
    const camY = this.hook.y - C.H * 0.35;
    this.spawner.maybeSpawn(this.fishes, camY);
    this.fishes.forEach(f => f.update());
    this.fishes = this.fishes.filter(f => f.y < camY + C.H + 600);

    // colisões e lógica descida/subida
    for (let i = this.fishes.length - 1; i >= 0; i--) {
      const f = this.fishes[i];
      if (!this.hook.collides(f)) continue;

      if (this.hook.state === "descending") {
        if (!f.hitDesc) {
          this.hook.hitsDown++;
          f.hitDesc = true;
          if (this.hook.hitsDown >= C.HITS_LIMIT) {
            this.hook.state = "ascending";
            this.hook.vy    = -C.ASC_INIT_PX;
          }
        }
      } else {
        // ascending
        this.score += 10;
        f.relOffset = 20 + this.hook.hooked.length * 20;
        this.hook.hooked.push(f);
        this.fishes.splice(i, 1);
      }

      this.flashTimer = 6;
    }

    // limite de profundidade
    if (
      this.hook.state === "descending" &&
      this.hook.y - C.LAKE_Y >= C.DEPTH_MAX_M * C.PX_PER_METER
    ) {
      this.hook.state = "ascending";
      this.hook.vy    = -C.ASC_INIT_PX;
    }

    // física vertical do anzol
    this.hook.update();

    // fim de rodada
    if (this.hook.state === "ascending" && this.hook.y <= C.LAKE_Y + 5) {
      this.onGameOver();
    }
  }

  draw() {
    const p = this.p;

    // 1) fundo + flash
    p.background(
      this.flashTimer-- > 0
        ? p.color(...C.COLORS.flash)
        : 200
    );

    // 2) desenha pescador e vara (fora do scroll)
    drawFisherman(p, this.imgFisher);
    drawRod(p, this.imgRod);

    // 3) mundo submerso que escrola
    const camY = this.hook.y - C.H * 0.35;
    p.push();
    p.translate(0, -camY);

    // 3a) background como imagem
    drawLake(p, this.imgBG, camY);

    // 3b) linha + anzol + peixes
    this.hook.draw();
    this.fishes.forEach(f => f.draw());

    p.pop();

    // 4) HUD por cima de tudo
    this.hud.draw(this.score);
  }
}
