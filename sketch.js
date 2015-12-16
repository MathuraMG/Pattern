//CANVAS VARIABLES
var cWidth = 200;
var cHeight = 200;
var totIt = 5;
var fWidth = 800;
var fHeight = 800;
var flag = 0;
var inst = 'potato';
var instDiv;
var overallBG = 0;
var palletteImage;
var pMarkerImg;

var selectPattern = "";

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
var numLines = 50;
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
var pause = true;
var direction = 45;

var canvasWidth;
var canvasHeight;

var paletteX, paletteY;

function preload() {
  notes = [loadSound('assets/bass.mp3'), loadSound('assets/drums.mp3'), loadSound('assets/piano.mp3')];
  palletteImage = loadImage('assets/pallette1.png');

}

function setup() {
  background(overallBG);
  setupFnButtons();
  //setupSliders();
  //setupColorPallete();

  setupP();
  initMusic();
  canvasGraphics();
  selectButtonImg();
  drawHomePage();
  paletteX = 100;
  paletteY = windowHeight - 75;
  drawPalette(paletteX, paletteY);
  pMarkerImg = createImg('assets/pMarker.png');
}

function draw() {

  if (selectPattern == 'circles' && pause == false) {

    drawSq(startX, startY, sideVal, hueStart);

  } else if (selectPattern == 'lines' && brTrue == true) {
    background(overallBG);
    //blendMode(LIGHTEST);
    lineArt(selectX, selectY, hueStart);

  }
  //blendMode(BLEND );

  drawPaletteMarker(paletteX, paletteY, hueStart);
  textInstructions();

}

function mouseDragged() {
  if (selectPattern == 'fractals') {
    if ((mouseX < paletteX + 50 && mouseY > paletteY - 50) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {
      setSelect();
      fractalArt(selectX, selectY);

    }
  }
}

function mouseReleased() {
  hueStart = selectHueColor(paletteX, paletteY, hueStart);

  if (selectPattern == 'lines') {
    if ((mouseX < paletteX + 50 && mouseY > paletteY - 50) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {
      linesBr = [];
      brCount = 0;
      //blendMode(LIGHTEST);
      l = new elt();
      setSelect();
      l.init(selectX, selectY);
      strokeWeight(0);
      l.drawLine();
      linesBr[0] = l;
      brTrue = true;
    }

  } else if (selectPattern == 'circles') {
    if ((mouseX < paletteX + 50 && mouseY > paletteY - 50) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {
      endX = mouseX;
      endY = mouseY;
      sideVal = dist(beginX, beginY, endX, endY);
      var dir1 = atan((endY - beginY) / (endX - beginX));
      if (true){//endY >= beginY) {
        if (dir1 > 0 && dir1 < 90) {
          direction = map(dir1, 0, 90, 10, 45);
        } else if (dir1 < 0) {
          direction = map(dir1, -90, 0, 45, 80);
        }
        print(dir1 + ',' + direction);
        startX = beginX;
        startY = beginY;
        setSelect();

        particle = [];
        particlenew = [];
        j_count = 0;
      }
    }

  } else {
    if ((mouseX < paletteX + 50 && mouseY > paletteY - 50) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {
      setSelect();
    }
  }
}

function mousePressed() {
  if (selectPattern == 'circles') {
    // particle = [];
    // particlenew = [];
    // j_count = 0;
    beginX = mouseX;
    beginY = mouseY;
  }


}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    //print('yo');
    background(overallBG);
    pg.pop();
    fractals.pop();
    for (var i = 0; i < pg.length; i++) {

      //for (var a = 0; a < xsplit.value(); a++) {
      //for (var b = 0; b < ysplit.value(); b++) {
      image(pg[i], a * cWidth, b * cHeight, cWidth, cHeight);
      //}
      //}

    }
  }
  if (keyCode == 32) {
    pauseFn();
  }
}