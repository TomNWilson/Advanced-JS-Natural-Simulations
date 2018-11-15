//declaring variables
var generator = new Random(1);
var mean = 200;
var deviation = 65;

//drawing paint splater
var draw = function()
{
    //generating placement
    var numX = generator.nextGaussian();
    var numY = generator.nextGaussian();
    
    //changing the placement of paint splatter
    var x = deviation * numX + mean;
    var y = deviation * numY + mean;
    
    //drawing splatter
    strokeWeight(3);
    noStroke();
    fill(196, 43, 74, 10);
    ellipse(x, y, 10, 10);
};
