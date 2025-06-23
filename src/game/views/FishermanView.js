/**
 * Desenha o pescador (imagem) acima da linha d’água.
 * @param {p5} p 
 * @param {p5.Image} imgFisher 
 */
export function drawFisherman(p, imgFisher) {
  // ajuste x/y e escala conforme seu layout antigo
  const x = 5, y = 270, w = 130, h = 130;
  p.image(imgFisher, x, y, w, h);
}

/**
 * Desenha a vara girada no mesmo ponto onde ficava o retângulo antes.
 * @param {p5} p 
 * @param {p5.Image} imgRod 
 */
export function drawRod(p, imgRod) {
  p.push();
  p.translate(230, 215);
  p.scale(-1, 1);
  // p.rotate(-p.PI / 8);
  const rw = 170, rh = 170;
  p.image(imgRod, 0, 0, rw, rh);
  p.pop();
}
