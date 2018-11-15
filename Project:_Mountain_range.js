//declaring variables
var c = [(color(199, 208, 219)), (color(171, 182, 196)), (color(116, 120, 125)), (color(87, 94, 102)), (color(68, 70, 71))];
var m = 400;
var n = 500;
var xOff = 0.0;

//blue background
background(163, 220, 255);

//drawing clouds using noise
for (var x = 0; x < 400; x++)
{
    var yOff = 0.0;
    for (var y = 0; y < 400; y++)
    {
        //using noise to determine transparency
        var cloud = map(noise(xOff, yOff), 0, 1, 0, 450);
        //white point with noise as transparency
        stroke(255, 255, 255, cloud);
        point(x, y);
        yOff += 0.01;
    }
    xOff += 0.01;
}

//drawing mountains
var drawRange = function()
{
    for (var t = 0; t < 0.01*width; t += 0.01) {
        var k = 0;
        //runs through loop to draw all 5 mountain ranges
        for (var i = 500; i >= 0; i-=100)
        {
            //using noise to make mountain range
            var n = noise(t + i);
            var y = map(n, 0, 1, 0, i);
        
            //drawing mountains in 5 different colours
            stroke(c[k]);
            rect(t*100, height-y, 1, y);
                
            k++;
        }
    }
};

//drawing birds
var drawBird = function()
{
    //declaring variables
    var k = map(noise(n), 0, 1, 200, 450);
    var h = map(noise(n + 500), 0, 1, 250, 500);
    
    //removing fill and making strokes black
    stroke(0, 0, 0);
    noFill();
    
    //drawing first bird
    arc(m, k, 50, 50, 220, 320);
    arc(m - 37, k, 50, 50, 220, 320);
    
    //drawing second bird
    arc(m + 50, h, 50, 50, 220, 320);
    arc(m + 13, h, 50, 50, 220, 320);
    
    //animating birds
    m-=3;
    n+=0.01;
    
    //reseting birds when they go off screen
    if (m < -200)
    {
        m = 600;
    }
};

//animating the birds
var draw = function()
{
    drawRange();
    drawBird();
};

