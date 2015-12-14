function lines(radius,x, y,flag,circleHue) {
  this.x = x;
  this.y = y;
  this.radius = radius/10;
  this.flag = flag;
  this.circleHue = circleHue;
  //this.pgOne = pgOne;
  
  this.draw = function() {
    noFill();
    push();
    angleMode(DEGREES);
    rotate(radius/2);
    stroke(this.circleHue,100,100);
    for(var i=0;i<10;i++){
      rotate(5);
    line(x-radius*2, y-radius * 2, radius * 2, radius * 2);
    }
   pop();
  }
}