
let c, cn, ns, nFac, amp;
// the initial angle and noise
let a = 0;
let n = 0;

// animation or not
let animate = true
// global multiplier
let mlt = 1;
// the amount the noise increases
let off = 0.01;
// offset from the edges of the canvas
let inset = 50 * mlt;
// subdivisions of every line
let res = 10 * mlt;
// vertical spacing
let spacing = 20 * mlt;
// 0: amplitude from the center of the line, 1: amplitude from right side of the line
let mode = 0;

// amp: the height of the amplitude
// nFac: some divider value
if (mode === 0) {
  amp = 120 * mlt;
  nFac = 60000 * mlt;
} else if (mode === 1) {
  amp = 90 * mlt;
  nFac = 8000 * mlt;
}

function setup() {
  c = createCanvas(mlt * 700, mlt * 700);
  if (animate) {
    stroke(255);
    fill(15);
  } else {
    stroke(15, 20);
    noFill();
    background(240);
  }
}
function draw() {
  if (animate) {
    background(15);
  } else {
    if (frameCount > 25 * mlt) {
      noLoop();
    }
  }
  n += off;
  for (let y = inset * 2; y <= height - 2 * inset; y += spacing) {
    a = 0;
    beginShape();
    for (let x = inset; x <= width - inset; x += res) {
      a = map(x, inset, width - inset, 0, PI)
      // this conditional determines the amount of noise to be subtracted from the y-coordinates
      if (mode === 0) {
        // amplitude from the center of the line
        ns = pow(sin(a), 5) * noise(pow(x, 2) / nFac + n + y) * amp;
      } else if (mode === 1) {
        // amplitude from the right side of the line
        ns = ((y - (inset * 2)) * (x - inset) * noise(pow(x, 2) / nFac + n + y) * amp) / pow(500 * mlt, 2);
      }
      vertex(x, y - ns);
    }
    endShape();
  }
}
