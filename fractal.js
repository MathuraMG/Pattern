function circleArt(selectX, selectY) {
  if (pause == false) {
    linePosX++;
    f = new circleArtPiece((linePosX) % (width + 100), selectY, (mouseY - height / 2) / (2 * 1), (mouseY - height / 2) / 2 * (1), hueStart + map(mouseX, 0, width, 0, 50));
    f.drawFractal();
  }
  push();
  colorMode(RGB);
  pop();
  
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
      curvesBW(linesBr[a], linesBr[a + 1], (brCount - 1) % numLines, hs);
    }

}


function curvesBW(lines1, lines2, i, hs) {

  l = new elt();
  l.init(mouseX, mouseY);
  colorMode(HSB);
  stroke(hs + abs((frameCount % 50) - 25), overAllSat,overAllBr, 50);
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
  circleSize = (canvasWidth / 20 - distFromCenter / 12)/2;
  circleHue = map(distFromCenter, 0, sqrt((canvasWidth * canvasWidth + canvasHeight * canvasHeight) / 4), hueStart, hueStart + 50);

  cS = map(distFromCenter, 0, 350, 10, 70);
  f = new fractalCircle(xPoint, yPoint, circleSize, circleHue);
  f.create();
  fractals.push(f);

  pop();

}

function fractalCircle(x, y, size, circleHue) {
  this.x = x;
  this.y = y;
  this.circleHue = circleHue;
  this.size = size;
  this.count = 0;
  this.circles = [];
  this.create = function() {
    a = new circle(this.size, this.x, this.y, 0, this.circleHue, 0);
    this.circles.push(a);
    a.draw();
  }
  this.drawFractal = function() {
    //print(x+','+y+','+this.size);
    fill(255, 255, 255);
    //ellipse(x,y,this.size,this.size);

    if (this.count < 5) {

      var i = this.count;
      if (frameCount % 2 == 0) {
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

                b1 = new circle(val.radius, newx1, newy1, i + 1, this.circleHue+i*10, k);
                this.circles.push(b1);
                b2 = new circle(val.radius, newx2, newy2, i + 1, this.circleHue+i*10, k);
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

                  b1 = new circle(val.radius, newx1, newy1, i + 1, this.circleHue, val.angle);
                  this.circles.push(b1);
                  b2 = new circle(val.radius, newx2, newy2, i + 1, this.circleHue, val.angle);
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


function circleArtPiece(x, y, sizeX, sizeY, lineHue) {
  this.x = x;
  this.y = y;
  this.lineHue = lineHue;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.drawFractal = function() {
    colorMode(HSB);
    strokeWeight(0.5);
    stroke(lineHue, overAllSat,overAllBr);
    noFill();
    ellipse(x, y, sizeX, sizeY);
  }
}

function lineArtPiece(x, y, sizeX, sizeY, lineHue) {
  this.x = x;
  this.y = y;
  this.lineHue = lineHue;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.drawFractal = function() {
    colorMode(HSB);
    strokeWeight(0.5);
    stroke(lineHue, overAllSat,overAllBr);
    noFill();
    line(x, y, sizeX, sizeY);
  }
}

function sqFractal(startX, startY, sideVal, hueColour,direction){
  this.startX = startX;
  this.startY = startY;
  this.sideVal = sideVal;
  this.hueColour = hueColour;
  this.direction = direction;
  this.j_count = 0;
  this.particle = [];
  this.particlenew = [];
  this.init = function(){
    this.j_count = 0;
    this.particle = [];
  }
  this.drawSqFractal = function() {
    angleMode(DEGREES);
  //function treeFr(x, y, ratio, angle,type,flag)
  fill(hueColour, overAllSat,overAllBr);
  noStroke();
  this.particle[0] = new treeFr(this.startX, this.startY, this.sideVal, 1, 0, 0, 0, this.direction);
  a = this.particle[0].display();
  push();

  translate(this.startX, this.startY);
  if (this.j_count == 0) {
    rect(0, -this.sideVal, this.sideVal, this.sideVal);
  }
  pop();

  if (frameCount % 2 == 0 && this.j_count < 11) {
    this.j_count++;
    var j = this.j_count;
    l = this.particle.length;
    count = 0;
    fill(this.hueColour - 5 * j, overAllSat,overAllBr);
    noStroke();

    for (var i = 0; i < l; i++) {
      if (this.particle[i].flag == (j - 1)) {
        a = this.particle[i].display();
        this.particlenew[count++] = new treeFr(a.x2, a.y2, this.sideVal, a.ratio, a.angle, 2, j, this.direction);
        this.particlenew[count++] = new treeFr(a.x1, a.y1, this.sideVal, a.ratio, a.angle, 1, j, this.direction);

      }
    }
    this.particle = this.particle.concat(this.particlenew);
  }
  }
}

function drawSq(startX, startY, sideVal, hueColour) {

  

}