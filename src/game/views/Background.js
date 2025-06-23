import C from "../constants.js";

/* --- SUPERFÍCIE --- */
export function drawSurface(p, imgBG) {
  p.image(imgBG, 0, 0, C.W, C.H);
}

/* --- ÁGUA --- */
export function drawWater(p) {
  // começa 600 px abaixo da linha d’água (fora da viewport inicial)
  const top = C.H;           // 200 + 600 = 800 em coordenadas do mundo
  p.fill("#07819C");
  p.noStroke();
  p.rect(0, top, C.W, C.H * 4);         // bastante altura para fundo
}
