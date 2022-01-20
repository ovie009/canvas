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

window.onload = (function() {
    
    // animation interval variables
    var nextTime=0; // the next animation begins at "nextTime"
    var duration=1000; // run animation every 1000ms
    var x=20; // the X where the next rect is drawn
    // start the animation
    requestAnimationFrame(animate);
    function animate(currentTime){
        // wait for nextTime to occur
        if(currentTime<nextTime){
            // request another loop of animation
            requestAnimationFrame(animate);
            // time hasn't elapsed so just return
            return;
        }
        // set nextTime
        nextTime=currentTime+duration;
        // add another rectangle every 1000ms
        ctx.fillStyle='#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.fillRect(x,30,30,30);
        // update X position for next rectangle
        x+=30;
        // request another loop of animation
        requestAnimationFrame(animate);
    }

}); // end $(function(){});