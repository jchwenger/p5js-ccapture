// the frame rate
let fps = 60;

// the canvas capturer instance
let capturer = new CCapture({ format: 'png', framerate: fps });

// setup the drawing
function setup() {
  createCanvas(540, 540);

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

  // the drawing
  background(255);
  fill(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  rect(Math.random() * width, Math.random() * height, 20, 20);

  // here I use frameCount to record 100 images
  if (frameCount > 100) {
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
