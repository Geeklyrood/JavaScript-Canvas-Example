function init() {
  
  canvas = document.querySelector('.fireflies');
  ctx = canvas.getContext('2d')
  
  // Initialize variables
  fireflies = [];
  numFlies = 250;
  angleX = 0;
  angleY = 0;
  range = 1.2;
  xSpead = .7;
  ySpeed = .1;
  fps = 15;
  
  // Create a batch of Firefly particle objects and add each new firefly
  // object to the fireflies array
  for (var i = 0; i < numFlies; i++) {
    
    xVelocity = randRange(-4, 2); 
    yVelocity = randRange(-4, 2); 
    
    // We don't ever want our velocity values to be near 0
    if (xVelocity < 1 && xVelocity > -1) {
      xVelocity = -1;
    }
    
    if (yVelocity < 1 && yVelocity > -1) {
      yVelocity = -1;
    }
    
    // Create a new Firefly object and add it to the end of the fireflies
    // array for later use
    
    fireflies.push(new Firefly(10, canvas.height - 10, 10, canvas.width - 10, xVelocity, yVelocity));
    
  }
  
}

// Constructor function for hte Firefly "class"
function Firefly(topEdge, bottomEdge, leftEdge, rightEdge, xVel, yVel) {
  
  
  
}

function randRange(min, max) {
  
  return = Math.random() * (max - min) + min;
  
}