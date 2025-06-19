/* =================== CONSTS =================== */
const W = 360, H = 600;
const LAKE_Y = 200;          // superfície do lago
const WALL_W = 20;
const DEPTH_MAX = 2000;      // distância vertical até o ponto de retorno
const DESC_SPEED = 2;
const ASC_INIT_SPEED = 5;
const ASC_ACCEL = 1.04;      // fator de aceleração por frame
const LIVES_INIT = 3;

/* =================== STATE =================== */
let hookX, hookY, hookVy;
let state, lives, score;
let fishes = [];
let camY = 0;
let flashTimer = 0;

function setup() {
  createCanvas(W, H);
  textFont('monospace');
  startNewRun();
}

function draw() {
  /* ---------- Update ---------- */
  if (state !== 'end') {
    updateHook();
    maybeSpawnFish();
    moveFishes();
    detectCollisions();
    updatePhysics();
  }

  /* ---------- Draw ---------- */
  drawBackground();
  drawFisherman();
  drawRod();

  push();
  translate(0, -camY);        // área submersa scrolla
  drawLake();
  drawWalls();
  drawLineAndHook();
  drawFishes();
  pop();

  drawHUD();
  drawGameOver();
}

/* ====== GAME FLOW ====== */
function startNewRun() {
  hookX  = width / 2;
  hookY  = LAKE_Y + 20;
  hookVy = DESC_SPEED;
  state  = 'descending';
  lives  = LIVES_INIT;
  if (score === undefined) score = 0; // mantém score entre runs, se quiser resetar zere aqui
  fishes = [];
  flashTimer = 0;
}

function beginAscent() {
  state  = 'ascending';
  hookVy = -ASC_INIT_SPEED;    // valor negativo sobe
}

function endRun() {            // chegou à superfície
  state = 'end';
}

/* ====== UPDATE SECTION ====== */
function updateHook() {
  // controle horizontal
  if (keyIsDown(LEFT_ARROW))  hookX -= 4;
  if (keyIsDown(RIGHT_ARROW)) hookX += 4;
  hookX = constrain(hookX, WALL_W + 5, W - WALL_W - 5);

  // câmera segue anzol
  camY = hookY - H * 0.35;
}

function updatePhysics() {
  if (state === 'descending') {
    hookY += hookVy;
    if (hookY >= LAKE_Y + DEPTH_MAX) beginAscent();
  } else if (state === 'ascending') {
    hookVy *= ASC_ACCEL;          // acelera
    hookY += hookVy;              // hookVy é negativo
    if (hookY <= LAKE_Y + 5) endRun();
  }
}

function maybeSpawnFish() {
  if (random() < 0.02) {
    fishes.push({
      x: random(WALL_W + 30, W - WALL_W - 30),
      y: camY + height + random(120),
      speed: random([1.2, -1.2])
    });
  }
}

function moveFishes() {
  for (const f of fishes) {
    f.x += f.speed;
    if (f.x < WALL_W + 15 || f.x > W - WALL_W - 15) f.speed *= -1;
  }
}

function detectCollisions() {
  for (const f of fishes) {
    if (dist(f.x, f.y, hookX, hookY) < 18) {
      if (state === 'descending') {
        lives--;
        flashTimer = 10;
        if (lives <= 0) beginAscent();
      } else if (state === 'ascending') {
        score += 10;
        flashTimer = 6;
      }
      // remove peixe capturado
      fishes.splice(fishes.indexOf(f), 1);
    }
  }
}

/* ====== DRAW SECTION ====== */
function drawBackground() {
  if (flashTimer > 0) { background(255, 60, 60); flashTimer--; }
  else                { background(200); }
}

function drawFisherman() {
  fill('white');
  rect(20, 50, 50, 150);
}

function drawRod() {
  push();
  translate(70, 100);
  rotate(-Math.PI / 8);
  fill('black');
  rect(0, 0, 150, 6);
  pop();
}

function drawLineAndHook() {
  const tipX = 70 + 150 * Math.cos(-Math.PI / 8);
  const tipY = 100 + 150 * Math.sin(-Math.PI / 8);

  stroke(255);
  strokeWeight(2);
  line(tipX, tipY, hookX, hookY);
  noStroke();
  fill(255);
  triangle(hookX - 6, hookY,
           hookX + 6, hookY,
           hookX, hookY + 10);
}

function drawLake() {
  fill(0, 110, 215);
  rect(0, LAKE_Y, width, 4000);
}

function drawWalls() {
  fill('brown');
  rect(0, LAKE_Y, WALL_W, 4000);
  rect(width - WALL_W, LAKE_Y, WALL_W, 4000);
}

function drawFishes() {
  fill('yellow');
  for (const f of fishes) {
    ellipse(f.x, f.y, 40, 24);
    triangle(f.x - 20, f.y,
             f.x - 30 * Math.sign(f.speed), f.y - 6,
             f.x - 20, f.y + 6);
  }
}

function drawHUD() {
  fill(0);
  noStroke();
  rect(0, 0, width, 80);
  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  text(`Depth: ${int(hookY - LAKE_Y)} m`, 10, 10);
  text(`Lives: ${lives}`,              10, 28);
  text(`Score: ${score}`,              10, 46);

  if (state === 'ascending')
    textAlign(RIGHT, TOP),
    text('↑ Reeling in!', width - 10, 10);
}

function drawGameOver() {
  if (state === 'end') {
    fill(0, 180);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
    text(`Fim da rodada\nScore: ${score}\nClique para jogar de novo`, width / 2, height / 2);
  }
}

/* ====== INPUT ====== */
function mousePressed() {
  if (state === 'end') startNewRun();
}