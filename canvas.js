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

let videoContainer; //object to hold video and associated info
let video = document.createElement("video"); // create a video element
video.src = "cats__black-20210403-0002.mp4";
video.src = "logicalstops.webm";
// the video will now begin to load.
// As some additional info is needed we will place the video in a
// containing object for convenience
video.autoPlay = false; // ensure that the video does not auto play
video.loop = true; // set the video to loop.
videoContainer = { // we will add properties as needed
    video : video,
    ready : false,
};

// triggered when begining of video has been loaded
//video.oncanplay = readyToPlayVideo; // set the event to the play function that can be found below

// triggered when full of video has been loaded
video.oncanplaythrough = readyToPlayVideo; // set the event to the play function that can be found below

function readyToPlayVideo(event) {// thsi is a reference to the video
    console.log("Video ready to Play")
    // the video may not match the canvas size so find a scale to fit
    videoContainer.scale = Math.min(
        cw / this.videoWidth,
        ch / this.videoHeight
        // cw,
        // ch
    );
    videoContainer.ready = true;
    // the video can be played so hand it off to the display function
    requestAnimationFrame(updateCanvas);
}

function updateCanvas() {
    ctx.clearRect(0, 0, cw, ch); 
    // Though not always needed, you may get bad pixels from previous videos so clear to be safe

    // only draw if loaded and ready
    if (videoContainer !== undefined && videoContainer.readyToPlayVideo) {
        // find the top left of the video on the canvas
        let scale = videoContainer.scale;
        let vidH = videoContainer.video.videoHeight;
        let vidW = videoContainer.video.videoWidth;
        let top = ch / 2 - (vidH/2) * scale;
        let left = cw / 2 - (vidW/2) * scale;
        // now just draw the video the correct size
        ctx.drawImage(videoContainer.video, left, top, vidW * scale, vidH * scale);
        if (videoContainer.video.paused) { //if mot playing show the paused screen
            drawPlayIcon();
        }
    }
    // all done for display
    // request the next frame in 1/60th of a second
    requestAnimationFrame(updateCanvas);
}

function drawPlayIcon() {
    ctx.fillStyle = "black"; 
    ctx.globalApha = 0.5;
    ctx.fillRect(0, 0, cw, ch);
    ctx.fillStyle = "#DDD"; // colour of play icon
    ctx.globalAlpha = 0.75; // partly transparent
    ctx.beginPath(); //craete the path for the icon
    let size = ( ch/2 ) * 0.5; // the size of the icon
    ctx.moveTo( cw/2 + size/2, ch/2 ); //start at the pointy end
    ctx.lineTo(canvas.width/2 - size/2, canvas.height / 2 + size);
    ctx.lineTo(canvas.width/2 - size/2, canvas.height / 2 - size);
    ctx.closePath();
    ctx.fill();
    ctx.globalApha = 1; //restore alpha
}

function playPauseClick(){
    if(videoContainer !== undefined && videoContainer.ready){
        if(videoContainer.video.paused){
        videoContainer.video.play();
        }else{
        videoContainer.video.pause();
        }
    }
}
// register the event
canvas.addEventListener("click",playPauseClick);

