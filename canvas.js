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


// Requires justified text extensions 
(function(){    
    // code point A    
    if(typeof CanvasRenderingContext2D.prototype.fillJustifyText !== "function"){           
        throw new ReferenceError("Justified Paragraph extension missing requiered CanvasRenderingContext2D justified text extension");    
    }    
    var maxSpaceSize = 3; // Multiplier for max space size. If greater then no justificatoin applied    
    var minSpaceSize = 0.5; // Multiplier for minimum space size      
    var compact = true; // if true then try and fit as many words as possible. If false then try to get the spacing as close as possible to normal    
    var lineSpacing = 1.5; // space between lines    
    const noJustifySetting = {  // This setting forces justified text off. Used to render last line of paragraph.        
        minSpaceSize : 1,        
        maxSpaceSize : 1,    
    }
    // Parse vet and set settings object.    
    var justifiedTextSettings = function(settings){
        var min, max;
        var vetNumber = (num, defaultNum) => {
            num = num !== null && num !== null && !isNaN(num) ? num : defaultNum;
            return num < 0 ? defaultNum : num;
        }        
        if(settings === undefined || settings === null){ return; }
        compact = settings.compact === true ? true : settings.compact === false ? false : compact;
        max = vetNumber(settings.maxSpaceSize, maxSpaceSize);
        min = vetNumber(settings.minSpaceSize, minSpaceSize);
        lineSpacing = vetNumber(settings.lineSpacing, lineSpacing);
        if(min > max){ return; }
        minSpaceSize = min;
        maxSpaceSize = max;
    }
    var getFontSize = function(font){  // get the font size.
        var numFind = /[0-9]+/;
        var number = numFind.exec(font)[0];
        if(isNaN(number)){
            throw new ReferenceError("justifiedPar Cant find font size");
        }
        return Number(number);
    }    
    function justifiedPar(ctx, text, x, y, width, settings, stroke){
        var spaceWidth, minS, maxS, words, count, lines, lineWidth, lastLineWidth, lastSize, i, renderer, fontSize, adjSpace, spaces, word, lineWords, lineFound;
        spaceWidth = ctx.measureText(" ").width; 
        minS = spaceWidth * minSpaceSize;
        maxS = spaceWidth * maxSpaceSize;
        words = text.split(" ").map(word => {  // measure all words.            
            var w = ctx.measureText(word).width;                            
            return {
                width : w,
                word : word,
            };
        });
        // count = num words, spaces = number spaces, spaceWidth normal space size        
        // adjSpace new space size >= min size. useSize Resulting space size used to render        
        count = 0;
        lines = [];        
        // create lines by shifting words from the words array until the spacing is optimal. If compact        
        // true then will true and fit as many words as possible. Else it will try and get the spacing as        
        // close as possible to the normal spacing        
        while(words.length > 0){            
            lastLineWidth = 0;            
            lastSize = -1;            
            lineFound = false;            
            // each line must have at least one word.            
            word = words.shift();            
            lineWidth = word.width;            
            lineWords = [word.word];            
            count = 0;            
            while(lineWidth < width && words.length > 0){ // Add words to line
                word = words.shift();                
                lineWidth += word.width;                
                lineWords.push(word.word);                
                count += 1;                
                spaces = count - 1;                
                adjSpace =  (width - lineWidth) / spaces;
                if(minS > adjSpace){  // if spacing less than min remove last word and finish line                    
                    lineFound = true;                    
                    words.unshift(word);                    
                    lineWords.pop();                
                }else{                    
                    if(!compact){ // if compact mode                        
                        if(adjSpace < spaceWidth){ // if less than normal space width                            
                            if(lastSize === -1){
                                lastSize = adjSpace;                           
                            }                            
                            // check if with last word on if its closer to space width                            
                            if(Math.abs(spaceWidth - adjSpace) < Math.abs(spaceWidth - lastSize)){
                                lineFound = true; // yes keep it                            
                            }else{                                
                                words.unshift(word);  // no better fit if last word removes                                
                                lineWords.pop();
                                lineFound = true;                            
                            }
                        }
                    }
                }
                lastSize = adjSpace; // remember spacing
            }
            lines.push(lineWords.join(" ")); // and the line
        }
        // lines have been worked out get font size, render, and render all the lines. last
        // line may need to be rendered as normal so it is outside the loop.
        fontSize = getFontSize(ctx.font);
        renderer = stroke === true ? ctx.strokeJustifyText.bind(ctx) : ctx.fillJustifyText.bind(ctx);
        for(i = 0; i < lines.length - 1; i ++){
            renderer(lines[i], x, y, width, settings);
            y += lineSpacing * fontSize;
        }        
        if(lines.length > 0){ // last line if left or start aligned for no justify            
            if(ctx.textAlign === "left" || ctx.textAlign === "start"){
                renderer(lines[lines.length - 1], x, y, width, noJustifySetting);
                ctx.measureJustifiedText("", width, settings);
            }else{
                renderer(lines[lines.length - 1], x, y, width);
            }
        }
        // return details about the paragraph.
        y += lineSpacing * fontSize;
        return {
            nextLine : y,
            fontSize : fontSize,
            lineHeight : lineSpacing * fontSize,
        };    
    }    
    // define fill
    var fillParagraphText = function(text, x, y, width, settings){
        justifiedTextSettings(settings);
        settings = {
            minSpaceSize : minSpaceSize,
            maxSpaceSize : maxSpaceSize,
        };        
        return justifiedPar(this, text, x, y, width, settings);
    }    
    // define stroke
    var strokeParagraphText = function(text, x, y, width, settings){
        justifiedTextSettings(settings);
        settings = {
            minSpaceSize : minSpaceSize,
            maxSpaceSize : maxSpaceSize,
        };
        return justifiedPar(this, text, x, y, width, settings,true);
    }    
    CanvasRenderingContext2D.prototype.fillParaText = fillParagraphText;
    CanvasRenderingContext2D.prototype.strokeParaText = strokeParagraphText;

})();


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
// let sideMargin = 20;
// canvas.width = 500;
// canvas.height = 700;
// let w = canvas.width;
// let h = canvas.height;
// ctx.clearRect(0, 0, w, h);
// ctx.font = "30px arial";
// ctx.textAlign = "center";
// ctx.fillText("Justified Paragraph Examples.", canvas.width/2, 60);
// ctx.font = "20px arial";
// ctx.textAlign = "left";
// // set para settings 
// let setting = {
//     maxSpaceSize : 6,
//     minSpaceSize : 0.5,
//     lineSpacing : 1.2,
//     compact : true, 
// } 


let para = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ducimus dicta fugit ipsam quae maxime quis temporibus culpa id, natus ad adipisci hic obcaecati atque, reiciendis dignissimos, doloremque veritatis sunt? Nostrum maiores delectus ducimus ipsum deleniti et dolorem nesciunt sunt.';
ctx.font = "25px arial";
ctx.textAlign = "center";
var left = 10;
var center = canvas.width / 2;
var width = canvas.width-left*2; 
var y = 20; var size = 16; 
var i = 0; 
ctx.fillText("Justified paragraph examples.",center,y); 
y+= 30; 
ctx.font = "14px arial"; 
ctx.textAlign = "left";
// set para settings 
var setting = {    
    maxSpaceSize : 6,
    minSpaceSize : 0.5,
    lineSpacing : 1.2,
    compact : true, 
} 
// Show the left and right bounds. 
ctx.strokeStyle = "red"; 
ctx.beginPath(); 
ctx.moveTo(left,y - size * 2); 
ctx.lineTo(left, y + size * 15); 
ctx.moveTo(canvas.width - left,y - size * 2); 
ctx.lineTo(canvas.width - left, y + size * 15); 
ctx.stroke(); 
ctx.textAlign = "left"; 
ctx.fillStyle = "black";
// Draw paragraph 
var line = ctx.fillParaText(para, left, y, width, setting);  
// settings is remembered    
// Next paragraph 
y = line.nextLine + line.lineHeight; 
setting.compact = false; 
ctx.fillParaText(para, left, y, width, setting);

// ctx.fillJustifyText('Lorem ipsum, dolor sit amet cons.', sideMargin, 120, w - 2*sideMargin)
// ctx.strokeJustifyText('Lorem ipsum, dolor sit amet.', sideMargin, 180, w - 2*sideMargin)
// let measuredText = ctx.measureJustifiedText('Lorem ipsum, dolor sit amet.', w - 2*sideMargin);
ctx.fillParaText(Para, sideMargin, 120, w - 2*sideMargin, setting)


ctx.fillParaText(Para, sideMargin, 300, w - 2*sideMargin, setting)

console.log('Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ab voluptatem aspernatur ducimus assumenda placeat, sunt eum velit quod quam.');

