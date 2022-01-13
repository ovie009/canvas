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

ctx.fillStyle = 'tomato';
ctx.strokeStyle = 'teal';
ctx.lineWidth = 5;
ctx.ellipse(canvas.width/2, canvas.height/2, 240, 150, Math.PI/4, 0, 2*Math.PI, false);
ctx.fill();
ctx.stroke();
