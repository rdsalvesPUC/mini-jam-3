import GameController from "./controllers/GameController.js";
import C from "./constants.js";

import bgURL from "../assets/bg.png";
import fisherURL from "../assets/fisher.png";
import rodURL from "../assets/rod.png";
import hookURL from "../assets/angler.png";
import fish1URL from "../assets/fish-01.png";
import fish2URL from "../assets/fish-02.png";
import fish3URL from "../assets/fish-03.png";
import fish4URL from "../assets/fish-04.png";
import fish5URL from "../assets/fish-05.png";
import fish6URL from "../assets/fish-06.png";

export default function sketch(p) {
	let game;
	let imgBG, imgFisher, imgRod, imgHook;
	let imgFishes = [];

	// 1. Preload
	p.preload = () => {
		imgBG = p.loadImage(bgURL);
		imgFisher = p.loadImage(fisherURL);
		imgRod = p.loadImage(rodURL);
		imgHook = p.loadImage(hookURL);

		const urls = [fish1URL, fish2URL, fish3URL, fish4URL, fish5URL, fish6URL];
		imgFishes = urls.map((u) => p.loadImage(u));
	};

	// 2. Setup
	p.setup = () => {
		p.createCanvas(C.W, C.H);
	};

	// 3. updateWithProps: repassa imagens ao controlador
	p.updateWithProps = ({ difficulty = "easy", onGameOver }) => {
		if (!game || game.difficulty !== difficulty) {
			game = new GameController(p, difficulty, onGameOver, {
				bg: imgBG,
				fisher: imgFisher,
				rod: imgRod,
				hook: imgHook,
				fishes: imgFishes,
			});
		}
	};

	// 4. Draw loop
	p.draw = () => {
		if (game) {
			game.update();
			game.draw();
		}
	};
}
