//chapter 3
// Polygons

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
    "#d7d8c9",
    "#a4a68a",
    "#f2be24",
    "#57523e",
    "#d94c1a",
]

// used to calculate the position relative to window
function reOffset() {
    let BB = canvas.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
}

let offsetX, offsetY;
reOffset();

window.onscroll = function (e) { reOffset(); }
window.onresize = function (e) { reOffset(); }
canvas.onresize = function (e) { reOffset(); }

// array to store information about shapes drawn on the canvas
let shapes = [];
// define one circle and save it in the shapes[] array
shapes.push( {x: 30, y: 30, radius: 15, color: 'blue'} );
// define one rectangle and save it in the shapes[] array
shapes.push( {x: 100, y: -1, width: 75, height: 35, color: 'red'} );
// define one triangle path and save it to the shapes[] array
shapes.push( {x: 0, y: 0, points: [{x: 50, y: 30}, {x: 75, y: 60}, {x: 25, y: 60}], color: 'green'} );

// drag related variables
let isDragging = false;
let startX, startY;

// hold the index of the shape being dragged (if any)
let selectedShapeIndex;

//draw the shapes on the canvas
drawAll();

// listen to mouse events on the canvas
canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;
canvas.onmouseout = handleMouseOut;


// given mouse X & Y (mx & my) and shape object
// return true/false whether mouse is inside the shape
function isMouseInShape(mx, my, shape) {
    
    if(shape.radius){
        // this is a circle
        let dx = mx - shape.x
        let dy = my - shape.y;

        //  math text to see if mouse is inside circle
        if (dx*dx + dy*dy < shape.radius*shape.radius) {
            // yes, mouse is inside this circle
            return(true);
        }
    } else if (shape.width) {
        // this is a rectangle
        let rLeft = shape.x;
        let rRight = shape.x + shape.width;
        let rTop = shape.y;
        let rBot = shape.y+shape.height;
        
        if (mx > rLeft && mx < rRight && my > rTop && my < rBot) {
            return(true);
        }
    } else if(shape.points){
        // this is a polyline path
        // first redefine the path again (no need to stroke/fill!)
        defineIrregularPath(shape);
        // then hit-test with isPointInPath
        if (ctx.isPointInPath(mx, my)) {
            return(true);
        }
    }
    // the mouse isn't in any of the shapes
    return(false);
}

function handleMouseDown(e) {
    // tell the browser we are handling this event
    e.preventDefault();
    e.stopPropagation();
    // calculate the current mouse propagation
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    // test mouse position against all shapes
    // post result if mouse is in a shape

    for (let i = 0; i < shapes.length; i++) {
        if (isMouseInShape(startX, startY, shapes[i])) {
            // the mouse is inside this shape
            // select this image
            selectedShapeIndex = i;
            // set the isDragging Flag
            isDragging = true;
            // and return ( stop looking for further shapes under the mouse)
            return;
        }
    }
}

function handleMouseUp(e) {
    // return if we are not dragging
    if(!isDragging){return;}
    // tell the browser we are handling this event
    e.preventDefault();
    e.stopPropagation();
    // the drag is over -- clear the isDragging flag
    isDragging = false;
}

function handleMouseOut(e) {
    // return if we are not dragging
    if(!isDragging){return;}
    // tell the browser we are handling this event
    e.preventDefault();
    e.stopPropagation();
    // the drag is over -- clear the isDragging flag
    isDragging = false;
}

function handleMouseMove(e){
    // return if we're not dragging
    if(!isDragging){return;}
    console.log(e);
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // calculate the current mouse position
    mouseX=parseInt(e.clientX-offsetX);
    mouseY=parseInt(e.clientY-offsetY);
    // how far has the mouse dragged from its previous mousemove position?
    let dx = mouseX - startX;
    let dy = mouseY - startY;
    // move the selected shape by the drag distance
    let selectedShape=shapes[selectedShapeIndex];
    selectedShape.x+=dx;
    selectedShape.y+=dy;
    
    // console.log(isDragging);
    // clear the canvas and redraw all shapes
    drawAll();
    // update the starting drag position (== the current mouse position)
    startX=mouseX;
    startY=mouseY;
}

//clear the canvas and
// redraw all shapes in their current position
function drawAll() {
    ctx.clearRect(0, 0, cw, ch);
    for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];

        if(shape.radius){
            // its a circle
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI*2);
            ctx.fillStyle = shape.color;
            ctx.fill();
        
        } else if (shape.width) {
            // it's a rectangle
            ctx.beginPath();
            ctx.fillStyle = shape.color;
            ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.points) {
            // its a polyline path
            defineIrregularPath(shape);
            ctx.fillStyle = shape.color;
            ctx.fill();
        }
        
    }
}

function defineIrregularPath(shape) {
    let points = shape.points;
    ctx.beginPath();
    ctx.moveTo(shape.x + points[0].x, shape.y + points[0].y);
    for (let i = 0; i < points.length; i++) {
        ctx.lineTo(shape.x + points[i].x, shape.y + points[i].y)
    }
    ctx.closePath();
}