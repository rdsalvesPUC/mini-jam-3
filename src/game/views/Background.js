import C from "../constants.js";

// export function drawLake(p) {
//   p.fill(C.COLORS.lake);
//   p.rect(0, C.LAKE_Y, C.W, 8000);
// }

export function drawLake(p, imgBG, camY) {
  // desenha o PNG de fundo em vez de rects
  p.image(imgBG, 0, C.LAKE_Y - camY, C.W, C.H * 3);
}

export function drawWalls(p) {
  p.fill(C.COLORS.wall);
  p.rect(0, C.LAKE_Y, C.WALL_W, 8000);
  p.rect(C.W - C.WALL_W, C.LAKE_Y, C.WALL_W, 8000);
}