import C from "../constants.js";
import Hook from "../models/Hook.js";
import Spawner from "./Spawner.js";
import HUD from "../views/HUD.js";
import { drawSurface, drawWater } from "../views/Background.js";
import { drawFisherman, drawRod } from "../views/FishermanView.js";

export default class GameController {
	constructor(p, difficulty, onGameOver, assets) {
		this.p = p;
		this.difficulty = difficulty;
		this.depthLimitPx = C.DEPTH_BY_DIFF[difficulty] * C.PX_PER_METER;
		this.onGameOver = onGameOver;

		// imagens pré-carregadas
		this.imgBG = assets.bg;
		this.imgFisher = assets.fisher;
		this.imgRod = assets.rod;
		this.imgHook = assets.hook;

		this.hook = new Hook(p);
		const spawn = { easy: 0.015, medium: 0.025, hard: 0.035 }[difficulty];
		this.spawner = new Spawner(p, spawn, assets.fishes);
		this.hud = new HUD(p, this.hook);
		this.fishes = [];
		this.score = 0;
		this.flashTimer = 0;

		this.phase = "countdown"; // 'countdown' → 'play'
		this.countdownMs = 5000;
		this.startTime = p.millis();
	}

	update() {
		const p = this.p;
		const now = p.millis();

		/* ----- Fase de CONTAGEM ----- */
		if (this.phase === "countdown") {
			this.countdownMs = 5000 - (now - this.startTime);
			if (this.countdownMs <= 0) {
				this.phase = "play";
				this.hook.state = "descending"; // libera a física
			}
			return; // espera contador zerar
		}

		/* ---------- Fase DIVING (anima a água subindo) ---------- */
		if (this.phase === "diving") {
			const t = (now - this.startTime) / this.diveDuration; // 0→1
			this.waterTopY = C.LAKE_Y + t * C.H; // sobe água
			if (t >= 1) {
				this.phase = "play";
				this.waterTopY = C.LAKE_Y + C.H; // cobre tudo
			}
			// ainda precisamos atualizar física da linha
			this.hook.update();
			return;
		}

		// movimento horizontal do anzol
		if (p.keyIsDown(p.LEFT_ARROW)) this.hook.x -= 4;
		if (p.keyIsDown(p.RIGHT_ARROW)) this.hook.x += 4;
		this.hook.x = p.constrain(this.hook.x, C.WALL_W + 5, C.W - C.WALL_W - 5);

		// spawn e atualização dos peixes
		const camY = this.hook.y - C.H * 0.35;
		this.spawner.maybeSpawn(this.fishes, camY);
		this.fishes.forEach((f) => f.update());
		this.fishes = this.fishes.filter((f) => f.y < camY + C.H + 600);

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
						this.hook.vy = -C.ASC_INIT_PX;
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
		if (this.hook.state === "descending" && this.hook.y - C.LAKE_Y >= this.depthLimitPx) {
			this.hook.state = "ascending";
			this.hook.vy = -C.ASC_INIT_PX;
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

		/* 1. fundo neutro ou flash */
		p.background(this.flashTimer-- > 0 ? p.color(...C.COLORS.flash) : 30);

		/* 2. sempre desenha a superfície sem scroll */
		drawSurface(p, this.imgBG);
		drawFisherman(p, this.imgFisher);
		drawRod(p, this.imgRod);

		/* 3. contador antes de mergulhar */
if (this.phase === "countdown") {
  const sec = Math.ceil(this.countdownMs / 1000);

  // desenha overlay escuro + número
  p.fill(0, 180);
  p.rect(0, 0, C.W, C.H);
  p.fill(255);
  p.textAlign(p.CENTER, p.CENTER);
  p.textSize(64);
  p.text(sec, C.W / 2, C.H / 2);

  /* --- HUD por cima do overlay --- */
  this.hud.draw(this.score);

  return;                 // encerra frame; nada submerso ainda
}

		/* ----- MUNDO ROLÁVEL (superfície + água + peixes) ----- */
		const camY = this.hook.y - C.H * 0.35;
		p.push();
		p.translate(0, -camY);

		// 1) Superfície (BG, pescador, vara) — agora sobe com a câmera
		drawSurface(p, this.imgBG);
		drawFisherman(p, this.imgFisher);
		drawRod(p, this.imgRod);

		// 2) Água: começa em C.LAKE_Y + C.H (fora do quadro no início);
		//    entra no viewport conforme camY cresce.
		drawWater(p, this.depthLimitPx);

		// 3) Linha + anzol + peixes (só durante 'play')
		if (this.phase === "play") {
			this.hook.draw(this.imgHook);
			this.fishes.forEach((f) => f.draw());
		}

		p.pop();

		/* 5. HUD */
		this.hud.draw(this.score);
	}
}
