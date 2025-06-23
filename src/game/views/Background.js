import C from "../constants.js";

/* --- SUPERFÍCIE --- */
export function drawSurface(p, imgBG) {
  p.image(imgBG, 0, 0, C.W, C.H);
}

/**
 * Desenha o retângulo de água proporcional à profundidade máxima.
 * @param {p5} p
 * @param {number} depthPx profundidade-limite em pixels
 */
export function drawWater(p, depthPx) {
  const top = C.H;                 // y onde começa a água (600)
  p.fill("#07819C");
  // altura: profundidade inteira + 1 tela extra de folga
  p.rect(0, top, C.W, depthPx + C.H);
}