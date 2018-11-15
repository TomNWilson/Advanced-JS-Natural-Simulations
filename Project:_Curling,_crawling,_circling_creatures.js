//function to set up plants, plants sway in wind according to sine function
var Plant = function(amplitude, xPos, height) {
    //setting angle, amplitude, period, and colour
    this.startAngle = 0;
    this.amplitude = amplitude;
    this.period = 30;
    this.color = color(137, 194, 52);
    //calculating angle velocity
    this.angleVel = (TWO_PI / this.period) * 5;
    //setting position and height
    this.xPos = xPos;
    this.height = height;
};

//updating angle
Plant.prototype.update = function() {
    this.startAngle += TWO_PI / this.period;
};

//drawing plant
Plant.prototype.draw = function() {
    //setting angle
    var angle = this.startAngle;
    //setting colour
    fill(this.color);
    //for loop for every y value
    for (var y = width; y >= this.height; y--){
        //calculating x position
        var x = this.amplitude * sin(angle);
        //drawing stem
        ellipse(x + this.xPos, y, 10, 15);
        //increasing angle
        angle += this.angleVel;
    }
    var x;
    //drawing leaf
    image(getImage("avatars/leaf-red"),x + this.xPos - 20, this.height - 40, 50, 50);
};

//setting up plant instances
var plant = new Plant(30, 200, 310);
var plant2 = new Plant(25, 300, 351);
var plant3 = new Plant(40, 117, 336);
var plant4 = new Plant(30, 43, 292);

//setting up boy function, boys are repulsed by big boys
var Boy = function() {
    //setting random position
    this.position = new PVector(random(width), random(height));
    //setting veloctiy and acceleration to 0
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    
    //setting mass
    this.mass = 25;
    this.G = 1;
};

//calculating attraction and repulsion
Boy.prototype.calculateAttraction = function(p1, p2) {
    var force = PVector.sub(p1.position, p2.position);
    var distance = force.mag();
    distance = constrain(distance, 5, 25);  
    force.normalize();
    var strength = (this.G * p1.mass * p2.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

//checking if boys go over edges
Boy.prototype.checkEdges = function() {
    //reseting at left if goes off to right
    if (this.position.x > width) {
        this.position.x = 0;
    }
    //reseting at right if goes off to left
    else if (this.position.x < 0) {
        this.position.x = width;
    }
    //reseting at top if goes off to bottom
    if (this.position.y > height) {
        this.position.y = 0;
    }
    //reseting at bottom if goes off to top
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

//updating boy position
Boy.prototype.update = function() {
    //changing velocity and position
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //reseting acceleration
    this.acceleration.mult(0);
    //setting limit to veloctiy
    this.velocity.limit(5);
};

//appling repulsion to acceleration
Boy.prototype.applyForce = function(force) {
    var f = PVector.div(force,this.mass);
    this.acceleration.add(f);
    this.acceleration.mult(-1);
};

//displaying boys
Boy.prototype.display = function() {
    ellipseMode(CENTER);
    image(getImage("creatures/BabyWinston"), this.position.x, this.position.y, 20, 30);
};

//setting up big boys, big boys are attracted by boys
var bigBoy = function(b) {
    //setting big boy position to be near boy position
    this.position = new PVector(b.position.x + random(-30, 30), b.position.y + random(-30, 30));
    //setting velocity and acceleration
    this.velocity = new PVector(1, 0);
    this.acceleration = new PVector(0, 0);
    //setting mass
    this.mass = 10;
};

//applying attraction to acceleration
bigBoy.prototype.applyForce = function(force) {
    var f = PVector.div(force,this.mass);
    this.acceleration.add(f);
};

//updating big boy position
bigBoy.prototype.update = function() {
    //changing veloctiy and position
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //reseting acceleration
    this.acceleration.mult(0);
    //limiting velocity
    this.velocity.limit(5);
};

//checking if big boys go over edges
bigBoy.prototype.checkEdges = function() {
    //reseting at left if goes off to right
    if (this.position.x > width) {
        this.position.x = 0;
    }
    //reseting at right if goes off to left
    else if (this.position.x < 0) {
        this.position.x = width;
    }
    //reseting at top if goes off to bottom
    if (this.position.y > height) {
        this.position.y = 0;
    }
    //reseting at bottom if goes off to top
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

//displaying big boys
bigBoy.prototype.display = function() {
    image(getImage("avatars/spunky-sam-red"),this.position.x, this.position.y, 45, 45);
};

//setting up arrays to hold boys and big boys
var bBoys = [];
var boys = [];

//boy array
for (var j = 0; j < 3; j++) {
    boys[j] = new Boy();
}

//big boy array
for (var i = 0; i < 3; i++) {
    bBoys[i] = new bigBoy(boys[i]);
}

//animating boys and big boys
draw = function() {
    //setting blue background
    background(110, 216, 255);
    //removing stroke
    noStroke();
    //drawing ground
    fill(47, 186, 47);
    rect(0, 350, width, height);
    //drawing sun
    fill(255, 234, 0);
    ellipse(50, 50, 50, 50);
    
    //updating and drawing plant 1
    plant.update();
    plant.draw();
    
    //updating and drawing plant 2
    plant2.update();
    plant2.draw();
    
    //updating and drawing plant 3
    plant3.update();
    plant3.draw();
    
    //updating and drawing plant 4
    plant4.update();
    plant4.draw();
    
    //animating boys
    for (var j = 0; j < 3; j++) {
        var boyForce = boys[j].calculateAttraction(bBoys[j], boys[j]);
        boys[j].applyForce(boyForce);
        
        boys[j].update();
        boys[j].checkEdges();
        boys[j].display();
    }
    
    //animating big boys
    for (var i = 0; i < 3; i++) {
        var bigForce = boys[i].calculateAttraction(boys[i], bBoys[i]);
        bBoys[i].applyForce(bigForce);

        bBoys[i].update();
        bBoys[i].checkEdges();
        bBoys[i].display();
    }
};
