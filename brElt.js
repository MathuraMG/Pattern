function elt(x, y) {
  this.ax = [];
  this.ay = [];
  this.lax = [];
  this.lay = [];
  this.init = function() {
    this.ax[0] = selectX; ///2;
    this.ay[0] = selectY; //height / 2+ random(-range/1.2, range/1.2);
    this.lax[0] = this.ax[0];
    this.lay[0] = this.ay[0];
  }
  this.drawLine = function() {
    num = this.ax.length;
    //print('hello' + ax[num-1] + ' ' + ax.length);
    while (this.ax[num - 1] < width && this.lax[num - 1] > 0) {
      //print('hello');
      lastXVal = this.ax[(num) - 1];
      lastYVal = this.ay[(num) - 1];
      lastlXVal = this.lax[(num) - 1];
      lastlYVal = this.lay[(num) - 1];
      // Put a new value at the end of the array
      this.ax.push(lastXVal + random(0, range * 1.2));
      this.ay.push(lastYVal + random(-range / 1.2, range / 1.2));
      this.lax.push(lastlXVal + random(-range * 1.2, 0));
      this.lay.push(lastlYVal + random(-range / 1.2, range / 1.2));
      num = this.ax.length;
      // Constrain all points to the screen
      this.ax[num - 1] = constrain(this.ax[num - 1], 0, width);
      this.ay[num - 1] = constrain(this.ay[num - 1], 0, height);
      // Draw a line connecting the points

      num = this.ax.length;
      line(this.ax[num - 1], this.ay[num - 1], this.ax[num - 2], this.ay[num - 2]);
      line(this.lax[num - 1], this.lay[num - 1], this.lax[num - 2], this.lay[num - 2]);
    }
  }
}