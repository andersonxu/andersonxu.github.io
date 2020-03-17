let numbers = [true];
let count = 1;
let sequence = [];
let index = 0;

let newTickEveryMS = 500
let oldTickTime = Date.now()
let currStep

let scl = 0;
let arcs = [];
let biggest = 0;
let smallest = 1;

class Arc {
    constructor(start, end, count) {
        this.start = start;
        this.end = end;
        this.dir = count % 2;
        colorMode(HSB, 720);
        this.c = color(count % 720, 360, 720);
    }
    show() {
        let diameter = abs(this.end - this.start);
        let x = (this.end + this.start) / 2;
        stroke(this.c);
        strokeWeight(0.8);
        noFill();
        if (this.dir == 0) {
            arc(x, 0, diameter, diameter, PI, 0);
        } else {
            arc(x, 0, diameter, diameter, 0, PI);
        }
    }
    showPartial() {
        stroke(this.c);
        strokeWeight(0.8);
        noFill();
        let diameter = abs(this.end - this.start);
        let x = (this.end + this.start) / 2;
        if (this.dir == 0) {
            if (this.end < this.start) {
                drawLeftTop(x, 0, diameter, currStep)
            }
            else {
                drawRightTop(x, 0, diameter, currStep)
            }
        } else {
            if (this.end < this.start) {
                drawLeftBottom(x, 0, diameter, currStep)
            }
            else {
                drawRightBottom(x, 0, diameter, currStep)
            }
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    background(0);
    numbers[index] = true;
    sequence.push(index);
}

function step() {
    let next = index - count;
    if (next < 0 || numbers[next]) {
        next = index + count;
    }
    numbers[next] = true;
    sequence.push(next);

    let a = new Arc(index, next, count);
    arcs.push(a);
    index = next;

    if (index > biggest) {
        biggest = index;
    }
    if (next == smallest) {
        smallest++;
        while (numbers[smallest]) {
            smallest++;
        }
    }
    count++;
    if (newTickEveryMS >= 1) {
        newTickEveryMS = 1000 - count / 4;
    } else {
        newTickEveryMS = 1;
    }
}


function draw() {
    if (oldTickTime < Date.now()) {
        step()
        oldTickTime = Date.now() + newTickEveryMS;
        start = Date.now()
        end = start + newTickEveryMS
    }

    currStep = map(end - Date.now(), newTickEveryMS, 0, 0.1, PI)
    background(0);
    textSize(32);
    stroke(720);
    fill(720);
    text("Next number: " + index, windowWidth / 16, windowHeight / 16);
    text("Current index: " + count, windowWidth / 16, windowHeight / 16 + 32);
    text("Lagest number: " + biggest, windowWidth / 16, windowHeight / 16 + 64);
    text("Smaller uncovered number: " + smallest, windowWidth / 16, windowHeight / 16 + 96);
    textSize(20);
    text("The first sequence (A005132) is a sequence of nonnegative integers separated by steps that can be described as “subtract if possible, otherwise add”:\na (0) = 0 ; for  n > 0, a (n) = a (n  −  1)  −  n  if that number is positive and not already in the sequence, otherwise  a (n) = a (n  −  1) + n , whether or not that number is already in the sequence." + smallest, windowWidth / 6, windowHeight * 14 / 16, windowWidth * 3 / 4, windowHeight);
    translate(0, height / 2);
    scl = lerp(scl, width / (biggest * 1.05), 0.1);
    scale(scl);

    for (let i = 0; i < arcs.length - 1; i++) {
        arcs[i].show()
    }
    arcs[arcs.length - 1].showPartial()
}

function drawRightBottom(x, y, diameter, currStep) {
    arc(x, y, diameter, diameter, PI - currStep, PI);
}

function drawRightTop(x, y, diameter, currStep) {
    arc(x, y, diameter, diameter, PI, currStep - PI);
}

function drawLeftBottom(x, y, diameter, currStep) {
    arc(x, y, diameter, diameter, 0, currStep);
}

function drawLeftTop(x, y, diameter, currStep) {
    arc(x, y, diameter, diameter, 0 - currStep, 0);
}
