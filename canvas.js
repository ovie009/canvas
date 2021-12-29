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

// load image 1
let image = new Image();
image.src = "drone.png"; //load image

image.onload = function () { //when loaded
    let pattern = ctx.createPattern(image, 'repeat'); 
    // "repeat-x", "repeat-y" and "repaet-none" can also be passed as the second parameter
    ctx.moveTo(0, 0);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'seagreen';
    ctx.fillStyle = pattern;
    ctx.fill();
};

// let image = document.getElementById("drone");
// let pattern = ctx.createPattern(image, 'repeat');
// ctx.moveTo(0, 0);
// ctx.rect(0, 0, canvas.width, canvas.height);
// ctx.fillStyle = 'seagreen';
// ctx.fillStyle = pattern;
// ctx.fill();