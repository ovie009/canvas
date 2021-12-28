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

// check if image is loaded
let img = new Image();
img.onload = start();
img.onerror = function () {
    alert(img.src+' failed');
}
img.src = "xidingart-20200413-0001.jpg";

function start() {
    //start is called after the image is fully loaded
    // regardless of start's position in the code
    console.log('image loaded successfully')
}