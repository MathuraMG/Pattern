//HOME PAGE FUNCTIONS 
/*
<!--<body>
  <div id="homePageBack">
    <button id="fractalBtn" class="selectBtn" onClick="javascript:changeSelectPattern('fractals')"><img class="imgFrBtn" src="assets/frBtn.png"></button>
    <button id="circlesBtn" class="selectBtn" onClick="javascript:changeSelectPattern('circles')"><img class="imgFrBtn" src="assets/crBtn.png"></button>
    <button id="brownianBtn" class="selectBtn" onClick="javascript:changeSelectPattern('lines')"><img class="imgFrBtn" src="assets/brBtn.png"></button>
  </div>--> 
  */

function drawHomePage() {

  var imgSize = windowHeight / 6;

  // var homePageText = createDiv('Pick your poison');
  // homePageText.style('color', 'white');
  // homePageText.style('text-align', 'center');
  // homePageText.style('position', 'absolute');
  // homePageText.style('width', '100%');
  // homePageText.style('top', '20%');
  // homePageText.style('font-family', 'Raleway');
  // homePageText.style('font-weight', '200');
  // homePageText.style('font-size', '72px');

  var homePageBack = createDiv('');
  homePageBack.position(0, 0);
  homePageBack.size(windowWidth, windowHeight);
  homePageBack.style('background-color', 'black', 'z-index', 5);
  homePageBack.id('homePageBack');
  
  

  var button1 = createButton('');
  button1.class('selectBtn');
  button1.mouseClicked(function() {
    changeSelectPattern('fractals');
  });
  button1.position(windowWidth / 2 - imgSize * 2.5, windowHeight / 2 - imgSize * 0.5);
  button1.style('background-color', 'transparent');
  button1.style('border', '0px');

  var button2 = createButton('');
  button2.class('selectBtn');
  button2.mouseClicked(function() {
    changeSelectPattern('circles');
  });
  button2.position(windowWidth / 2 - imgSize * 0.5, windowHeight / 2 - imgSize * 0.5);
  button2.style('background-color', 'transparent');
  button2.style('border', '0px');

  var button3 = createButton('');
  button3.class('selectBtn');
  button3.mouseClicked(function() {
    changeSelectPattern('lines');
  });
  button3.position(windowWidth / 2 + imgSize * 1.5, windowHeight / 2 - imgSize * 0.5);
  button3.style('background-color', 'transparent');
  button3.style('border', '0px');

  var image1 = createImg('assets/frBtn1.png');
  image1.class('imgFrBtn');
  image1.size(imgSize, imgSize);
  var image2 = createImg('assets/trBtn.png');
  image2.class('imgFrBtn');
  image2.size(imgSize, imgSize);
  var image3 = createImg('assets/brBtn1.png');
  image3.class('imgFrBtn');
  image3.size(imgSize, imgSize);
  
  var homePageText1 = createDiv('Fractals');
  homePageText1.style('color', 'white');
  homePageText1.style('text-align', 'center');
  homePageText1.position(windowWidth / 2 - imgSize * 2.5, windowHeight / 2 - imgSize);
  homePageText1.style('font-family', 'Raleway');
  homePageText1.style('font-weight', '200');
  homePageText1.style('font-size', '24px');
  
  var homePageText2 = createDiv('Pythogran');
  homePageText2.style('color', 'white');
  homePageText2.style('text-align', 'center');
  homePageText2.position(windowWidth / 2 - imgSize * 0.5, windowHeight / 2 - imgSize);
  homePageText2.style('font-family', 'Raleway');
  homePageText2.style('font-weight', '200');
  homePageText2.style('font-size', '24px');
  
  var homePageText3 = createDiv('Brownian');
  homePageText3.style('color', 'white');
  homePageText3.style('text-align', 'center');
  homePageText3.position(windowWidth / 2 + imgSize * 1.5, windowHeight / 2 - imgSize);
  homePageText3.style('font-family', 'Raleway');
  homePageText3.style('font-weight', '200');
  homePageText3.style('font-size', '24px');

  button1.child(image1);
  button1.parent(homePageBack);
  button2.child(image2);
  button2.parent(homePageBack);
  button3.child(image3);
  button3.parent(homePageBack);

  homePageText1.parent(homePageBack);
  homePageText2.parent(homePageBack);
  homePageText3.parent(homePageBack);
  
  var exampleLink = createA('assets/examples.jpg','Examples');
  exampleLink.style('z-index',5);
  exampleLink.size(10,10);
  exampleLink.style('font-family', 'Raleway');
  exampleLink.style('font-weight', '200');
  exampleLink.style('font-size', '18px');
  exampleLink.style('color', 'white');
  exampleLink.parent(homePageBack);

}



function setupFnButtons() {
  /*
  <button id="saveBtn" class="fnBtn" onClick="javascript:saveFn()"><img class="imgBtn" src="assets/saveBtn.png"></button>
    <button id="refreshBtn" class="fnBtn" onClick="javascript:refreshFn()"><img class="imgBtn" src="assets/refreshBtn.png"></button>
    <button id="pauseBtn" class="fnBtn" onClick="javascript:pauseFn()"><img id="pauseBtnImg" class="imgBtn" src="assets/pauseBtn.png"></button>
    */

  var button1 = createButton('');
  button1.class('fnBtn');
  button1.mouseClicked(saveFn);
  button1.style('background-color', 'transparent');
  button1.style('border', '0px');


  var button2 = createButton('');
  button2.class('fnBtn');
  button2.mouseClicked(refreshFn);
  button2.style('background-color', 'transparent');
  button2.style('border', '0px');

  var button3 = createButton('');
  button3.class('fnBtn');
  button3.mouseClicked(pauseFn);
  button3.style('background-color', 'transparent');
  button3.style('border', '0px');

  var button4 = createButton('');
  button4.class('fnBtn');
  button4.mouseClicked(goHomeFn);
  button4.style('background-color', 'transparent');
  button4.style('border', '0px');


  var image1 = createImg('assets/saveBtn1.png');
  image1.class('imgBtn');
  var image2 = createImg('assets/refreshBtn1.png');
  image2.class('imgBtn');
  var image3 = createImg('assets/pauseBtn1.png');
  image3.class('imgBtn');
  image3.id('pauseBtnImg');
  var image4 = createImg('assets/homeBtn1.png');
  image4.class('imgBtn');

  button1.child(image1);
  button2.child(image2);
  button3.child(image3);
  button4.child(image4);

  a = document.getElementsByClassName('fnBtn');
  var xPos = windowWidth * 0.8;
  //var yPos = windowHeight * 0.8;
  for (var i = 0; i < a.length; i++) {
    s = xPos + windowWidth * 0.05 * i;
    s = s + "px";
    a[i].style.position = "absolute";
    a[i].style.left = s;

    yPos = windowHeight * 0.85; //(3 * 0.11) + windowWidth * 0.01;
    yPos = yPos + "px";
    a[i].style.top = yPos;
  }
}

function selectButtonImg() {
  var xPos;
  var yPos;
  size = windowHeight * 0.07;
  a = document.getElementsByClassName('imgBtn');
  for (var i = 0; i < a.length; i++) {
    s = size;
    s = s + "px";
    a[i].style.width = s;
    a[i].style.height = s;
  }
  a = document.getElementsByClassName('imgFrBtn');
  for (var i = 0; i < a.length; i++) {
    s = size * 2;
    s = s + "px";
    a[i].style.width = s;
    a[i].style.height = s;
  }
  //position of the pattern selection buttons
  a = document.getElementsByClassName('selectBtn');
  for (var i = 0; i < a.length; i++) {
    s = size;
    s = s + "px";
    a[i].style.position = "absolute";
    a[i].style.left = s;

    h = windowHeight * 0.23 * i + size * 2;
    h = h + "px";
    a[i].style.top = h;
  }
}

function setupSliders() {
  var xPos = 20; //windowWidth * 0.01;
  var yPos1 = windowHeight - 70;
  var yPos2 = windowHeight - 40;
  xsplit = createSlider(1, 3, 1);
  xsplit.position(xPos, yPos1);
  ysplit = createSlider(1, 3, 1);
  ysplit.position(xPos, yPos2);
}

function setupColorPallete() {
  var size = windowHeight * 0.07;
  var xPos = windowWidth * 0.01;
  var yPos = windowHeight * 0.02;

  redBtn = createButton('  ');
  redBtn.mousePressed(colorChangeRed);
  redBtn.id('redBtn');
  redBtn.style("background-color", "#ff0000");
  redBtn.size(size, size);
  redBtn.position(xPos, yPos);

  blueBtn = createButton('  ');
  blueBtn.mousePressed(colorChangeBlue);
  blueBtn.id('blueBtn');
  blueBtn.style("background-color", "#0000ff");
  blueBtn.size(size, size);
  blueBtn.position(xPos + size * 1.2, yPos);

  greenBtn = createButton('  ');
  greenBtn.mousePressed(colorChangeGreen);
  greenBtn.id('greenBtn');
  greenBtn.style("background-color", "#00ff00");
  greenBtn.size(size, size);
  greenBtn.position(xPos + size * 2.4, yPos);
}



function setupP() {
  instDiv = createP(inst);
  instDiv.style('color', 'white'); //,'background-color','black');
  instDiv.position(canvasHeight - 24, 0);
  instDiv.id('instructions');
  instDiv.style('color', 'white');

  instDiv.style('position', 'absolute');


  instDiv.style('font-family', 'Raleway');
  instDiv.style('font-weight', '200');
  instDiv.style('font-size', '22px');
}

function textInstructions() {
  if (selectPattern == 'circles') {
    inst = ' Press space to pause the drawing and move your mouse about the canvas to change size and colour';
  } else if (selectPattern == 'fractals') {
    inst = ' Click on the canvas to get a fractal burst';
  } else if (selectPattern == 'lines') {
    inst = ' Click on the canvas to create a brownian motion. Press space to pause';
  } else {
    inst = ' Click on a pattern to start ';
  }
  a = document.getElementById('instructions');
  a.innerHTML = inst;

}

function initMusic() {
  for (var i = 0; i < totNotes; i++) {
    vol[i] = 0;
    notes[i].loop();
    notes[i].setVolume(0);
  }
}

function canvasGraphics() {
  canvasWidth = windowWidth; // * 0.78;
  canvasHeight = windowHeight; // * 0.83;

  fWidth = canvasWidth;
  fHeight = canvasHeight;
  canvArea = fWidth * fHeight * 0.5 / 100;

  var cvs = createCanvas(fWidth, fHeight);
  cvs.style('z-index', '-1');
  ctx = canvas.getContext('2d');
  imgData = ctx.getImageData(0, 0, fWidth, fHeight)
  pgTwo = createGraphics(fWidth, fHeight);
  //pgTwo.style('z-index', '-2');
  pgThree = createGraphics(fWidth, fHeight);
  // pgThree.style('z-index', '-2');
}

function drawPalette(centerX, centerY) {
  push();
  //print('drawing palette');
  //background(0);

  angleMode(DEGREES);
  colorMode(HSB);
  translate(centerX, centerY);
  strokeWeight(1);
  for (var i = 0; i < 360; i++) {
    rotate(1);
    stroke(i, 70, 70);
    line(0, 0, 0, -50);
  }
  pop();
  fill(0);
  ellipse(centerX, centerY, 40, 40);
}

function drawPaletteMarker(centerX, centerY, hueStart) {
  push();
  angleMode(DEGREES);
  colorMode(RGB);
  translate(centerX, centerY);
  rotate(hueStart+180);
  noStroke();
  fill(255);
  ellipse(0, 35, 10, 10);
  pop();

}