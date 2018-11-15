//setting angle to degrees
angleMode = "degrees";

//function to set up ship
var Ship = function() {
    //setting starting position, velocity, acceleration and angle
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0,0);
    this.acceleration = new PVector(0, 0);
    this.angle = 0;
};

//function to update ship position
Ship.prototype.update = function () {
    //calculating tan of angle
    var y = tan(this.angle);
    
    //if up arrow is pressed
    if (keyIsPressed && keyCode === UP) {
        
        //if angle is between 0 and 90 or 270 and 360
        if ((this.angle >= 0 && this.angle < 90) || (this.angle > 270 && this.angle <= 360)) {
            //adding to acceleration
            this.acceleration.add(0.1, y / 10);
        }
        
        //if angle is 90
        else if (this.angle === 90)
        {
            //adding to acceleration
            this.acceleration.add(0, 0.1);
        }
        
        //if angle is between 90 and 270
        else if (this.angle > 90 && this.angle < 270) {
            //adding to acceleration
            this.acceleration.sub(0.1, y / 10);
        }
        
        //if angle is 270
        else if (this.angle === 270)
        {
            //adding to acceleration
            this.acceleration.add(0, -0.1);
        }
    }
    //if down arrow is pressed
    else if (keyIsPressed && keyCode === DOWN) {
        
        //if angle is between 0 and 90 or 270 and 360
        if ((this.angle >= 0 && this.angle < 90) || (this.angle > 270 && this.angle <= 360)) {
            //decelerating the ship
            this.acceleration.sub(0.1, y / 10);
            //stops ship from going backwards
            if (this.velocity.x < 0) {
                this.velocity.set(0, 0);
            }
        }
        //if angle is 90
        else if (this.angle === 90)
        {
            //decelerating the ship
            this.acceleration.add(0, -0.1);
            //stops ship from going backwards
            if (this.velocity.y < 0) {
                this.velocity.set(0, 0);
            }
        }
        else if (this.angle > 90 && this.angle < 270) {
            //decelerating the ship
            this.acceleration.add(0.1, y / 10);
            //stops ship from going backwards
            if (this.velocity.x > 0) {
                this.velocity.set(0, 0);
            }
        }
        else if (this.angle === 270)
        {
            //decelerating the ship
            this.acceleration.add(0, 0.1);
            //stops ship from going backwards
            if (this.velocity.y > 0) {
                this.velocity.set(0, 0);
            }
        }
    }
    
    //adding acceleration to velocity
    this.velocity.add(this.acceleration);
    //setting a limit to velocity
    this.velocity.limit(this.topspeed);
    //adding velocity to position
    this.position.add(this.velocity);
    //reseting acceleration
    this.acceleration.mult(0);
    
    //constraining velocity
    this.velocity.x = constrain(this.velocity.x, -5, 5);
    this.velocity.y = constrain(this.velocity.y, -5, 5);
};

//function to turn left
Ship.prototype.turnLeft = function() {
    pushMatrix();
    //rotating velocity and acceleration
    this.velocity.rotate(-3);
    this.acceleration.rotate(-3);
    //changing angle
    this.angle -= 3;
    popMatrix();
    
    //if angle is less than 0, reset at 360
    if (this.angle < 0) {
        this.angle += 360;
    }
};

//function to turn right
Ship.prototype.turnRight = function() {
    pushMatrix();
    //rotating velocity and acceleration
    this.velocity.rotate(3);
    this.acceleration.rotate(3);
    //changing angle
    this.angle += 3;
    popMatrix();
    
    //if angle is less than 0, reset at 360
    if (this.angle > 360) {
        this.angle -= 360;
    }
};

//displaying ship
Ship.prototype.display = function () {
    //setting stroke
    strokeWeight(2);
    pushMatrix();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    
    //rotating ship with angle
    rotate(this.angle);
    //drawing thrusters
    fill(79, 79, 79);
    rect(-25, -10, 10, 15);
    rect(-25, 10, 10, 15);
    rect(50, 10, 10, 15);
    rect(50, -10, 10, 15);
    
    //drawing flames
    fill(255, 192, 31);
    //if up is pressed, both back flames appear
    if (keyIsPressed && keyCode === UP) {
        triangle(-30, -17, -30, -2, -50, -8.5);
        triangle(-30, 3, -30, 18, -50, 10.5);
    }
    //if left is pressed, bottom back flame appears
    else if (keyIsPressed && keyCode === LEFT) {
        triangle(-30, 3, -30, 18, -50, 10.5);
    }
    //if right is pressed, top back flame appears
    else if (keyIsPressed && keyCode === RIGHT) {
        triangle(-30, -17, -30, -2, -50, -8.5);
    }
    //if down is pressed, both front flames appear
    else if (keyIsPressed && keyCode === DOWN) {
        triangle(77, -12, 55, -2, 55, -17);
        triangle(77, 15, 55, 3, 55, 17.5);
    }
    
    //drawing body of ship
    fill(77, 82, 112);
    triangle(-20, -30, -20, 30, 100, 0);
    
    //drawing window
    fill(79, 79, 79);
    rect(21, 0, 11, 26);
    
    popMatrix();
};

//checks if ship goes over edges
Ship.prototype.checkEdges = function () {
    //if ship goes over to the right, resets at left
    if (this.position.x > width) {
        this.position.x = 0;
    }
    //if ship goes over to the left, resets at right
    else if (this.position.x < 0) {
        this.position.x = width;
    }
    
    //if ship goes over the bottom, resets at top
    if (this.position.y > height) {
        this.position.y = 0;
    }
    //if ship goes over the top, resets at bottom
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

//new ship instance
var ship = new Ship();

//calls left and right turn functions when left and right are pressed
var keyPressed = function() {
    if (keyIsPressed && keyCode === LEFT) {
        ship.turnLeft();
    } else if (keyIsPressed && keyCode === RIGHT) {
        ship.turnRight();
    }
};

//animating ship
draw = function() {
    background(20, 20, 20);
    ship.update();
    ship.checkEdges();
    ship.display();
    keyPressed();
};
