//chapter 1 
// Getting Started
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
let ox =  canvas.width/2;
let oy = canvas.height/2;

ctx.font = "42px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#FFF";
ctx.fillText("Hello World!", ox, oy);


let rotateCtx = function () {
    // tramslate so that the origin in mow (ox, oy) the center of the canvas
    ctx.translate(ox, oy);
    // convert degrees to radians with radians = (Math.PI/180)*degrees
    ctx.rotate((Math.PI/180)*15);
    ctx.fillText("Hello World!", 0, 0);
    // translate back
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(-ox, -oy);
}