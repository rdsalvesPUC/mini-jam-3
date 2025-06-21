// sketch.js — jogo completo em formato “inline” p/ react-p5-wrapper
export default function sketch(p) {
  /* ======= CONSTANTES ======= */
  const W = 360,  H = 600;
  const LAKE_Y = 200, WALL_W = 20;

  const PX_PER_METER   = 4;
  const DEPTH_MAX_M    = 500;
  const DEPTH_PX_LIMIT = DEPTH_MAX_M * PX_PER_METER;

  const DESC_SPEED_PX  = 2;
  const ASC_INIT_PX    = 2;
  const ASC_ACCEL      = 1.001;
  const HITS_LIMIT     = 3;

  /* ======= VARIÁVEIS ======= */
  let hookX, hookY, hookVy;
  let state;                       // 'descending' | 'ascending' | 'end'
  let hitsDown, score;
  let fishes = [];                 // soltos
  let hooked = [];                 // fisgados
  let camY = 0, flashTimer = 0;

  /* ======= P5 SETUP ======= */
  p.setup = () => {
    p.createCanvas(W, H);
    p.textFont("monospace");
    startRun();
  };

  /* ======= P5 DRAW ======= */
  p.draw = () => {
    if (state !== "end") {
      handleInput();
      maybeSpawnFish();
      moveFishes();
      detectCollisions();
      updatePhysics();
    }
    renderScene();
  };

  /* ======= CICLO DE VIDA ======= */
  function startRun() {
    hookX = p.width / 2;
    hookY = LAKE_Y + 20;
    hookVy = DESC_SPEED_PX;
    state = "descending";
    hitsDown = 0;
    score = 0;
    fishes = [];
    hooked = [];
    flashTimer = 0;
  }
  function beginAscent() { state = "ascending"; hookVy = -ASC_INIT_PX; }
  function endRun()       { state = "end"; hooked = []; }

  /* ======= UPDATE ======= */
  function handleInput() {
    if (p.keyIsDown(p.LEFT_ARROW))  hookX -= 4;
    if (p.keyIsDown(p.RIGHT_ARROW)) hookX += 4;
    hookX = p.constrain(hookX, WALL_W + 5, W - WALL_W - 5);
    camY  = hookY - H * 0.35;
  }

  function updatePhysics() {
    if (state === "descending") {
      hookY += hookVy;
      if (hookY - LAKE_Y >= DEPTH_PX_LIMIT) beginAscent();
    } else if (state === "ascending") {
      hookVy *= ASC_ACCEL;
      hookY  += hookVy;
      if (hookY <= LAKE_Y + 5) endRun();
    }
  }

  function maybeSpawnFish() {
    if (p.random() < 0.02) {
      fishes.push({
        x: p.random(WALL_W + 30, W - WALL_W - 30),
        y: camY + H + p.random(50 * PX_PER_METER),
        speed: p.random([1.2, -1.2]),
        hitDesc: false
      });
    }
  }

  function moveFishes() {
    for (const f of fishes) {
      f.x += f.speed;
      if (f.x < WALL_W + 15 || f.x > W - WALL_W - 15) f.speed *= -1;
    }
    fishes = fishes.filter(f => f.y < camY + H + 600);
  }

  function detectCollisions() {
    for (let i = fishes.length - 1; i >= 0; i--) {
      const f = fishes[i];
      if (p.dist(f.x, f.y, hookX, hookY) >= 18) continue;

      if (state === "descending") {
        if (!f.hitDesc) {
          hitsDown++;
          f.hitDesc = true;
          if (hitsDown >= HITS_LIMIT) beginAscent();
        }
      } else if (state === "ascending") {
        score += 10;
        f.relOffset = 20 + hooked.length * 20;
        hooked.push(f);
        fishes.splice(i, 1);
      }
      flashTimer = 8;
    }
  }

  /* ======= RENDER ======= */
  function renderScene() {
    p.background(flashTimer-- > 0 ? p.color(255, 60, 60) : 200);

    drawFisherman();
    drawRod();

    p.push();
    p.translate(0, -camY);
    drawLake();
    drawWalls();
    drawLineAndHook();
    drawFishes();
    p.pop();

    drawHUD();
    if (state === "end") drawGameOver();
  }

  /* === partes do desenho === */
  function drawFisherman() { p.fill("#fff"); p.rect(20, 50, 50, 150); }

  function drawRod() {
    p.push();
    p.translate(70, 100);
    p.rotate(-p.PI / 8);
    p.fill("#000");
    p.rect(0, 0, 150, 6);
    p.pop();
  }

  function drawLineAndHook() {
    const tx = 70 + 150 * p.cos(-p.PI / 8);
    const ty = 100 + 150 * p.sin(-p.PI / 8);

    p.stroke(255);
    p.strokeWeight(2);
    p.line(tx, ty, hookX, hookY);

    p.noStroke();
    p.fill(255);
    p.triangle(hookX - 6, hookY, hookX + 6, hookY, hookX, hookY + 10);

    for (const h of hooked) {
      const yPos = hookY + h.relOffset;
      p.fill("#5fd98c");
      p.ellipse(hookX, yPos, 40, 24);
      p.triangle(hookX - 20, yPos,
                 hookX - 30,      yPos - 6,
                 hookX - 20,      yPos + 6);
    }
  }

  function drawLake()  { p.fill(0, 110, 215); p.rect(0, LAKE_Y, W, 8000); }
  function drawWalls() { p.fill("brown");
    p.rect(0,            LAKE_Y, WALL_W, 8000);
    p.rect(W - WALL_W,   LAKE_Y, WALL_W, 8000); }

  function drawFishes() {
    p.fill("yellow");
    for (const f of fishes) {
      p.ellipse(f.x, f.y, 40, 24);
      p.triangle(f.x - 20, f.y,
                 f.x - 30 * Math.sign(f.speed), f.y - 6,
                 f.x - 20,                      f.y + 6);
    }
  }

  function drawHUD() {
    p.fill(0); p.rect(0, 0, W, 70);
    p.fill(255); p.textSize(14); p.textAlign(p.LEFT, p.TOP);
    const depthMeters = p.int((hookY - LAKE_Y) / PX_PER_METER);
    p.text(`Depth: ${depthMeters} m`,         10,  8);
    p.text(`Hits:  ${hitsDown}/${HITS_LIMIT}`,10, 26);
    p.text(`Score: ${score}`,                 10, 44);
    if (state === "ascending") {
      p.textAlign(p.RIGHT, p.TOP);
      p.text("↑ Reel in!", W - 10, 8);
    }
  }

  function drawGameOver() {
    p.fill(0, 180); p.rect(0, 0, W, H);
    p.fill(255); p.textAlign(p.CENTER, p.CENTER); p.textSize(22);
    p.text(`FIM!\nScore: ${score}\nClique p/ reiniciar`, W / 2, H / 2);
  }

  /* ======= INPUT ======= */
  p.mousePressed = () => { if (state === "end") startRun(); };
}
