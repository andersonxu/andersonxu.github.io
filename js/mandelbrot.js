var minval = -0.5;
var maxval = 0.5;
let scale = 5.0;
let count = 1.1;
function setup() {
    pixelDensity(1.0);
    createCanvas(600, 600);
}
function step() {
    scale = 1;
}
function draw() {
    step();
    var maxIterations = 500;
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var a = map(x, 0, width, -0.52, -0.515);
            var b = map(y, 0, height, -0.52, -0.515);
            var ca = a;
            var cb = b;
            var n = 0;
            while (n < maxIterations) {
                var aa = a * a - b * b;
                var bb = 2 * a * b;
                a = aa + ca;
                b = bb + cb;
                if (abs(aa + bb) > 4) {
                    break;
                }
                n++;
            }
            var hue = map(n, 0, maxIterations, 0, 1);
            hue = map(sqrt(hue), 0, 1, 0, 360);
            // bright=360;
            if (n === maxIterations) {
                hue = 0;
                bright = 0;
            }
            var pix = (x + y * width) * 4;
            // let c;
            // colorMode(HSB,360);
            // c = color(hue,100,bright);
            // console.log(c.levels);
            // pixels[pix + 0] = c.levels[0];
            // pixels[pix + 1] = c.levels[1];
            // pixels[pix + 2] = c.levels[2];
            pixels[pix + 0] = hue;
            pixels[pix + 1] = hue;
            pixels[pix + 2] = hue;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
    // noLoop();
}