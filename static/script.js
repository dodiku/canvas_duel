/*
the implementation was inspired by the wonderful drawing example on the p5.js website -
http://p5js.org/examples/hello-p5-drawing.html
*/


var drawing = [];
var saveSeconds;

function setup() {
  var myCanvas = createCanvas(720, 400);
  myCanvas.parent('canvas_container');
  smooth();
}

function draw() {
  background('#ffffff');

  // adding drawing dots to the drawing array
  if (mouseIsPressed) {
    drawing.push(new FadingDot(mouseX,mouseY));
  }

  // drwaing dots from the array
  drawing.updateOrRemove();
  drawing.draw();

  // removing 'saved' indication, if such exists
  if ((second() - saveSeconds) > 2) {
    $('#saved').text('');
  }
}

// for debug purposes:
// function mouseReleased() {
//   console.log(drawing);
//   console.log(frameRate());
// }

function keyPressed() {
  if (keyCode === 32) {
    console.log('checking if saving is needed...');
    drawing.save();
  }
}

function FadingDot(x, y) {
  this.x = x;
  this.y = y;
  this.fill = 200;
  this.lifespan = 500;
  this.saved = 'false';
}

drawing.draw = function() {
  for (var i = 0; i < this.length; i++) {
    stroke(this[i].fill, this[i].lifespan/4);
    fill(this[i].fill, this[i].lifespan/4);
    ellipse(this[i].x,this[i].y, 6, 6);
  }
};


drawing.updateOrRemove = function() {
    for (var i = 0; i < this.length; i++) {
      if (this[i].saved == 'true'){
        continue;
      }
      if (this[i].lifespan <= 0) {
        this.splice(i, 1);
      } else {
        this[i].lifespan = this[i].lifespan-1;
      }
    }
};

drawing.save = function() {
  var isSaved = 'false';
  for (var i = 0; i < this.length; i++) {
    if (this[i].saved == 'false') {
      this[i].saved = 'true';
      this[i].lifespan = 1000;
      this[i].fill = 0;
      isSaved = 'true';
    }
  }
  if (isSaved == 'true') {
    console.log('saved');
    $('#saved').text('applied changes');
    saveSeconds = second();
  }
  else {
    console.log('nothing to save');
  }
};
