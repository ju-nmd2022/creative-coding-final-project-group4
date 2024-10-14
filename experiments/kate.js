//The code is a combination of the code from the lectures, chatGPT and myself

let numCols = 100;
let numRows = 100;
let gap;
let currentShape;
let shapes = [];
let changeTime;
let objectsSize = Math.random() * (6 - 3) + 3;
let wordLength;

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

function setup() {
  createCanvas(1500, 900);
  gap = Math.random() * (10 - 0) + 0;
  changeShape();

  meter = new Tone.Meter();
  mic = new Tone.UserMedia().connect(meter);

  analyser = new Tone.Analyser("fft", 2048);
  mic.connect(analyser);

  mic.open();
}

function changeShape() {
  changeTime = millis(); // Reset the timer
  currentShape = randomShape();
  initializeShapes(currentShape); //choose a shape with which the programme will start
}

function initializeShapes(shapeType) {
  shapes = [];
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x =
        (width - (objectsSize + gap) * numCols + gap) / 2 +
        col * (objectsSize + gap);
      let y =
        (height - (objectsSize + gap) * numRows + gap) / 2 +
        row * (objectsSize + gap);
      shapes.push(new shapeType(x, y, objectsSize));
    }
  }
}

class EllipseShape {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.offsetY = Math.random() * (15 - 1) + 1;
    this.offsetX = Math.random() * (15 - 1) + 1;
    this.changeInterval = Math.random() * (5000 - 2000) + 2000; // Time interval to change its direction
    this.lastChange = millis();
    this.speed = Math.random() * (1 - 1) + 1;
    this.colour = [255, 255, 255];
    this.collied = false;
  }

  draw() {
    noStroke();
    fill(this.colour);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x += this.offsetX;
    this.y += this.offsetY;

    // Change direction at random intervals
    if (millis() - this.lastChange > this.changeInterval) {
      this.lastChange = millis(); //start the time again
      this.offsetY *= -1; // go the other directions
      this.offsetX *= -1; //go the other directions
    }

    //  Go the other direction if you hit a set border
    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.offsetY *= -1;
      this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }

    // Go the other direction if you hit left or right
    if (this.x < this.size / 2 || this.x > width - this.size / 2) {
      this.offsetX *= -1;
      this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    }
  }
}

class SquareShape {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.offsetX = Math.random() * (5 - 1) + 1;
    this.changeInterval = Math.random() * (5000 - 2000) + 2000;
    this.lastChange = millis();
    this.speed = Math.random() * (1 - 1) + 1;
    this.colour = [255, 255, 255];
    this.collied = false;
  }

  draw() {
    noStroke();
    fill(this.colour);
    rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }

  update() {
    this.x += this.offsetX;
    this.x += this.speed;

    if (millis() - this.lastChange > this.changeInterval) {
      this.lastChange = millis();
    }

    if (this.x < this.size / 2 || this.x > width - this.size / 2) {
      this.offsetX *= -1;
    }
  }
}

class TriangleShape {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.offsetX = Math.random() * (10 - 1) + 1;
    this.offsetY = Math.random() * (20 - 1) + 1;
    this.changeInterval = Math.random() * (5000 - 2000) + 2000;
    this.lastChange = millis();
    this.speed = Math.random() * (2 - 1) + 1;
    this.colour = [255, 255, 255];
    this.collied = false;
  }

  draw() {
    noStroke();
    fill(this.colour);
    triangle(
      this.x,
      this.y - this.size / 2,
      this.x - this.size / 2,
      this.y + this.size / 2,
      this.x + this.size / 2,
      this.y + this.size / 2
    );
  }

  update() {
    this.x += this.offsetX;
    this.y += this.offsetY;
    this.x += this.speed;
    this.y += this.speed;

    if (millis() - this.lastChange > this.changeInterval) {
      this.lastChange = millis();
    }

    // Reverse direction if it hits the left/right or top/bottom
    if (this.x < this.size / 2 || this.x > width - this.size / 2) {
      this.offsetX *= Math.random() * (2 - 1) + 1;
    }
    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.offsetY *= Math.random() * (4 - 1) + 1;
    }
  }
}
class BlackObject {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.offsetX = Math.random() * (4 - 1) + 1;
    this.offsetY = Math.random() * (4 - 1) + 1;
    this.speed = 2;
  }

  draw() {
    noStroke();
    fill(0, 0, 0);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x += this.offsetX;
    this.y += this.offsetY;

    // Go the other direction if it hits the left/right or top/bottom
    if (this.x < this.size / 2 || this.x > width - this.size / 2) {
      this.offsetX *= -1;
      this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    }

    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.offsetY *= -1;
      this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }
  }
}

let blackObject = new BlackObject(450, 450, 400);

function randomShape() {
  const shapes = [EllipseShape, SquareShape, TriangleShape];
  return random(shapes);
}

//check volume
function meterRandom() {
  const level = meter.getValue();

  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  const wordLength = randomWord.length;

  const operations = ["+", "-", "*", "/"];
  const randomOperation =
    operations[Math.floor(Math.random() * operations.length)];

  let result;

  switch (randomOperation) {
    case "+":
      result = level + wordLength;
      break;
    case "-":
      result = level - wordLength;
      break;
    case "*":
      result = level * wordLength;
      break;
    case "/":
      result = wordLength !== 0 ? level / wordLength : level; //  !== 0 ? means to avoid division by zero
      break;
  }

  //the volume (here in code already the calculated result) effects speed of the shapes
  shapes.forEach((shape, index) => {
    // Create a unique speed for each shape based on the index
    const baseSpeed = map(result, -60, 0, 1, 10);
    shape.speed = baseSpeed;
    // shape.speed = constrain(shape.speed, 1, 200); // make sure that the speed isnt too big - range of 1-90
  });
}

//works with the frequency
function analyserRandom() {
  const frequencyValues = analyser.getValue();

  // Calculates the average frequency
  const averageFrequency =
    frequencyValues.reduce((a, b) => a + b, 0) / frequencyValues.length;

  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  wordLength = randomWord.length;

  const operations = ["+", "-", "*", "/"];
  const randomOperation =
    operations[Math.floor(Math.random() * operations.length)];

  let result;

  switch (randomOperation) {
    case "+":
      result = averageFrequency + wordLength;
      break;
    case "-":
      result = averageFrequency - wordLength;
      break;
    case "*":
      result = averageFrequency * wordLength;
      break;
    case "/":
      result =
        wordLength !== 0 ? averageFrequency / wordLength : averageFrequency;
      break;
    default:
      result = averageFrequency; // this is here for a case of error
  }

  // frequency efect the size of the shapes
  // shapes.forEach((shape, index) => {
  //   // Calculate a unique size for each shape based on the result
  //   const baseSize = map(result, -100, 1000, 10, 100); // Map result to a size range
  //   shape.size = baseSize + (index % 5) * 5; // Modify size for uniqueness
  //   shape.size = constrain(shape.size, 2, 3); // Constrain size to a reasonable range
  // });

  shapes.forEach((shape) => {
    const mappedSize = map(result, -100, 1000, 10, 100);
    shape.size = mappedSize;
    shape.size = constrain(mappedSize, 5, 12); // Range not to make the user go super dizzy - 5-12
  });
}
function draw() {
  background(0, 0, 0);
  blackObject.update();
  blackObject.draw();

  meterRandom();
  analyserRandom();

  if (currentShape) {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let shape = shapes[row * numCols + col];
        shape.update();
        shape.draw();

        // Collision detection between black object and each shape
        let distance = dist(blackObject.x, blackObject.y, shape.x, shape.y);
        if (
          distance < blackObject.size / 2 + shape.size / 2 &&
          !shape.collided
        ) {
          // if collision, edit speed, colour, direction
          if (shape instanceof EllipseShape) {
            shape.offsetY *= -1;
            shape.speed *= 0.5;
            shape.colour = [190, 190, 255];
          } else if (shape instanceof SquareShape) {
            shape.offsetX *= -1;
            shape.speed *= 0.5;
            shape.colour = [255, 190, 255];
          } else if (shape instanceof TriangleShape) {
            shape.offsetX *= -1;
            shape.offsetY *= -1;
            shape.speed *= 0.5;
            shape.colour = [255, 140, 255];
          }
          shape.collided = true;
        }
      }
    }
  }

  if (millis() - changeTime > Math.random() * (5000 - 8000) + 5000) {
    changeShape();
  }
}

//maybe generate more of black objects? - edit it with the voice?
