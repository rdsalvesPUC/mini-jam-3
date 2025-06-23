/**
 * Desenha o pescador (imagem) acima da linha d’água.
 * @param {p5} p 
 * @param {p5.Image} imgFisher 
 */
export function drawFisherman(p, imgFisher) {
  // ajuste x/y e escala conforme seu layout antigo
  const x = 20, y = 50, w = 120, h = 120;
  p.image(imgFisher, x, y, w, h);
}

/**
 * Desenha a vara girada no mesmo ponto onde ficava o retângulo antes.
 * @param {p5} p 
 * @param {p5.Image} imgRod 
 */
export function drawRod(p, imgRod) {
  p.push();
  p.translate(70, 100);
  p.rotate(-p.PI / 8);
  const rw = 200, rh = 50;
  p.image(imgRod, 0, 0, rw, rh);
  p.pop();
}
