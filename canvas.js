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

function cropImage(image, croppingCoords) {
    var cc = croppingCoords;
    var workCan = document.createElement("canvas"); // create a canvas
    workCan.width = Math.floor(cc.width);  // set the canvas resolution to the cropped image size
    workCan.height = Math.floor(cc.height);
    var ctx = workCan.getContext("2d");    // get a 2D rendering interface    
    ctx.drawImage(image, -Math.floor(cc.x), -Math.floor(cc.y)); // draw the image offset to place it correctly on the cropped region
    image.src = workCan.toDataURL();       // set the image source to the canvas as a data URL
    return image; 
}

// load image 2
let img2 = new Image();
img2.src = "comics_hall-20200413-0007.jpg"; //load image
img2.onload = function () { //when loaded
    cropImage(this, {
        x: this.width/4, //crop keeping the center
        y: this.height/4, 
        width: this.width/2, 
        height: this.height/2, 
    });    
    document.body.appendChild(this); //add the image to the DOM
};