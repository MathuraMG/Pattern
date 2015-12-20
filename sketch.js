//CANVAS VARIABLES
var cWidth = 200;
var cHeight = 200;
var totIt = 5;
var fWidth = 800;
var fHeight = 800;
var flag = 0;
var inst = '';
var instDiv;
var overallBG = 255;
var palletteImage;
var pMarkerImg;
var overAllSat = 40; //change to 50
var overAllBr = 90;
var selectPattern = "";
var squares = [];

var circleSize = 60;

var fractalX = -60;
var fractalY = -60;

//DRAWING VARIABLES
var circles = [];
var fractals = [];
var count = 0;
var pg = [];
var pgOne;

var gridGraph;
var linePosX = 0;
var colour;
var pause = false;
var brCount = 0;

var xsplit, ysplit;

//COLOUR VARIABLES
var hueStart = 0;

//MUSIC VARIABLES
var freq = [261, 329, 392, 440, 523];
var vol = [];
var osc = [];
var notes = [];
var totNotes = 3;
var imgData;
var ctx;
var posX = 0;
var selectX, selectY;
var canvArea;

//BROWNIAN VARIABLES
var num = 100;
var range = 20;
var numLines = 25;
var linesBr = [];
var brTrue = false;

//pythTree variables
var particle = [];
var particlenew = [];
var startX, endX, beginX;
var startY, endY, beginY;
var count;
var j_count = 0;
var delay = 0;
var frame = 0;
var totAngle;
var fractal = 1;
var sideVal;

var direction = 45;

var canvasWidth;
var canvasHeight;

var paletteX, paletteY;

var ptouchx = [-60, -60, -60, -60, -60];
var ptouchy = [-60, -60, -60, -60, -60];

var brHand;
var trHand;
var crHand;
var handScaleFactor = 0.5;


function preload() {
  notes = [loadSound('assets/bass.mp3'), loadSound('assets/drums.mp3'), loadSound('assets/piano.mp3')];
  palletteImage = loadImage('assets/pallette1.png');
  brHand = loadImage('assets/brHand.png');
  trHand = loadImage('assets/trHand.png');
  crHand = loadImage('assets/crHand.png');

}

function setup() {
  overallBG = color("#f8f8dc");
  background(overallBG);
  setupFnButtons();
  setupP();
  initMusic();
  canvasGraphics();
  selectButtonImg();
  drawHomePage();
  paletteX = 125;
  paletteY = windowHeight - 125;
  drawPalette(paletteX, paletteY);
  pMarkerImg = createImg('assets/pMarker.png');
  refreshFn();
}

function draw() {

  if (selectPattern == 'circles' && pause == false) {
    for (var i = 0; i < squares.length; i++) {
      squares[i].drawSqFractal();
    }


  } else if (selectPattern == 'lines' && pause == false && brTrue == true) {
    lineArt(selectX, selectY, hueStart);

  } else if (selectPattern == 'fractals' && pause == false) {
    for (var i = 0; i < fractals.length; i++) {
      fractals[i].drawFractal();
    }
  }
  //blendMode(BLEND );

  drawPaletteMarker(paletteX, paletteY, hueStart);
  drawImageGestures();
  //textInstructions();


}

function mouseDragged() {
  //print(circleSize);
  hueStart = selectHueColor(paletteX, paletteY, hueStart);
  if (selectPattern == 'fractals') {
    strokeWeight(1);
    //if (frameCount % 2 == 0) {
    if ((mouseX < paletteX + 50 && mouseY > paletteY - 50) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {

      if (dist(mouseX, mouseY, fractalX, fractalY) > abs(circleSize) * 3) {
        //setSelect();
        fractalX = mouseX;
        fractalY = mouseY;
        fractalArt(fractalX, fractalY);
      }
    }
    //}
  }
}

function mouseReleased() {
  hueStart = selectHueColor(paletteX, paletteY, hueStart);

  if (selectPattern == 'lines') {
    if ((mouseX < paletteX + 75 && mouseY > paletteY - 75) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {
      linesBr = [];
      brCount = 0;
      //blendMode(LIGHTEST);
      l = new elt();
      setSelect();
      l.init(selectX, selectY); //,selectX+200, selectY);
      strokeWeight(0);
      l.drawLine();
      linesBr[0] = l;
      brTrue = true;
    }

  } else if (selectPattern == 'circles') {

    if ((mouseX < paletteX + 75 && mouseY > paletteY - 75) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {
      endX = mouseX;
      endY = mouseY;

      var dir1 = atan((endY - beginY) / (endX - beginX));
      if (true) { //endY >= beginY) {
        if (dir1 > 0 && dir1 < 90) {
          direction = map(dir1, 0, 90, 10, 45);
        } else if (dir1 < 0) {
          direction = map(dir1, -90, 0, 45, 80);
        }
        var a = abs(direction);
        var b = map(a, 0, 90, 3, 6);
        sideVal = dist(beginX, beginY, endX, endY) / b;
        //print(dir1 + ',' + direction);
        startX = beginX;
        startY = beginY;
        setSelect();

        particle = [];
        particlenew = [];
        j_count = 0;
        var s = new sqFractal(startX, startY, sideVal, hueStart, direction);
        s.init();
        squares.push(s);
      }
    }

  } else {
    if ((mouseX < paletteX + 75 && mouseY > paletteY - 75) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {
      setSelect();
    }
  }
}

function mousePressed() {
  if (selectPattern == 'circles') {

    beginX = mouseX;
    beginY = mouseY;
  }


}

function keyPressed() {

  if (keyCode == 32) {
    pauseFn();
  }
}



/*******************************************
    TOUCH FUNCTIONS
 *******************************************/

function touchStarted() {
  print('hello2');
  if (selectPattern == 'circles') {

    beginX = touchX;
    beginY = touchY;
  }
}

function touchEnded() {
  print('hello1');
  hueStart = selectHueColor(paletteX, paletteY, hueStart);
  if (selectPattern == 'circles') {

    //if ((mouseX < paletteX + 75 && mouseY > paletteY - 75) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {
    endX = touchX;
    endY = touchY;

    var dir1 = atan((endY - beginY) / (endX - beginX));
    if (true) { //endY >= beginY) {
      if (dir1 > 0 && dir1 < 90) {
        direction = map(dir1, 0, 90, 10, 45);
      } else if (dir1 < 0) {
        direction = map(dir1, -90, 0, 45, 80);
      }
      var a = abs(direction);
      var b = map(a, 0, 90, 3, 6);
      sideVal = dist(beginX, beginY, endX, endY) / b;
      //print(dir1 + ',' + direction);
      startX = beginX;
      startY = beginY;
      setSelect();

      particle = [];
      particlenew = [];
      j_count = 0;
      var s = new sqFractal(startX, startY, sideVal, hueStart, direction);
      s.init();
      squares.push(s);
      print(squares.length);
    }
  }

}

function touchMoved(event) {
  event.preventDefault();
print('in here');
  hueStart = selectHueColor(paletteX, paletteY, hueStart);
  if (selectPattern == 'fractals') {
    print(touches.length);
    strokeWeight(1);
    for (var i = 0; i < touches.length; i++) {
      
      var tX = touches[i].x;
      var tY = touches[i].y;
      if ((tX < paletteX + 50 && tY > paletteY - 50) || (tY > 0.8 * windowHeight && tX > windowWidth * 0.8)) {} else {
        if (dist(tX, tY, ptouchx[i], ptouchy[i]) > 60) {
          ptouchx[i] = tX;
          ptouchy[i] = tY;
          fractalArt(tX, tY);
        }
      }
    }
  }
}