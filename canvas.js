//chapter 2
// Text

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
let text = 'Lorem ipsum.';
let font = "50px arial";
let x= 30;
let y = canvas.height/2;
let maxWidth = 250;
let fontSize = 20;
let fontFace = 'arial';
// let img = document.getElementById("img");
// let img = ;
let img = document.getElementById("myImg");


function drawImageInsideText(canvas,x,y,img,text,font){
    var c=canvas.cloneNode();
    var ctx=c.getContext('2d');
    ctx.font=font;
    ctx.fillText(text,x,y);
    ctx.globalCompositeOperation='source-atop';
    ctx.drawImage(img,0,0);
    canvas.getContext('2d').drawImage(c,0,0);
}


drawImageInsideText(canvas, x, y, img, text, font);

