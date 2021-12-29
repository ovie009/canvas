//chapter 3
// Polygons

//canvas variable
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
// canvas.width = 500;
// canvas.height = 500;

//random integer
function randomInteger(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

//random float
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

let colorArray = [
    "#d7d8c9",
    "#a4a68a",
    "#f2be24",
    "#57523e",
    "#d94c1a",
]

let linearGradient = ctx.createLinearGradient(300, 100, 450, 400);
linearGradient.addColorStop(0, 'orange');
linearGradient.addColorStop(1, 'teal');

let radialGradient = ctx.createRadialGradient(450, 450, 25, 450, 450, 50);
radialGradient.addColorStop(0, 'rebeccapurple');
radialGradient.addColorStop(1, 'tomato');
ctx.strokeStyle = linearGradient;

ctx.beginPath();
ctx.lineWidth = 9;
ctx.lineCap = 'round'; // "butt" (default), 'square'
//lineCap, styles the end of the line
ctx.lineTo(200, 200);
ctx.lineTo(300, 300);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 9;
ctx.lineCap = 'square'; // "butt" (default), 'square'
//lineCap, styles the end of the line
ctx.lineTo(300, 200);
ctx.lineTo(400, 300);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 9;
ctx.lineCap = 'butt'; // "butt" (default), 'square'
//lineCap, styles the end of the line
ctx.lineTo(100, 200);
ctx.lineTo(200, 300);
ctx.stroke();


ctx.beginPath();
ctx.lineWidth = 9;
ctx.lineJoin = 'round'; // "miter" (default), 'bevel'
//lineCap, styles the end of the line
ctx.lineTo(400, 200);
ctx.lineTo(450, 250);
ctx.lineTo(500, 200);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 9;
ctx.lineJoin = 'bevel'; // "miter" (default), 'bevel'
//lineCap, styles the end of the line
ctx.lineTo(550, 200);
ctx.lineTo(600, 250);
ctx.lineTo(650, 200);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 9;
ctx.lineJoin = 'miter'; // "miter" (default), 'bevel'
//lineCap, styles the end of the line
ctx.lineTo(700, 200);
ctx.lineTo(750, 250);
ctx.lineTo(800, 200);
ctx.stroke();

ctx.beginPath()
ctx.rect(400, 400, 100, 100);
ctx.fillStyle = radialGradient;
ctx.fill();