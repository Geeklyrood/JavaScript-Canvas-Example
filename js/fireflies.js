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
  
  // Get the firefly animation started using a timer to kick off our 
  // heartbeat (loop). Have it run repeatedly framerate times per 
  // second until the user leaves the page
  requestAnimationFrame(update);
  
}

// Constructor function for hte Firefly "class"
function Firefly(topEdge, bottomEdge, leftEdge, rightEdge, xVel, yVel) {
  
  // Save the passed-in parameter values in properties of our object
  // for later access
  this.top = topEdge;
  this.bottom = bottomEdge;
  this.left = leftEdge;
  this.right = rightEdge;
  this.xVelocity = xVel;
  this.yVelocity = yVel;
  
  // Initial position of the Firefly object
  this.x = Math.random() * canvas.width / 2;
  this.y = Math.random() * canvas.height;
  
  this.alpha = randRange(.2, .9);
  
  this.color = 'rgba(153, 255, 51, ' + this.alpha + ')';
  
  this.radius = randRange(2.5, 4.5);
  
  this.blink = true;
  
  this.blinkRate = Math.floor(randRange(0, this.maxBlinkRate));
  
}

function randRange(min, max) {
  
  return Math.random() * (max - min) + min;
  
}

// Heartbeat function (animation loop)
// Draw and andimate the Firefly particle objects on our canvas
function update() {
  
  // Use a hack using setTimeout() to reset the framerate
  setTimeout(function() {
    
    // Clear the canvas so it can be redrawn (refreshed)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the Firefly particles that are in our fireflies
    // array on the canvas.
    fireflies.forEach(function(fly, index) {
      
      ctx.beginPath();
      
      ctx.fillStyle = fly.color;
      
      // If the firefly is visible, draw it
      if (fly.blink = true) {
        
        ctx.arc(fly.x, fly.y, fly.radius, 0, Math.PI * 2, false);
        
        ctx.fill();
        
      }
      
      ctx.closePath();
      
    });
    
    requestAnimationFrame(update);
    
  }, 1000 / fps);
  
}
