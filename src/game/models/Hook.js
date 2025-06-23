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

		const hookW = 24;
		const hookH = 24;
		p.imageMode(p.CENTER);
		p.image(imgHook, this.x, this.y + hookH / 2, hookW, hookH);

		// 3) Desenha peixes fisgados abaixo do anzol (PNG)
		p.imageMode(p.CENTER);
		const fishW = 60;
		const fishH = 60;

		const baseRadius = 32; // distância entre boca do peixe e anzol
		const stepAngle = p.radians(15); // espaçamento angular

		this.hooked.forEach((f, idx) => {
			// distribui angulos: 0°, -15°, +15°, -30°, +30°, ...
			const dir = idx % 2 === 0 ? -1 : 1; // alterna esquerda / direita
			const k = Math.floor(idx / 2);
			const angleOffset = dir * k * stepAngle;

			p.push();
			// 1) origem no ponto do anzol
			p.translate(this.x, this.y);

			// 2) aplica offset em leque
			p.rotate(angleOffset);
			p.translate(0, baseRadius);

			// 3) gira peixe para que a boca aponte p/ anzol
			//    se sprite original virava <--, já está flipado: usa +90°
			//    se virava –->, usa -90°
			const mouthUp = f.speed < 0 ? p.HALF_PI : -p.HALF_PI;
			p.rotate(mouthUp);

			// 4) desenha sprite
			p.image(f.img, 0, 0, fishW, fishH);
			p.pop();
		});
	}
}
