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

function drawRegularPolygon(sideCount,radius,centerX,centerY,strokeWidth,strokeColor,fillColor,rotationRadians){
    
    var angles=Math.PI*2/sideCount;
    ctx.translate(centerX,centerY);
    ctx.rotate(rotationRadians);
    ctx.beginPath();
    ctx.moveTo(radius,0);
    for(var i=1;i<sideCount;i++){
        ctx.rotate(angles);
        ctx.lineTo(radius,0);
    }
    ctx.closePath();
    ctx.fillStyle=fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.fill();
    ctx.rotate(angles*-(sideCount-1));
    ctx.rotate(-rotationRadians);
    ctx.translate(-centerX,-centerY);
}

// Usage:
drawRegularPolygon(3,50,100,100,6,'gray','red',0);
drawRegularPolygon(5,50,250,100,6,'gray','gold',0);
drawRegularPolygon(6,50,400,100,6,'gray','lightblue',0);
drawRegularPolygon(7,50,550,100,6,'gray','lightgreen',0);
drawRegularPolygon(8,50,700,100,6,'gray','tomato',0);
drawRegularPolygon(9,50,100,300,6,'gray','purple',0);
drawRegularPolygon(10,50,250,300,6,'gray','teal',0);
drawRegularPolygon(11,50,400,300,6,'gray','orange',0);
drawRegularPolygon(12,50,550,300,6,'gray','seagreen',0);
drawRegularPolygon(13,50,700,300,6,'gray','skyblue',0);
drawRegularPolygon(14,50,100,500,6,'gray','tomato',0);

