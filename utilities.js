function saveFn() {
  saveCanvas('pattern', 'png');
}

function gridFn() {
  push();
  colorMode(RGB);
  gridGraph = createGraphics(cWidth, cHeight);
  if (flag == 0) {
    gridGraph.stroke(0);
    flag = 1;
  } else {
    gridGraph.stroke(255);
    flag = 0;
  }
  for (var j = 0; j < 5; j++) {

    gridGraph.line(0, j * cHeight / 5, cWidth, j * cHeight / 5);
    gridGraph.line(j * cWidth / 5, 0, j * cWidth / 5, cHeight);
  }
  pop();
  //image(gridGraph, 0, 0, cWidth, cHeight);

}

function refreshFn() {
  //blendMode(BLEND );


  fractals = [];
  linePosX = 0;
  brCount = 0;
  background(overallBG);

}

function colorChangeRed() {
  hueStart = 0;
}

function colorChangeGreen() {
  hueStart = 100;
}

function colorChangeBlue() {
  hueStart = 200;
}

function setSelect() {
  if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight) {
    selectX = mouseX ;/// xsplit.value();
    linePosX = mouseX ;/// xsplit.value();
    selectY = mouseY ;/// ysplit.value();
  }
}

function setTouchSelect() {
  if (touchX > 0 && touchX < canvasWidth && touchY > 0 && touchY < canvasHeight) {
    selectX = touchX ;/// xsplit.value();
    linePosX = touchX ;/// xsplit.value();
    selectY = touchY ;/// ysplit.value();
  }
}

function changeSelectPattern(a) {
  selectPattern = a;
  var homePageDiv = document.getElementById('homePageBack');
  homePageDiv.style.display = 'none';
}

function pauseFn() {
  pause = !pause;
  if (pause == true) {
    var pauseBtn = document.getElementById('pauseBtnImg');
    pauseBtn.src = "assets/playBtn42.png";
  } else if (pause == false) {
    var pauseBtn = document.getElementById('pauseBtnImg');
    pauseBtn.src = "assets/pauseBtn42.png";
  }
}

function goHomeFn() {
  selectPattern = "";
  var homePageDiv = document.getElementById('homePageBack');
  homePageDiv.style.display = 'block';
  refreshFn();
}

function selectHueColor(paletteX, paletteY, hs) {
  colorMode(HSB);
  var r = dist(mouseX, mouseY, paletteX, paletteY);
  var hue = hs;
  if (r > 30 && r < 75) {
    var angle = atan((mouseY - paletteY) / (mouseX - paletteX));
    //angle = map(angle,-3.1428,3.1428,0,180);
    if (mouseX < paletteX) {
      hue = angle + 90 + 180;

    } else {
      hue = angle + 90;
    }
    

    //print(floor(hue));
  }
  return (hue);
}