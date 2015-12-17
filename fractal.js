function circleArt(selectX, selectY) {
  if (pause == false) {
    linePosX++;
    f = new circleArtPiece((linePosX) % (width + 100), selectY, (mouseY - height / 2) / (2 * 1), (mouseY - height / 2) / 2 * (1), hueStart + map(mouseX, 0, width, 0, 50), pgTwo);
    f.drawFractal();
  }
  push();
  colorMode(RGB);
  pop();
  image(pgTwo, 0, 0, fWidth, fHeight);
}

function lineArt(selectX, selectY, hs) {
  
    brCount++;
    if ((brCount - 1) % numLines == 0) {
      l = new elt();
      l.init(selectX, selectY);
      strokeWeight(0);
      l.drawLine();
      linesBr[((brCount - 1) / numLines) + 1] = l;
    } else {
      a = floor(((brCount - 1) / numLines));
      curvesBW(linesBr[a], linesBr[a + 1], (brCount - 1) % numLines, hs, pgThree);
    }
  
  //image(pgThree, 0, 0, fWidth, fHeight);
 // drawPalette(paletteX, paletteY);
}


function curvesBW(lines1, lines2, i, hs, pgThree) {

  l = new elt();
  l.init(mouseX, mouseY, pgThree);
  colorMode(HSB);
  stroke(hs + abs((frameCount % 50) - 25), 100, 100, 50);
  for (var a = 1; a < lines2.ax.length; a++) {
    l.ax[a] = lines1.ax[a] + ((lines2.ax[a] - lines1.ax[a]) / numLines) * i;
    l.ay[a] = lines1.ay[a] + ((lines2.ay[a] - lines1.ay[a]) / numLines) * i;
    l.lax[a] = lines1.lax[a] + ((lines2.lax[a] - lines1.lax[a]) / numLines) * i;
    l.lay[a] = lines1.lay[a] + ((lines2.lay[a] - lines1.lay[a]) / numLines) * i;
    strokeWeight(0.5);
    line(l.ax[a], l.ay[a], l.ax[a - 1], l.ay[a - 1]);
    line(l.lax[a], l.lay[a], l.lax[a - 1], l.lay[a - 1]);

  }
}


function fractalArt(xPoint, yPoint) {
  //background(overallBG);
  cWidth = fWidth / 1; //xsplit.value();
  cHeight = fHeight / 1; //ysplit.value();
  push();
  colorMode(HSB);
  var distFromCenter = dist(xPoint, yPoint, canvasWidth / 2, canvasHeight / 2);
  var circleSize = (canvasWidth / 17 - distFromCenter / 6);
  circleHue = map(distFromCenter, 0, sqrt((canvasWidth * canvasWidth + canvasHeight * canvasHeight) / 4), hueStart, hueStart + 50);

  cS = map(distFromCenter, 0, 350, 10, 70);
  f = new fractalCircle(xPoint, yPoint, circleSize, circleHue, pgOne);
  f.create();
  fractals.push(f);

  pop();

}

function fractalCircle(x, y, size, circleHue, pgOne) {
  this.x = x;
  this.y = y;
  this.circleHue = circleHue;
  this.size = size;
  this.count = 0;
  this.circles = [];
  this.create = function() {
    a = new circle(this.size, this.x, this.y, 0, this.circleHue, pgOne, 0);
    this.circles.push(a);
    a.draw();
  }
  this.drawFractal = function() {
    //print(x+','+y+','+this.size);
    fill(255, 255, 255);
    //ellipse(x,y,this.size,this.size);

    if (this.count < 7) {

      var i = this.count;
      if (frameCount % 5 == 0) {
        this.count = this.count + 1;

        for (var j = 0; j < this.circles.length; j++) {

          if (this.circles[j].flag == i) {
            for (var k = 1; k < 5; k++) {
              if (this.circles[j].angle == 0) {
                var angle = k * 45;
                val = this.circles[j].draw();
                r = this.circles[j].radius;
                var newx2, newy;

                newx2 = val.x2 - r + r * cos(angle);
                newx1 = val.x1 + r - r * cos(angle);
                newy2 = val.y - r * sin(angle);
                newy1 = val.y + r * sin(angle);

                b1 = new circle(val.radius, newx1, newy1, i + 1, this.circleHue+i*10, pgOne, k);
                this.circles.push(b1);
                b2 = new circle(val.radius, newx2, newy2, i + 1, this.circleHue+i*10, pgOne, k);
                this.circles.push(b2);
              } else {
                if (this.circles[j].angle == k) {
                  var angle = k * 45;
                  val = this.circles[j].draw();
                  r = this.circles[j].radius;
                  var newx2, newy;

                  newx2 = val.x2 - r + r * cos(angle);
                  newx1 = val.x1 + r - r * cos(angle);
                  newy2 = val.y - r * sin(angle);
                  newy1 = val.y + r * sin(angle);

                  b1 = new circle(val.radius, newx1, newy1, i + 1, this.circleHue, pgOne, val.angle);
                  this.circles.push(b1);
                  b2 = new circle(val.radius, newx2, newy2, i + 1, this.circleHue, pgOne, val.angle);
                  this.circles.push(b2);
                }
              }
            }
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

function drawSq(startX, startY, sideVal, hueColour) {

  angleMode(DEGREES);
  //function treeFr(x, y, ratio, angle,type,flag)
  fill(hueColour, 100, 100);
  noStroke();
  particle[0] = new treeFr(startX, startY, sideVal, 1, 0, 0, 0, direction);
  a = particle[0].display();
  push();

  translate(startX, startY);
  if (j_count == 0) {
    rect(0, -sideVal, sideVal, sideVal);
  }
  pop();

  if (frameCount % 3 == 0 && j_count < 12) {
    j_count++;
    var j = j_count;
    l = particle.length;
    count = 0;
    fill(hueColour - 5 * j, 100, 100);
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