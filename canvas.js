//chapter 1 
// Getting Started
function createCanvas(width, height) {
    let canvas = document.createElement('Canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.ctx = canvas.getContext("2d");
    return canvas;
}

let myCanvas = createCanvas(256, 256); //create a small ccnvas 256 by 256 pixel
myCanvas.ctx.fillStyle = 'blue';
myCanvas.ctx.fillRect(0, 0, 256, 256);

myCanvas.id = 'canvasJavascript';
// document.body.appendChild(myCanvas);
