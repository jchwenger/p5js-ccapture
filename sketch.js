// the frame rate
const fps = 60;

// the number of images to record
const nImages = 5000;

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
  for (let i = 0; i < 20; i++) {
    fill(random(0, 255));
    rect(random(0, width), random(0, height), random(1, width), random(0, height));
  }

  // here I use frameCount to record images
  if (frameCount > nImages) {
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
