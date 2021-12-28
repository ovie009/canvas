//chapter 3
// Polygons

//canvas variable
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
canvas.width = 850;
canvas.height = 850;

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
let img1 = new Image();
img1.onload = start;
img1.onerror = function () {
    alert(img1.src+' failed');
}
img1.src = "xidingart-20200413-0001.jpg";

// load image 2
let img2 = new Image();
img2.onload = start;
img2.onerror = function () {
    alert(img2.src+' failed');
}
img2.src = "comics_hall-20200413-0007.jpg";
let imgCount = 2;

// start is called everytime an image loads
function start() {
    // countdown until all images are loaded
    if (--imgCount > 0) {
        return;
    }
    // all the images are now successfully loaded
    // context.drawImage will successfully draw each one
    ctx.drawImage(img1, 0, 0);
    ctx.drawImage(img2, 0, canvas.height/2);
}