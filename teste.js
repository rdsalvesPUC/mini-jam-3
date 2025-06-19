function setup() {
  createCanvas(360, 600);
}

function draw() {
  background(200);
  drawFisherman();
  drawLake();
  drawLineAngler();
  drawWalls();
  drawFish();
  drawRod();
}

function drawFisherman() {
  fill('white');
  rect(20, 50, 50, 150);
}

function drawRod(){
  fill('black');
  rotate(QUARTER_PI / 4);
  rect(70, 100, 150, 10)
}

function drawLineAngler(){
  fill('white');
  rect(190, 150, 3, 300);
  triangle(180, 450, 190, 470, 200, 450)
}

function drawLake(){
  fill(0, 110, 215);
  rect(0, 200, 360, 400);
}

function drawWalls(){
  fill('brown');
  rect(0, 200, 20, 400);
  fill('brown');
  rect(340, 200, 20, 400);
}

function drawFish(){
  fill('yellow');
  ellipse(120,500,40,24);
}