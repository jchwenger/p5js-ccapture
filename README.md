# p5.js recording with CCapture.js example

A demonstration of how to record a [p5.js](https://p5js.org/) animation using [CCapture.js](https://github.com/spite/ccapture.js).

If you only need the first 15 frames, you can use p5.js' [saveFrames()](https://p5js.org/reference/#/p5/saveFrames) function, but for more than that they recommend using a different library such as CCapture.js.

Read [the blog post](https://peterbeshai.com/p5js-ccapture.html) for more details (the code is available in `sketch.2.js`, and in order to use it, change the reference to it in `index.html`.

### Output of the sketch

A `.tar` archive containing `.png` images.

To unzip them into a directory called `images`:

```bash
mkdir images
tar \
    -xvf [thefile].tar \
    -C images
```

### Create video from ffmpeg

- **Frame rate**: 30 (see `fps` in the code)
- **Dimensions**: 540x540 (should match `createCanvas()` in the code)
- **Frame filenames**: `"%07d.png"` (incrementing numbers, 7 numbers long)
- **Quality (CRF)**: 17 (see [ffmpeg docs](https://trac.ffmpeg.org/wiki/Encode/H.264), but 17–28 is reasonable, 0 is lossless)

In the terminal: `./makevideo.sh`
```bash
ffmpeg \
    -r 30 \
    -f image2 \
    -s 540x540 \
    -i images/"%07d.png" \
    -vcodec libx264 \
    -crf 17 \
    -pix_fmt yuv420p output.mp4
```


### Create a GIF from ImageMagick's convert

|             |                              |
| ----        | -----                        |
| frame delay | = 100 &times; 1 / frame rate |
|             | = 100 / 30                   |
|             | = 3.33                       |

In the terminal: `./makegif.sh`
```bash
convert \
    -delay 3.33 \
    -loop 0 \
    images/*.png output.gif
```
