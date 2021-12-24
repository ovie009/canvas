//chapter 1 
// Getting Started
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
let ox =  canvas.width/2;
let oy = canvas.height/2;

ctx.font = "42px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#800";
ctx.fillRect(ox/2, oy/2, ox, oy);


let downloadImg = function (el) {
    // get image URI from canvas object
    let imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
}