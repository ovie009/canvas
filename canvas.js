//chapter 3
// Polygons

//canvas variable
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let canvas2 = document.getElementById("canvasFill");
let ctx2 = canvas2.getContext("2d");
let canvas3 = document.getElementById("canvasFit");
let ctx3 = canvas3.getContext("2d");
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

//scale to fit
function scaleToFit(img, canvas, ctx){
    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

//scale to fill
function scaleToFill(img, canvas, ctx){
    // get the scale
    var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// load image 1
let img1 = new Image();
img1.src = "xidingart-20200413-0001.jpg"; //load image
img1.onload = function () { //when loaded
    scaleToFill(this, canvas2, ctx2)
};

// load image 2
let img2 = new Image();
img2.src = "texte-20210420-0001.jpg"; //load image
img2.onload = function () { //when loaded
    scaleToFill(this, canvas, ctx)
};