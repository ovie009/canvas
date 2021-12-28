//chapter 3
// Polygons

//canvas variable
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
canvas.width = 850;
canvas.height = 850;

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

// centerX, centerY: the center point of the star 
// points: the number of points on the exterior of the star 
// inner: the radius of the inner points of the star 
// outer: the radius of the outer points of the star 
// fill, stroke: the fill and stroke colors to apply 
// line: the linewidth of the stroke
function drawStar(centerX, centerY, points, outer, inner, fill, stroke, line) {    
    // define the star
    ctx.beginPath();
    ctx.moveTo(centerX, centerY+outer);
    for (var i=0; i < 2*points+1; i++) {
        var r = (i%2 == 0)? outer : inner;
        var a = Math.PI * i/points;
        ctx.lineTo(centerX + r*Math.sin(a), centerY + r*Math.cos(a));
    };
    ctx.closePath();    // draw
    ctx.fillStyle=fill;
    ctx.fill();
    ctx.strokeStyle=stroke;
    ctx.lineWidth=line;
    ctx.stroke()
}

// Usage:
// drawStar(75,75,5,50,25,'mediumseagreen','gray',3);
// drawStar(150,200,8,50,25,'skyblue','gray',3);
// drawStar(225,75,16,50,20,'coral','transparent',0); 
// drawStar(300,200,16,50,40,'gold','gray',3)

let centerXArray = [];
let centerYArray = [];
let checkXArray = [];
let checkYArray = [];

for (let i = 0; i < 20; i++) {
    let centerX = randomInteger(100, 750);
    let centerY = randomInteger(100, 750);
    
    // code to make sure no two stars overlap, SUBJECT TO REVIEW
    // do {
        
    //     for (let i = (centerX - 120); i <= (centerX + 120); i++) {
    //         checkX = centerXArray.includes(centerX);
    //         if (checkX == true) {
    //             checkXArray.push(1);            
    //         } else{
    //             checkXArray.push(0);            
    //         }
    //     }
        
    //     // check if value 120 pixels greater or less than centerY eYist in centerXArray
    //     for (let i = (centerY - 120); i <= (centerY + 120); i++) {
    //         checkY = centerYArray.includes(centerY);
    //         if (checkY == true) {
    //             checkYArray.push(1);            
    //         } else{
    //             checkYArray.push(0);            
    //         }
    //     }
        
    // } while (checkXArray.includes(1) == true && checkYArray.includes(1) == true);

    // centerXArray.push(centerX);
    // centerYArray.push(centerY);
    let points = randomInteger(5, 15);
    let outer = randomInteger(40, 60);
    let inner = randomInteger((outer - 20), (outer - 4));
    let fill = colorArray[randomInteger(0, 5)];
    let stroke = fill;
    let line = randomInteger(0, 7);

    drawStar(centerX, centerY, points, outer, inner, fill, stroke, line);
}
