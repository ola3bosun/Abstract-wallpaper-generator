const canvasSketch = require('canvas-sketch');
const { color } = require('canvas-sketch-util');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

// INPUT FIELD : 

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'enter preferrred background color';

// BACKGROUND COLORS
const state = {
  backgroundColor: 'black'
}

// UI control styling
Object.assign(input.style, {
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  zIndex: 99999,
  width: "250px",
  padding: "1rem",
  backgroundColor: "rgba(0,0,0,.1)",
  color: "black",
  border: "1px solid black",
  borderRadius: "0.5rem",
  fontSize: "1rem",
  fontFamily: "Helvetica",
  backdropFilter: "blur(0.8rem)"
})

document.body.appendChild(input);

// ENTER BUTTON EVENTLISTENER
input.addEventListener("keydown", e => {
  if (e.key === "Enter"){
    state.backgroundColor = input.value;
    state.seed = Math.random();
    input.value = '';
    // document.body.style.backgroundColor = state.backgroundColor;
    console.log('Background color changed to:', state.backgroundColor);
  }
})

// FOCUS ON INPUT FIELD ON PAGE LOAD
window.addEventListener("load", () => {
  input.focus();
});

// IMAGE GENERATOR

const settings = {
  dimensions: [ window.innerWidth, window.innerHeight],
  animate: true
};

// NOT USED FUNCTIONS - canvas - sketch util replaced them
// const degToRad = (degrees) => {
//   return (degrees/180) * Math.PI;
// };

// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// }

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = state.backgroundColor;
    context.fillRect(0, 0, width, height);

    random.setSeed(state.seed);

    context.fillStyle = 'white';
    context.strokeStyle = 'white';

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 35;
    const radius = width * 0.3;



    for (let i = 0; i < num; i++) {
    const slice = math.degToRad(360 / num);
    const angle = slice * i;

    const scale = random.range(0.1, 2);

    x = cx + radius * Math.sin(angle);
    y = cy + radius * Math.cos(angle);


    context.save();
    context.translate(x, y);
    context.rotate(-angle);
    context.scale(random.range(.5,2), 1);

    context.beginPath();
    context.rect(w * 0.5, random.range(0, -h*0.5), w, h);
    context.fill();
    context.restore();

    context.save();
    context.translate(cx, cy);
    context.rotate(-angle);

    context.lineWidth = random.range(5,20);

    context.beginPath();
    context.arc(0, 0, radius * random.range(.7,1.3), slice * random.range(1,-8), slice * random.range(1,5));
    context.strokeStyle = 'white';
    context.stroke();
    context.restore();
    };
  };
};

canvasSketch(sketch, settings);

