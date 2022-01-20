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

// this example assumes ctx and canvas have been created
const textToDisplay = "Animated Text.";
const textStyle = "white";
const BGStyle = "black"; // background style
const textSpeed = 0.5; // in pixels per millisecond
const textHorMargin = 8; // have the text a little outside the canvas
ctx.font = Math.floor(canvas.height * 0.8) + "px arial"; // size the font to 80% of canvas height
var textWidth = ctx.measureText(textToDisplay).width; // get the text width
var totalTextSize = (canvas.width + textHorMargin * 2 + textWidth);
ctx.textBaseline = "middle"; // not put the text in the vertical center
ctx.textAlign = "left"; // align to the left
var textX = canvas.width + 8; // start with the text off screen to the right
var textOffset = 0; // how far the text has moved
var startTime;
// this function is call once a frame which is approx 16.66 ms (60fps)
function update(time){ // time is passed by requestAnimationFrame
    if(startTime === undefined){ // get a reference for the start time if this is the first frame
        startTime = time;
    }
    ctx.fillStyle = BGStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // clear the canvas bydrawing over it
    textOffset = ((time - startTime) * textSpeed) % (totalTextSize); // move the text left
    ctx.fillStyle = textStyle; // set the text style
    ctx.fillText(textToDisplay, textX - textOffset, canvas.height / 2); // render the text

    requestAnimationFrame(update);// all done request the next frame
}
requestAnimationFrame(update);// to start request the first frame