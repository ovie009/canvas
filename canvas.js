//canvas variable
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// canvas.width = 500;
// canvas.height = 500;
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

let cw = canvas.width;
let ch = canvas.height;

let centerX = cw/2;
let centerY = ch/2;

//random integer
function randomInteger(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

//random float
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

let colorArray = [
    '#1C4859',
    '#4BA66A',
    '#F2CD5E',
    '#A67E5B',
    '#BF4141'
]

// canvas styles
ctx.strokeStyle='skyblue';
ctx.fillStyle='blue';
// animating vars
var pct=101;
var startX=20; //starting x coordinate
var startY=50; //starting y coordinate
var endX=225; //endng x coordinate
var endY=100; //ending y coordinate
var dx=endX-startX;
var dy=endY-startY;
// start animation loop running
requestAnimationFrame(animate);
// listen for mouse events
window.onmousedown=(function(e){handleMouseDown(e);});
window.onmouseup=(function(e){handleMouseUp(e);});
// constantly running loop
// will animate dot from startX,startY to endX,endY
function animate(time){
    // demo: rerun animation
    if(++pct>100){pct=0;}
    console.log(dx)
    // update
    x=startX+dx*pct/100;
    y=startY+dy*pct/100;
    // draw
    ctx.clearRect(0,0,cw,ch);
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fill()
    // request another animation loop
    requestAnimationFrame(animate);
}