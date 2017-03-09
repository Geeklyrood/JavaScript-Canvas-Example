function init() {
  
  canvas = document.querySelector('.fireflies');
  ctx = canvas.getContext('2d')
  
  // Initialize variables
  fireflies = [];
  numFlies = 500;
  angleX = 0;
  angleY = 0;
  range = 1.2;
  xSpeed = .7;
  ySpeed = .1;
  fps = 20;
  
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
  
  this.radius = randRange(.5, 1.5);
  
  this.blink = false;
  
  this.maxBlinkRate = 15;
  
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
      
      // Based on the blinkRate property reset the blink property
      if (fly.blinkRate >= fly.maxBlinkRate) {
        
        fly.blinkRate = 0;
        fly.blink = false;
        
      } else {
        
        fly.blinkRate++;
        
        if (fly.blinkRate >= 7) {
          
          fly.blink = true;
          
        }
        
      }
      
      // If the firefly is visible, draw it
      if (fly.blink) {
        
        ctx.arc(fly.x, fly.y, fly.radius, 0, Math.PI * 2, false);
        
        ctx.fill();
        
      }
      
      ctx.closePath();
      
      // Animate each firefly particle object
      //
      // Apply a velocity to change the objects x and y 
      // properties (position)
      fly.x += fly.xVelocity + Math.cos(angleX) * range;
      fly.y += fly.yVelocity + Math.sin(angleY) * range;
      
      // Alter the angle values
      angleX += xSpeed;
      angleY += ySpeed;
      
      // Collision detection at our boundries
      // Check the bottom edge
      if (fly.y >= fly.bottom + 25 && fly.yVelocity > 0) {
        
        // bottom edge
        fly.y = fly.bottom + 5;
        fly.yVelocity *= -1; // reverse direction
        
      } else if (fly.y <= fly.top - 25 && fly.yVelocity < 0) {
        
        // top edge
        fly.y = 5;
        fly.yVelocity *= -1;
        
      }
      
      if (fly.x >= fly.right + 25 && fly.xVelocity > 0) {
        
        // right edge
        fly.x = fly.right + 5;
        fly.xVelocity *= -1; // reverse direction
        
      } else if (fly.x <= fly.left - 25 && fly.xVelocity < 0) {
        
        // right edge
        fly.x = 5;
        fly.xVelocity *= -1;
        
      }
      
    });
    
    requestAnimationFrame(update);
    
  }, 1000 / fps);
  
}
