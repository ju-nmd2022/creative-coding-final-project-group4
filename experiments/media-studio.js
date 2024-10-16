let player;
let oscillator;
let analyser;
let mic;
let soundPlayers = []; // Array to hold multiple sound players
let lastSoundIndex = -1; // To track the last sound played
let windPlaying = false; // To track if any sound is playing

// Snowflake properties
let snowflakes = []; // Array to hold snowflakes
let baseSnowflakeCount = 200; // Initial number of snowflakes
let additionalSnowflakes = 50; // Number of snowflakes to add after each sound
let snowflakeCount = baseSnowflakeCount; // Current number of snowflakes
let snowflakeSpeed = 2; // Initial speed for snowflakes
let baseSpeed = 1; // Base speed for snowflakes when no sound is detected
let maxSpeed = 30; // Maximum speed for snowflakes when high sound is detected
let speedIncreaseDuration = 500; // Time (in milliseconds) to keep increased speed after sound is detected
let lastSoundTime = 0; // Timestamp of the last detected sound
let soundThreshold = 0.05; // Threshold for detecting sound input

// Camera properties
let cameras = []; // Array to hold camera objects

// Array of words for determining snowflake direction
const words = [
  "Media",
  "News",
  "Data",
  "Video",
  "Radio",
  "Print",
  "Source",
  "Report",
  "Social",
  "Online",
  "Content",
  "Digital",
  "Website",
  "Journal",
  "Audience",
  "Signal",
  "Stream",
  "Broadcast",
  "Coverage",
  "Platform",
  "Article",
  "Editor",
  "Graphic",
  "Podcast",
  "Channel",
  "Literacy",
  "Internet",
  "Bulletin",
  "Research",
  "Information",
  "Communication",
  "Press",
  "Review",
  "Analysis",
  "Journalism",
  "Accuracy",
  "Interviews",
  "Investigate",
  "Accessibility",
  "Subscription",
  "Engagement",
  "Algorithm",
  "Feedback",
  "Narrative",
  "Announcement",
  "Infographic",
  "Transparency",
  "Verification",
  "Filmmaking",
  "Multitasking",
  "Sensationalism",
  "Influence",
  "Disinformation",
  "Storytelling",
  "Broadcasting",
  "Publicity",
  "Outreach",
  "Investigative",
  "Correspondence",
  "Multimedia",
  "User-generated",
  "Photography",
  "User experience",
  "Dissemination",
  "Engagement metrics",
  "Community building",
  "Cross-platform",
  "Communication strategy",
  "Digital marketing",
  "News aggregation",
  "Media literacy",
  "Content creation",
  "Newsroom",
  "Information overload",
  "Clickbait",
  "Multimedia storytelling",
  "Ethical journalism",
  "Information ethics",
  "Fact-checking",
  "Editorial independence",
  "Public relations",
  "Crisis communication",
  "Information architecture",
  "Target audience",
  "Engagement rate",
  "Mobile journalism",
  "Search engine optimization",
  "User interface",
  "Content strategy",
  "Social media marketing",
  "Audience engagement",
  "Web analytics",
  "Interactive media",
  "Emerging technologies",
  "Communication channels",
  "Digital citizenship",
  "Reputation management",
  "Visual storytelling",
  "Story arc",
  "Targeted advertising",
];

// Initialize Tone.js objects
window.addEventListener("load", () => {
  // Tone.js microphone input
  mic = new Tone.UserMedia();

  // Load multiple soundtracks into the soundPlayers array
  let soundFiles = [
     "sounds/cow.mp3",
     "sounds/applause.mp3",
     "sounds/breaking-news.mp3",
     "sounds/cellphone-ringtone.mp3",
     "sounds/cinema-logo.mp3",
     "sounds/cinema-projector.mp3",
     "sounds/dial.mp3",
     "sounds/game-over.mp3",
     "sounds/game-start.mp3",
     "sounds/keyboard.mp3",
     "sounds/like.mp3",
     "sounds/mouse-click.mp3",
     "sounds/pac-man.mp3",
     "sounds/photo.mp3",
     "sounds/podcast.mp3",
     "sounds/printer.mp3",
     "sounds/radio-report.mp3",
     "sounds/sport-theme.mp3",
     "sounds/subscribe.mp3",
     "sounds/tv-sport.mp3",
     "assets/typewritter.mp3",
  ];
  soundFiles.forEach((file) => {
    let player = new Tone.Player(file).toDestination();
    soundPlayers.push(player); // Add each player to the array
  });

  analyser = new Tone.Analyser("waveform", 256); 
  mic.connect(analyser); 
});


window.addEventListener("click", async () => {
  await Tone.start(); 
  console.log("Audio context started");

  
  mic
    .open()
    .then(() => {
      console.log("Microphone is open");
    })
    .catch((e) => {
      console.error("Mic access denied", e);
    });
});

class Snowflake {
  constructor() {
    this.x = random(width); 
    this.y = random(-height, 0); // Start above the screen
    this.size = random(5, 10); 
    this.xVelocity = 0; 
    this.maxXVelocity = 5; 
    this.r = random(255); 
    this.g = random(255); 
    this.b = random(255); 
  }

  // Update the position of the snowflake
  update() {
    this.y += snowflakeSpeed; // Move downwards at the current snowflake speed

    // Apply the horizontal movement
    this.x += this.xVelocity;

    // Keep snowflakes within screen bounds horizontally
    if (this.x < 0 || this.x > width) {
      this.x = random(width); // Reset position if snowflake goes off screen
    }

    if (this.y > height) {
      this.y = random(-100, 0); // Reset position to the top when off-screen
      this.x = random(width); // Randomize horizontal position
    }
  }

  
  display() {
    noStroke(); 
    fill(this.r, this.g, this.b); 
    this.drawSnowflake(this.x, this.y, this.size); 
  }

  // Draw a circle (snowflake)
  drawSnowflake(x, y, size) {
    ellipse(x, y, size, size); 
  }
}


function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);

  // Create initial snowflakes
  for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push(new Snowflake());
  }

  // Create cameras
  let cameraCount = 10; // Number of cameras to draw
  for (let i = 0; i < cameraCount; i++) {
    cameras.push(new Camera());
  }
}


function draw() {
  background(0); 

  // Draw extended snowy ground
  fill(139, 69, 19);
  rect(0, height - 200, width, 200); 

  // Draw cameras
  for (let camera of cameras) {
    camera.display(); 
  }

  // Handle sound input and snowflakes
  if (analyser) {
    let waveform = analyser.getValue();

    let avgAmplitude = 0;
    for (let i = 0; i < waveform.length; i++) {
      avgAmplitude += abs(waveform[i]);
    }
    avgAmplitude /= waveform.length;

    if (avgAmplitude > soundThreshold) {
      snowflakeSpeed = map(avgAmplitude, 0, 1, baseSpeed, maxSpeed);
      lastSoundTime = millis();

      for (let i = 0; i < additionalSnowflakes; i++) {
        snowflakes.push(new Snowflake());
      }

      windPlaying = false;
    }

    if (millis() - lastSoundTime > speedIncreaseDuration) {
      snowflakeSpeed = baseSpeed;
      if (!windPlaying) {
        playRandomSound(avgAmplitude); // Pass the sound strength (avgAmplitude)
      }
    }
  }

  // Update and display snowflakes for snowfall effect
  for (let snowflake of snowflakes) {
    snowflake.update();
    snowflake.display();
  }
}


// Camera class (with two diagonal stands and black border)
class Camera {
  constructor() {
    this.x = random(width); 
    this.y = height - 300; 
    this.bodyWidth = random(50, 100); 
    this.bodyHeight = this.bodyWidth / 2; 
    this.lensSize = this.bodyHeight / 1.5; 
    this.legLength = 150; 
    this.legAngle = PI / 3; 

    // Adjust leg positions to be closer together
    this.legOffset = this.bodyWidth / 4; 
  }

  // Draw the camera with two diagonal stands
  display() {
    // Draw the camera body
    fill(105, 105, 105); 
    rect(this.x, this.y - this.bodyHeight, this.bodyWidth, this.bodyHeight); 

    // Draw the lens
    fill(0, 0, 255); 
    ellipse(
      this.x + this.bodyWidth / 2,
      this.y - this.bodyHeight / 2,
      this.lensSize,
      this.lensSize
    ); 

    // Draw the small yellow circle at the top right corner of the camera body
    fill(255, 255, 0); 
    const circleSize = 10; 
    const circleX = this.x + this.bodyWidth - circleSize / 2; 
    const circleY = this.y - this.bodyHeight + circleSize / 2; 
    ellipse(circleX, circleY, circleSize, circleSize); 

    // Draw the legs
    stroke(105, 105, 105);
    strokeWeight(5);

    // Draw two diagonal stands (as legs)
    let legX1 = this.x + this.legOffset; 
    let legX2 = this.x + this.bodyWidth - this.legOffset; 
    let legY = this.y; 

    // Draw the left diagonal leg
    line(
      legX1,
      legY,
      legX1 - cos(this.legAngle) * this.legLength,
      legY + sin(this.legAngle) * this.legLength
    );
    // Draw the right diagonal leg
    line(
      legX2,
      legY,
      legX2 + cos(this.legAngle) * this.legLength,
      legY + sin(this.legAngle) * this.legLength
    );

    // Draw the border around the camera body for a 3D look
    noFill();
    strokeWeight(2);
    stroke(0); 
    rect(this.x, this.y - this.bodyHeight, this.bodyWidth, this.bodyHeight); 
  }
}

// Function to randomly play a sound from the soundPlayers array
function playRandomSound(voiceStrength) {
  if (!windPlaying) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * soundPlayers.length); // Select a random sound
    } while (randomIndex === lastSoundIndex); // Ensure it's not the same as the last one

    soundPlayers[randomIndex].start(); // Start playing the selected sound
    lastSoundIndex = randomIndex; 
    windPlaying = true; // Set flag to true to prevent multiple starts

    // Select a random word and calculate direction based on its length
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let wordLength = randomWord.length;

    // Calculate direction (-1 for left, 1 for right) based on word length
    let direction = wordLength % 2 === 0 ? 1 : -1; // Even lengths go right, odd lengths go left

    // Log the chosen word, length, and direction for debugging
    console.log(
      `Word chosen: ${randomWord}, Length: ${wordLength}, Direction: ${
        direction > 0 ? "Right" : "Left"
      }`
    );

    // Apply the influence of random mathematical operation between word length and voice strength
    snowflakes.forEach((snowflake) => {
      let result = applyRandomOperation(wordLength, voiceStrength);

      // Use the result and direction to set the final velocity
      snowflake.xVelocity = direction * result;
    });
  }
}

// Function to apply a random mathematical operation
function applyRandomOperation(wordLength, voiceStrength) {
  let operations = ["add", "subtract", "multiply", "divide", "power"];
  let operation = random(operations); // Randomly select an operation

  let result;

  switch (operation) {
    case "add":
      result = wordLength + voiceStrength * 10;
      break;
    case "subtract":
      result = wordLength - voiceStrength * 10;
      break;
    case "multiply":
      result = wordLength * (voiceStrength * 10);
      break;
    case "divide":
      // Prevent division by zero by ensuring voiceStrength is not 0
      if (voiceStrength !== 0) {
        result = wordLength / (voiceStrength * 10);
      } else {
        result = wordLength; // Fallback to just word length if voice strength is 0
      }
      break;
    case "power":
      result = Math.pow(wordLength, voiceStrength); // Use exponentiation
      break;
    default:
      result = wordLength; // Default case if no operation matches (should not happen)
  }

  return result;
}
