function circleArt(selectX, selectY) {
  if (pause == false) {
    linePosX++;
    f = new circleArtPiece((linePosX) % (width + 100), selectY, (mouseY - height / 2) / (2 * 1), (mouseY - height / 2) / 2 * (1), hueStart + map(mouseX, 0, width, 0, 50), pgTwo);
    f.drawFractal();
  }
  push();
  colorMode(RGB);
  //background(overallBG);
  pop();
  //for (var a = 0; a < xsplit.value(); a++) {
  //for (var b = 0; b < ysplit.value(); b++) {
  image(pgTwo, 0, 0, fWidth, fHeight);
  //}
  //}
}

function lineArt(selectX, selectY, hs) {
  //blendMode(LIGHTEST);
  if (pause == false) {
    brCount++;
    if ((brCount - 1) % numLines == 0) {
      l = new elt();
      l.init(selectX, selectY, pgThree);
      strokeWeight(0);
      l.drawLine();
      linesBr[((brCount - 1) / numLines) + 1] = l;
    } else {
      a = floor(((brCount - 1) / numLines));
      curvesBW(linesBr[a], linesBr[a + 1], (brCount - 1) % numLines, hs, pgThree);
    }
  }
  //for (var a = 0; a < xsplit.value(); a++) {
  //for (var b = 0; b < ysplit.value(); b++) {
  image(pgThree, 0, 0, fWidth, fHeight);
  //}
  //}
  drawPalette(paletteX, paletteY);
}

function fractalArtOld() {
  var xPoint, yPoint;
  if (touchIsDown) {
    xPoint = touchX;
    yPoint = touchY;
  } else {
    xPoint = mouseX;
    yPoint = mouseY;
  }
  if (xPoint < cWidth && yPoint < cHeight && xPoint > 0 && yPoint > 0) {
    if (selectPattern == 'fractals') {
      background(overallBG);
      cWidth = fWidth / 1; // xsplit.value();
      cHeight = fHeight / 1; // ysplit.value();
      push();
      colorMode(HSB);
      var distFromCenter = dist(xPoint, yPoint, canvasWidth / 2, canvasHeight / 2);
      var circleSize = (canvasWidth / 20 - distFromCenter / 10) / 3;
      circleHue = map(distFromCenter, 0, sqrt((canvasWidth * canvasWidth + canvasHeight * canvasHeight) / 4), hueStart, hueStart + 50);
      pgOne = createGraphics(cWidth, cHeight);
      cS = map(distFromCenter, 0, 350, 10, 70);
      f = new fractalCircle(xPoint, yPoint, circleSize, circleHue, pgOne);
      //print(xPoint+','+yPoint);
      f.drawFractal();
      pg.push(pgOne);
      fractals.push(f);
      pop();
      for (var i = 0; i < pg.length; i++) {
        //for (var a = 0; a < xsplit.value(); a++) {
        //for (var b = 0; b < ysplit.value(); b++) {
        image(pg[i], 0, 0, cWidth, cHeight);
        //}
        //}
      }
    }
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  }
}

function fractalArt(xPoint, yPoint) {
  background(overallBG);
  cWidth = fWidth / 1; //xsplit.value();
  cHeight = fHeight / 1; //ysplit.value();
  push();
  colorMode(HSB);
  var distFromCenter = dist(xPoint, yPoint, canvasWidth / 2, canvasHeight / 2);
  var circleSize = (canvasWidth / 17 - distFromCenter / 6) / 3;
  circleHue = hueStart; //map(distFromCenter, 0, sqrt((canvasWidth * canvasWidth + canvasHeight * canvasHeight) / 4), hueStart, hueStart + 50);
  pgOne = createGraphics(cWidth, cHeight);
  cS = map(distFromCenter, 0, 350, 10, 70);
  var rand = random(3, 5);
  for (var i = 0; i < rand; i++) {
    f = new fractalCircle(xPoint + i * random(-20, 20), yPoint + i * random(-20, 20), circleSize * (rand - i) * random(-0.7, -0.2), circleHue + random(0, 30), pgOne);
    f.drawFractal();
    fractals.push(f);
  }
  //print(xPoint+','+yPoint);
  pg.push(pgOne);
  pop();
  for (var i = 0; i < pg.length; i++) {
    //for (var a = 0; a < xsplit.value(); a++) {
    //for (var b = 0; b < ysplit.value(); b++) {
    image(pg[i], 0, 0, cWidth, cHeight);
    //}
    //}
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  }
}


function curvesBW(lines1, lines2, i, hs, pgThree) {
  //for (var i = 0; i < 50; i++) {
  l = new elt();
  l.init(mouseX, mouseY, pgThree);
  colorMode(HSB);
  pgThree.stroke(hs + abs((frameCount % 100) - 50), 100, 100, 50);
  for (var a = 1; a < lines2.ax.length; a++) {
    l.ax[a] = lines1.ax[a] + ((lines2.ax[a] - lines1.ax[a]) / numLines) * i;
    l.ay[a] = lines1.ay[a] + ((lines2.ay[a] - lines1.ay[a]) / numLines) * i;
    l.lax[a] = lines1.lax[a] + ((lines2.lax[a] - lines1.lax[a]) / numLines) * i;
    l.lay[a] = lines1.lay[a] + ((lines2.lay[a] - lines1.lay[a]) / numLines) * i;
    pgThree.strokeWeight(0.5);
    //noFill();
    pgThree.line(l.ax[a], l.ay[a], l.ax[a - 1], l.ay[a - 1]);
    pgThree.line(l.lax[a], l.lay[a], l.lax[a - 1], l.lay[a - 1]);
    //arc(l.ax[a], l.ay[a], dist(l.ax[a - 1], l.ay[a - 1],l.ax[a], l.ay[a]), random(5,10),random(0,0.5), random(0.5,1));
    //}
    //lines = l;
  }
}

function fractalCircle(x, y, size, circleHue, pgOne) {
  this.x = x;
  this.y = y;
  this.circleHue = circleHue;
  this.size = size;
  this.drawFractal = function() {
    angleMode(DEGREES);
    //translate(this.x, this.y);
    for (var k = 0; k < 4; k++) {
      circles = [];
      angle = 45 * k;
      angleMode(DEGREES);
      //rotate(45);
      a = new circle(this.size, this.x, this.y, 0, this.circleHue, pgOne);
      circles.push(a);
      for (var i = 0; i < totIt; i++) {
        for (var j = 0; j < circles.length; j++) {
          if (circles[j].flag == i) {
            val = circles[j].draw();
            r = circles[j].radius;
            var newx2, newy;
            if (k > 0) {
              newx2 = val.x2 - r + r * cos(angle);
              newx1 = val.x1 + r - r * cos(angle);
              newy2 = val.y - r * sin(angle);
              newy1 = val.y + r * sin(angle);
            } else {
              newx2 = val.x2;
              newx1 = val.x1
              newy2 = val.y;
              newy1 = val.y;
            }
            b1 = new circle(val.radius, newx1, newy1, i + 1, this.circleHue, pgOne);
            circles.push(b1);
            b2 = new circle(val.radius, newx2, newy2, i + 1, this.circleHue, pgOne);
            circles.push(b2);
          }
        }
      }
    }
  }
}

function circleArtPiece(x, y, sizeX, sizeY, lineHue, pgOne) {
  this.x = x;
  this.y = y;
  this.lineHue = lineHue;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.drawFractal = function() {
    colorMode(HSB);
    strokeWeight(0.5);
    pgOne.stroke(lineHue, 100, 100);
    noFill();
    pgOne.ellipse(x, y, sizeX, sizeY);
  }
}

function lineArtPiece(x, y, sizeX, sizeY, lineHue, pgOne) {
  this.x = x;
  this.y = y;
  this.lineHue = lineHue;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.drawFractal = function() {
    colorMode(HSB);
    strokeWeight(0.5);
    pgOne.stroke(lineHue, 100, 100);
    noFill();
    pgOne.line(x, y, sizeX, sizeY);
  }
}





/****************************************

        SIZE B            SIZE C
        \    /             \  /
          \/                \/
          -------------------
          |                 |
          |                 |
          |                 |
          |     SIZE A      |
          |                 |
          |                 |
          |                 |
          -------------------
          
          A^2 = B^2 + C^2
          and 
          B > C 

****************************************/

function treeFr(x, y, side, ratio, angle, type, flag, direction) {

  angleMode(DEGREES);
  this.side = side;
  this.size = size;
  this.processed = 0;
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.type = type;
  this.flag = flag;
  this.ratio = ratio;
  this.direction = direction;

  this.display = function() {

    push();

    if (this.type == 1) {
      this.angle = angle - this.direction;
      this.ratio = cos(this.direction) * ratio;
      translate(this.x, this.y);
      rotate(this.angle);
      scale(this.ratio);
      rect(0, -this.side, this.side, this.side);
    } else if (this.type == 2) {
      this.angle = angle + (90 - this.direction);
      this.ratio = cos(90 - this.direction) * ratio;
      translate(this.x, this.y);
      rotate(this.angle - 90);
      scale(this.ratio);
      rect(0, -this.side, this.side, this.side);
    }

    pop();

    if (type == 1) {
      return ({
        ratio: this.ratio,
        angle: this.angle,
        x1: this.x - this.side * this.ratio * cos(90 + this.angle),
        y1: this.y - this.side * this.ratio * sin(90 + this.angle),
        x2: this.x + this.side * this.ratio * (-cos(90 + this.angle) + sin(90 + this.angle)),
        y2: this.y - this.side * this.ratio * (cos(90 + this.angle) + sin(90 + this.angle)),
      });
    } else if (type == 2) {
      return ({
        ratio: this.ratio,
        angle: this.angle,
        x1: this.x + this.side * this.ratio * (-cos(this.angle) + sin(this.angle)),
        y1: this.y - this.side * this.ratio * (cos(this.angle) + sin(this.angle)),
        x2: this.x + this.side * this.ratio * sin(this.angle),
        y2: this.y - this.side * this.ratio * cos(this.angle)
      });
    } else if (type == 0) {
      return ({
        ratio: this.ratio,
        angle: this.angle,
        x1: this.x - this.side * this.ratio * cos(this.angle + 90),
        y1: this.y - this.side * this.ratio * sin(this.angle + 90),
        x2: this.x + this.side * this.ratio * cos(this.angle),
        y2: this.y - this.side * this.ratio * sin(this.angle) - this.side * this.ratio * cos(this.angle)
      });
    }
  }
}


function drawSq(startX, startY, sideVal, hueColour) {


  angleMode(DEGREES);
  //function treeFr(x, y, ratio, angle,type,flag)
  fill(hueColour,100,100);
  noStroke();
  particle[0] = new treeFr(startX, startY, sideVal, 1, 0, 0, 0, direction);
  a = particle[0].display();
  push();



  translate(startX, startY);
  //rotate(totAngle);


  rect(0, -sideVal, sideVal, sideVal);
  pop();

  //for (var j = 1; j < 5; j++) {
  //var j = frameCount - frame;
  if (frameCount % 1 == 0) {
    j_count++;
    var j = j_count;
    //print(frame + ',' + frameCount);
    l = particle.length;
    count = 0;

    fill(hueColour - 5 * j, 100,100);
    noStroke();

    for (var i = 0; i < l; i++) {
      if (particle[i].flag == (j - 1)) {
        a = particle[i].display();
        particlenew[count++] = new treeFr(a.x2, a.y2, sideVal, a.ratio, a.angle, 2, j, direction);
        particlenew[count++] = new treeFr(a.x1, a.y1, sideVal, a.ratio, a.angle, 1, j, direction);

      }
    }
    particle = particle.concat(particlenew);
  }

}