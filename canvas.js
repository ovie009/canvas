//chapter 3
// Polygons

//canvas variable
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// canvas.width = 500;
// canvas.height = 500;
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
let centerX = canvas.width/2;
let centerY = canvas.height/2;

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

// ctx.beginPath();
// ctx.arc(centerX, centerY, 50, 0, 2*Math.PI);
// ctx.stroke();
// ctx.fillStyle = colorArray[randomInteger(0, 5)];
// // ctx.fillStyle = colorArray[4];
// ctx.fill();
// console.log("end of the line");

function animate() {
    
    // update the x position of the circle

    centerX += 0.5; // the value represents how fast it moves
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2*Math.PI);
    ctx.fillStyle = colorArray[4];
    ctx.fill();

    // if the ball reaches the end of the canvas make reset its center to the left hand side
    if (centerX > canvas.width + 110) {
        centerX = -50;
    }
    
    // request another animate() loop
    requestAnimationFrame(animate);
}

animate();