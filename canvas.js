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
    

    // animation related variables
    let speedX = 2;     // The image  will move at 1px per loop
    let direction = 1;  //The image direction: 1==rightward, -1==leftward
    let y = 20;         // The Y-coordinate
    
    // console.log(cw);
    
    // load a new image
    // IMPORTANT!!! You must give the image time to load by using img.onload!
    let img = new Image();
    img.onload = start;
    img.src = "/xidingart-20210624-0001.jpg";
    img.width = 500;
    img.height = 600;
    let minX = 0;      // keep the image animating
    let maxX = cw - img.width;     // between minX & maxX
    let x = minX;       // The current X-coordinate

    function start() {
        // the image is fully loaded so start animating
        requestAnimationFrame(animate);
    }

    

    function animate(time) {
        // clear the canvas
        ctx.clearRect(0, 0, cw, ch);

        // draw
        ctx.drawImage(img, x, y, img.width, img.height);

        // update
        x += speedX * direction;
        // keep "x" inside min & max
        if(x < minX){ x=minX; direction*=-1; }
        if(x > maxX){ x=maxX; direction*=-1; }

        // request another loop of animation
        requestAnimationFrame(animate);
        
    }

}); // end $(function(){});