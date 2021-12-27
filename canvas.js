//chapter 1 
// Getting Started

//canvas variable
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
canvas.width = 500;
canvas.height = 500;

//random integer
function randomInteger(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

//random float
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

//text
let text = 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet';
ctx.font = "20px arial";
let x= 10;
let y = 10;
let maxWidth = 250;
let fontSize = 20;
let fontFace = 'arial';

// ctx.scale(3, 3);
ctx.beginPath();
ctx.moveTo(75,40);
ctx.bezierCurveTo(75,37,70,25,50,25);
ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
ctx.bezierCurveTo(20,80,40,102,75,120);
ctx.bezierCurveTo(110,102,130,80,130,62.5);
ctx.bezierCurveTo(130,62.5,130,25,100,25);
ctx.bezierCurveTo(85,25,75,37,75,40);
ctx.fillStyle='red';
ctx.fill();
ctx.closePath();
ctx.beginPath()
// ctx.setTransform(1,0,0,1,0,0);
ctx.fillStyle='blue';
ctx.arc(75, 40, 5, 0, 2*Math.PI, false);
ctx.fill();
ctx.closePath();
ctx.beginPath()
ctx.arc(50, 25, 5, 0, 2*Math.PI, false);
ctx.fill();
ctx.closePath();
ctx.beginPath()
ctx.arc(20, 62.5, 5, 0, 2*Math.PI, false);
ctx.fill();
ctx.closePath();
ctx.beginPath()
ctx.arc(75, 120, 5, 0, 2*Math.PI, false);
ctx.fill();
ctx.closePath();
ctx.beginPath()
ctx.arc(130, 62.5, 5, 0, 2*Math.PI, false);
ctx.fill();
ctx.closePath();
ctx.beginPath()
ctx.arc(100, 25, 5, 0, 2*Math.PI, false);
ctx.fill();
ctx.closePath();
ctx.beginPath()
ctx.arc(75, 40, 5, 0, 2*Math.PI, false);
ctx.fill();
ctx.closePath();