//chapter 1 
// Getting Started

(function(){
    const FILL = 0;         // const to indicate filltext render
    const STROKE = 1;
    const MEASURE = 2;
    let renderType = FILL;  //used internal to set fill or stroke text

    let maxSpaceSize = 3;   // Multiplier for max space size. If greater then no justifucation applied
    let minSpaceSize = 0.5; // Multiplier for minimum space size

    let renderTextJustified = function(ctx, text, x, y, width){
        let words, wordsWidth, count, spaces, spaceWidth, adjSpace, renderer, i, textAlign, useSize, totalWidth;

        textAlign = ctx.textAlign; // get current align settings

        ctx.textAlign = "left";
        wordsWidth = 0;
        words = text.split(" ").map(word => {
            let w = ctx.measureText(word).width;
            wordsWidth += w;
            return {
                width : w,
                word : word,
            };
        });
        // count = num words, spaces = number spaces, spaceWidth normal space size
        // adjSpace new space size >= min size. useSize Resulting space used to render
        count = words.length;
        spaces = count - 1;
        spaceWidth = ctx.measureText(" ").width;
        adjSpace = Math.max(spaceWidth * minSpaceSize, (width - wordsWidth)/ spaces);
        useSize = adjSpace > spaceWidth * maxSpaceSize ? spaceWidth : adjSpace;
        totalWidth = wordsWidth + useSize * spaces;

        if(renderType === MEASURE){ //if measuring return size
            ctx.textAlign = textAlign;
            return totalWidth;
        }
        renderer = renderType === FILL ? ctx.fillText.bind(ctx) : ctx.strokeText.bind(ctx); //fill or stroke

        switch (textAlign) {
            case "right":
                x -= totalWidth;
                break;
            case "end":
                x += width - totalWidth;
                break;
            case "center": // intentional fall through to defauit
                x -= totalWidth/2;
                break;
            default:
        }
        if (useSize === spaceWidth) { // if space size unchanged
            renderer(text, x, y);
        } else {
            for (let i = 0; i < count; i += 1) {
                renderer(words[i].width, x, y);
                x += words[i].width;
                x += useSize;                
            }
        }
        ctx.textAlign = textAlign;
    }

    // Parse vet and set settings object
    let justifiedTextSetttings = function(settings){
        let min, max;
        let vetNumber = (num, defaultNum) => {
            num = num !== null && num !== null && !isNaN(num) ? num: defaultNum;
            if (num < 0) {
                num = defaultNum;
            }
            return num;
        }

        if(settings === undefined || settings === null){
            return;
        }

        max = vetNumber(settings.maxSpaceSize, maxSpaceSize);
        min = vetNumber(settings.minSpaceSize, minSpaceSize);
        if (min > max) {
            return;
        }
        minSpaceSize = min;
        maxSpaceSize = max;
    }

    // define fill text
    let fillJustifyText = function (text, x, y, width, settings) {
        justifiedTextSetttings(settings);
        renderType = FILL;
        renderTextJustified(this, text, x, y, width);
    }

    // define stroke text
    let strokeJustifyText = function (text, x, y, width, settings) {
        justifiedTextSetttings(settings);
        renderType = STROKE;
        renderTextJustified(this, text, x, y, width);
    }

    // define measure text
    let measureJustifiedText = function (text, width, settings) {
        justifiedTextSetttings(settings);
        renderType = MEASURE;
        return renderTextJustified(this, text, 0, 0, width);
    }

    // code point A
    // set the prototypes
    CanvasRenderingContext2D.prototype.fillJustifyText = fillJustifyText;
    CanvasRenderingContext2D.prototype.strokeJustifyText = strokeJustifyText;
    CanvasRenderingContext2D.prototype.measureJustifiedText = measureJustifiedText;
    // code point B

    // optional code if you do not wishto extend the CanvasRenderingContext2D prototype
    
    /*// Uncomment from here to the closing comment
    window.justifiedText = {
        fill : function (ctx, text, x, y, width, settings) {
            justifiedTextSetttings(settings);
            renderType = FILL;
            renderTextJustified(ctx, text, x, y, width);
        },
        
        stroke : function (ctx, text, x, y, width, settings) {
            justifiedTextSetttings(settings);
            renderType = STROKE;
            renderTextJustified(ctx, text, x, y, width);
        },

        measure : function (ctx, text, width, settings) {
            justifiedTextSetttings(settings);
            renderType = MEASURE;
            renderTextJustified(ctx, text, 0, 0, width);
        }
    }
    //to here*/

})();

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let w = 500;
let h = 500;
let sideMargin = 20;
canvas.width = w;
canvas.height = h;
// w = canvas.width;
// h = canvas.height;
ctx.clearRect(0, 0, w, h);
ctx.font = "40px arial";
ctx.textAlign = "center";
ctx.fillText("Justified Text Examples.", canvas.width/2, 60);
ctx.font = "25px arial";
ctx.textAlign = "left";

ctx.fillJustifyText('Lorem ipsum, dolor sit amet cons.', sideMargin, 120, w - 2*sideMargin)
ctx.strokeJustifyText('Lorem ipsum, dolor sit amet.', sideMargin, 180, w - 2*sideMargin)
let measuredText = ctx.measureJustifiedText('Lorem ipsum, dolor sit amet.', w - 2*sideMargin);

console.log('Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ab voluptatem aspernatur ducimus assumenda placeat, sunt eum velit quod quam.');