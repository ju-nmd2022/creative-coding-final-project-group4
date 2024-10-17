//This code (and the whole structure) was created with Garrit's code, chatGPT and our own adjustments
const p5container = document.getElementById("p5container");
let experiments = [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    experiments = data;
    if (experiments.length > 0) {
      fetchExperiment();
    }
  })
  .catch((error) => console.error("Error fetching experiments:", error));

function fetchExperiment() {
  const randomIndex = Math.floor(Math.random() * experiments.length);
  const currentExperiment = experiments[randomIndex]; // random file
  goToExperiment(currentExperiment);

  // random interval
  const randomInterval = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
  setTimeout(fetchExperiment, randomInterval);
}

function goToExperiment(experiment) {
  if (!experiment) {
    return;
  }
  p5container.innerHTML = "";

  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  const bodyElement = document.createElement("div");

  const p5script = document.createElement("script");
  p5script.type = "text/javascript";
  p5script.src = "assets/p5.min.js";
  p5script.defer = true;
  bodyElement.appendChild(p5script);

  const toneScript = document.createElement("script");
  toneScript.type = "text/javascript";
  toneScript.src = "https://unpkg.com/tone";
  toneScript.defer = true;
  bodyElement.appendChild(toneScript);

  const codeScript = document.createElement("script");
  codeScript.type = "text/javascript";
  codeScript.src = experiment.file;
  codeScript.defer = true;
  bodyElement.appendChild(codeScript);

  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "assets/iframe.css";
  bodyElement.appendChild(styleLink);

  iframe.srcdoc = bodyElement.innerHTML;
  p5container.appendChild(iframe);
}
