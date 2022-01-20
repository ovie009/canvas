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

window.onload=(function(){

    function log(){console.log.apply(console,arguments);}
    // canvas variables
    // set canvas styling
    ctx.strokeStyle='skyblue';
    ctx.lineJoint='round';
    ctx.lineCap='round';
    ctx.lineWidth=6;
    // handle windows scrolling & resizing
    function reOffset(){
        var BB=canvas.getBoundingClientRect();
        offsetX=BB.left;
        offsetY=BB.top;
    }

    var offsetX,offsetY;
    reOffset();
    window.onscroll=function(e){ reOffset(); }
    window.onresize=function(e){ reOffset(); }
    // vars to save points created during mousemove handling
    var points=[];
    var lastLength=0;
    // start the animation loop
    requestAnimationFrame(draw);
    canvas.onmousemove=function(e){handleMouseMove(e);}
    function handleMouseMove(e){
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // get the mouse position
        mouseX=parseInt(e.clientX-offsetX);
        mouseY=parseInt(e.clientY-offsetY);
        // save the mouse position in the points[] array
        // but don't draw anything
        points.push({x:mouseX,y:mouseY});
    }

    function draw(){
        // No additional points? Request another frame an return
        var length=points.length;
        if(length==lastLength){requestAnimationFrame(draw);return;}
        // draw the additional points
        var point=points[lastLength];
        ctx.beginPath();
        ctx.moveTo(point.x,point.y)
        for(var i=lastLength;i<length;i++){
        point=points[i];
        ctx.lineTo(point.x,point.y);
        }
        ctx.stroke();
        // request another animation loop
        requestAnimationFrame(draw);
    }

}); // end $(function(){});