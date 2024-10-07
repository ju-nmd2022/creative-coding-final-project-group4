let marbles = [];
let gravity;
let mic, meter;
let pitch = 0;
let changeColor = false;
let nextColorChange = 0;

//List of random worrds for random selection
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

function setup() {
  createCanvas(1500, 900);

  //mic input setup
  mic = new Tone.UserMedia();
  meter = new Tone.Meter();

  mic
    .open()
    .then(() => {
      mic.connect(meter);
    })
    .catch((err) => {
      console.error("Mic error:", err);
    });

  //Create gravity that will affect the marbles
  gravity = createVector(0, 0.2);

  let randomWord = random(words);
  let letterCount = randomWord.length;

  for (let i = 0; i < 30; i++) {
    let size = map(letterCount, 3, 10, 5, 15); //size of the marbles based on the letter count
    marbles.push(new Marble(random(width), random(-150, 0), size));
  }

  //make the marbles continously fall
  setInterval(() => {
    let marble = new Marble(random(width), random(-150, 0), random(5, 8));
    marbles.push(marble);
  }, 1000);

  //A random timer is set between 1-20 seconds so the marbles will change color
  nextColorChange = millis() + random(1000, 20000);
}

function draw() {
  background(0);

  //Volume of the voice
  let level = meter.getValue();

  for (let marble of marbles) {
    marble.applyForce(gravity); //Marbles fill fall down smoothly
    marble.update(); //Marbles' position is updated
    marble.checkEdges(); //Marbles will fall to the bottom and stop
    marble.display();

    //Marbles will move based on the mic input
    if (level > -20) {
      let micForce = map(level, -50, 0, -10, 10);
      marble.applyForce(
        createVector(random(-micForce, micForce), random(-micForce, -micForce))
      );
    }

    let sizeAdjustment = map(level, -60, 0, -2, 2);
    marble.adjustSize(sizeAdjustment);
  }

  if (millis() > nextColorChange) {
    changeColor = !changeColor;
    nextColorChange = millis() + random(1000, 10000);
    console.log("Change Color", changeColor);
  }

  for (let marble of marbles) {
    if (changeColor) {
      marble.setColor(255, 0, 0);
    } else {
      marble.setColor(100, 150, 255);
    }
  }
}

class Marble {
  constructor(x, y, size) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, random(1, 3));
    this.acceleration = createVector(0, 0);
    this.size = size;
    this.color = color(100, 150, 255);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    if (this.position.y + this.size > height) {
      this.position.y = height - this.size;
      this.velocity.y *= -0.5;
    }
  }

  checkEdges() {
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -0.5;
    }
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -0.5;
    }
  }

  adjustSize(sizeChange) {
    this.size = constrain(this.size + sizeChange, 3, 20);
  }

  setColor(r, g, b) {
    this.color = color(r, g, b);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size * 2);
  }
}

//Some of the code was helped by ChatGpt and alternated
