function circle(radius, x, y,flag,circleHue,pgOne) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.flag = flag;
  this.circleHue = circleHue;
  this.pgOne = pgOne;
  
  this.draw = function() {
    push();
    colorMode(RGB);
    pgOne.fill(overallBG,overallBG,overallBG,1);
    pop();
    pgOne.stroke(this.circleHue,100,100);
    pgOne.ellipse(x, y, radius * 2, radius * 2);
    return ({
      x1: this.x - this.radius,
      x2: this.x + this.radius,
      y: this.y,
      radius: this.radius / 2
    });
  }
}