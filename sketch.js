const type = 0; // 0: rectangles, 1: ellipses, 2: triangles

// the frame rate
const fps = 60;

// the number of images to record
const n_images = 5000;

// the canvas capturer instance
let capturer = new CCapture({ format: 'png', framerate: fps });

// setup the drawing
function setup() {
  createCanvas(28, 28);

  // this is optional, but lets us see how the animation will look in browser.
  frameRate(fps);
}

function draw() {

  // start the recording on the first frame
  // this avoids the code freeze which occurs if capturer.start is called
  // in the setup, since v0.9 of p5.js
  if (frameCount === 1) {
    capturer.start();
  }

  // the drawing: twenty rectangles with random colours
  background(255);
  fill(Math.random() * 255, Math.random() * 255, Math.random() * 255);

  switch (type) {
    case 0: // rectangles
      rectMode(CENTER);
      rect(random(20, width), random(20, height) , random(20, width/2), random(20, height/2));
      break;
    case 1: // ellipses
      ellipse(random(20, width), random(20, height) , random(20, width/2), random(20, height/2));
      break;
    case 2: // triangles
      const centre = createVector(random(20, width), random(20, height))
      const size = random(10, width/2);
      const rotation = random(0, 2 * PI);
      drawEquilateralTriangle(centre, size, rotation);
      break;
  }

  // here I use frameCount to record 100 images
  if (frameCount > n_images) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  }

  // saving the frame
  // console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));
}

// ChatGPT 4o
function drawEquilateralTriangle(centre, size, rotation) {
  beginShape();
  for (let i = 0; i < 3; i++) {
    let angle = rotation + TWO_PI / 3 * i;
    let x = centre.x + size / 2 * cos(angle);
    let y = centre.y + size / 2 * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}
