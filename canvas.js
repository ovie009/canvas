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
    
    // start the animation
    requestAnimationFrame(animate);

    function animate(currentTime) {
        
        //  draw a full randomly circle
        let radius = randomFloat(5, 10);
        let x = randomFloat(radius, cw - 2*radius);
        let y = randomFloat(radius, ch - 2*radius);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        // ctx.fillStyle = `#${randomInteger(0, 16777215).toString(16)}`;
        ctx.fillStyle = colorArray[randomInteger(0, 5)];
        ctx.fill();
        console.log(randomInteger(0, 5));

        // request another loop of animation
        requestAnimationFrame(animate);
    }
}); // end $(function(){});