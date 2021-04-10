'use strict';

//declarar variáveis
// tileCountX e tileCountY são o número de gradações na largura e na altura
var tileCountX = 2;
var tileCountY = 20;

//colorsLeft e colorsRight são as cores para a esquerda e direita das colunas
var colorsLeft = [];
var colorsRight = [];

// variável para salvar a paleta
var colors = [];


//método de interpolação
var interpolateShortest = true;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  noStroke();
  shakeColors();
}

function draw() {
  //o número de gradações é determinado pela posição do mouse
  tileCountX = int(map(mouseX, 0, width, 2, 100, true));
  tileCountY = int(map(mouseY, 0, height, 2, 20, true));
  
  //determina a altura dos retângulos
  var tileWidth = width / tileCountX;
  var tileHeight = height / tileCountY;

  //declara o interCol
  var interCol;

  //??
  colors = [];

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    var col1 = colorsLeft[gridY];
    var col2 = colorsRight[gridY];

    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var amount = map(gridX, 0, tileCountX - 1, 0, 1, true);

      if (interpolateShortest) {
        // trocar para RGB
        colorMode(RGB);
        interCol = lerpColor(col1, col2, amount);
        //trocar novamente
        colorMode(HSB);
      } else {
        interCol = lerpColor(col1, col2, amount);
      }

      fill(interCol);

      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      rect(posX, posY, tileWidth, tileHeight);

      //salvar a cor para exportar
      colors.push(interCol);
    }
  }
}

function shakeColors() {
  for (var i = 0; i < tileCountY; i++) {
    colorsLeft[i] = color(random(0, 360), random(0, 100), random(0, 100));
    colorsRight[i] = color(random(0, 360), random(0, 100), random(0, 100));
  }
}

function mouseReleased() {
  shakeColors();
}

function keyPressed() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;
}