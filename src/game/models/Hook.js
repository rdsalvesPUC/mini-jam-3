import C from "../constants.js";

export default class Hook {
	constructor(p) {
		this.p = p;
		this.reset();
	}

	reset() {
		this.x = C.ROD_TIP_X;
		this.y = C.ROD_TIP_Y;
		this.vy = C.DESC_SPEED_PX;
		this.hitsDown = 0;
		this.hooked = []; // peixes fisgados (subida)
		this.state = "waiting"; // ou 'ascending'
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

	draw(imgHook) {
		const p = this.p;

		// 1) Linha do anzol (do fim da vara até o anzol)
		p.stroke("#945524");
		p.strokeWeight(2);
		p.line(C.ROD_TIP_X, C.ROD_TIP_Y, this.x, this.y);

		// 2) Anzol (triângulo branco)
		const w = 24,
			h = 24; // ajuste fino se precisar
		p.imageMode(p.CENTER);
		p.image(imgHook, this.x, this.y + h / 2, w, h);

		// 3) Desenha peixes fisgados abaixo do anzol
		for (const f of this.hooked) {
			const yPos = this.y + f.relOffset;
			p.fill(C.COLORS.fishHooked);
			p.ellipse(this.x, yPos, 40, 24);
			p.triangle(this.x - 20, yPos, this.x - 30, yPos - 6, this.x - 20, yPos + 6);
		}
	}
}
