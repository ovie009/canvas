//chapter 1 
// Getting Started
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
ctx.font = "16px Arial";


canvas.addEventListener("mousemove", function(e) {
    
    // console.log("Hello World!");
    let cRect = canvas.getBoundingClientRect();  //gets CSS pos, and width/height
    let canvasX = Math.round(e.x - cRect.left); // substarct the 'left' of the canvas
    let canvasY = Math.round(e.y - cRect.top); // from the X/Y postion to make
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // (0, 0) the top left of the canvas
    ctx.fillText(`X: ${canvasX}, Y: ${canvasY}`, 10, 20);
    console.log(e);
    
})