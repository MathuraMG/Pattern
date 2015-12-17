//CANVAS VARIABLES
var cWidth = 200;
var cHeight = 200;
var totIt = 5;
var fWidth = 800;
var fHeight = 800;
var flag = 0;
var inst = 'potato';
var instDiv;
var overallBG = 255;
var palletteImage;
var pMarkerImg;
var overAllSat = 30;
var overAllBr = 92;
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
  overallBG = color("#f8f8dc");
  background(overallBG);
  setupFnButtons();
  //setupSliders();
  //setupColorPallete();

  setupP();
  initMusic();
  canvasGraphics();
  selectButtonImg();
  drawHomePage();
  paletteX = 125;
  paletteY = windowHeight - 125;
  drawPalette(paletteX, paletteY);
  pMarkerImg = createImg('assets/pMarker.png');
}

function draw() {

  if (selectPattern == 'circles' && pause == false) {

    drawSq(startX, startY, sideVal, hueStart);

  } else if (selectPattern == 'lines' && pause == false && brTrue == true) {
    //background(overallBG);
    //blendMode(LIGHTEST);
    lineArt(selectX, selectY, hueStart);

  } else if (selectPattern == 'fractals') {
    //print(fractals.length);
    for (var i = 0; i < fractals.length; i++) {
      fractals[i].drawFractal();
    }
  }
  //blendMode(BLEND );

  drawPaletteMarker(paletteX, paletteY, hueStart);
  //textInstructions();


}

function mouseDragged() {
   hueStart = selectHueColor(paletteX, paletteY, hueStart);
  if (selectPattern == 'fractals') {
    //if (frameCount % 2 == 0) {
      if ((mouseX < paletteX + 50 && mouseY > paletteY - 50) || (mouseY > 0.8 * windowHeight && mouseX > windowWidth * 0.8)) {} else {
        if(dist(mouseX,mouseY,selectX,selectY) >60)
        {
          setSelect();
          fractalArt(selectX, selectY);
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
        var b = map(a, 0, 90, 3, 5);
        sideVal = dist(beginX, beginY, endX, endY) / b;
        //print(dir1 + ',' + direction);
        startX = beginX;
        startY = beginY;
        setSelect();

        particle = [];
        particlenew = [];
        j_count = 0;
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