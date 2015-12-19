
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

