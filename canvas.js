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
// x,y line start
// xx,yy line end
// the pixel at line start and line end are drawn
function bresenhamLine(x, y, xx, yy){
    var oldFill = ctx.fillStyle; // save old fill style
    ctx.fillStyle = ctx.strokeStyle; // move stroke style to fill
    xx = Math.floor(xx);
    yy = Math.floor(yy);
    x = Math.floor(x);
    y = Math.floor(y);
    // BRENSENHAM
    var dx = Math.abs(xx-x);
    var sx = x < xx ? 1 : -1;
    var dy = -Math.abs(yy-y);
    var sy = y<yy ? 1 : -1;
    var err = dx+dy;
    var errC; // error value
    var end = false;
    var x1 = x;
    var y1 = y;
    while(!end){
        ctx.fillRect(x1, y1, 1, 1); // draw each pixel as a rect
        if (x1 === xx && y1 === yy) {
            end = true;
        }else{
            errC = 2*err;
            if (errC >= dy) {
                err += dy;
                x1 += sx;
            }
            if (errC <= dx) {
                err += dx;
                y1 += sy;
            }
        }
    }
    ctx.fillStyle = oldFill; // restore old fill style
}

bresenhamLine(30, 30, 200, 200);

ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(130, 30);
ctx.lineTo(300, 200)
ctx.stroke();