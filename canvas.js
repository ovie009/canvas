//chapter 1 
// Getting Started

// render text along a curve
// pass 8 values for cubic bezier
// pass 6 values for quadratic
// wrap text into paragraphs
function wrapText(text, x, y, maxWidth, fontSize, fontFace){
    var firstY=y;
    var words = text.split(' ');
    var line = '';  var lineHeight=fontSize*1.286; // a good approx for 10-18px sizes

    ctx.font=fontSize+" "+fontFace;
    ctx.textBaseline='top';
  
    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if(testWidth > maxWidth) {
            ctx.fillText(line, x, y);
            if(n<words.length-1){
                line = words[n] + ' ';
                y += lineHeight;
            }
        }
        else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
} 


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
let text = 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet';
ctx.font = "20px arial";
let x= 10;
let y = 10;
let maxWidth = 250;
let fontSize = 20;
let fontFace = 'arial';

wrapText(text, x, y, maxWidth, fontSize, fontFace);
