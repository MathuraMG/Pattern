function circle(radius, x, y,flag,circleHue,pgOne, angle) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.flag = flag;
  this.circleHue = circleHue;
  this.pgOne = pgOne;
  this.angle = angle;
  
  
  this.draw = function() {
    colorMode(HSB);
    //pgOne.
    noFill();
    
    //pgOne.
    stroke(this.circleHue,overAllSat,overAllBr);
    //pgOne.
    ellipse(x, y, radius * 2, radius * 2);
    return ({
      x1: this.x - this.radius,
      x2: this.x + this.radius,
      y: this.y,
      radius: this.radius / 2,
      angle: this.angle
    });
  }
}