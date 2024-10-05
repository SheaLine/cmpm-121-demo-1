import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shea's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks: number = 0;
let growth_rate: number = 0;

const button = document.createElement("button");
button.innerHTML = "🎅";
button.onclick = () => {
  num_clicks++;
  counter.innerHTML = `${num_clicks} Santas`;
};
app.append(button);

const counter = document.createElement("div");
counter.innerHTML = `${num_clicks} Santas`;
app.append(counter);

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Buy Elf (10 Santas)";
upgradeButton.disabled = true;
upgradeButton.onclick = () => {
  if (num_clicks >= 10) {
    num_clicks -= 10;
    growth_rate += 1;
    counter.innerHTML = `${num_clicks} Santas`;
    upgradeButton.disabled = num_clicks < 10;
  }
};
app.append(upgradeButton);

let lastTime: number = performance.now();
function animate(time: number) {
  const elapsed = time - lastTime;
  lastTime = time;

  num_clicks += (elapsed / 1000) * growth_rate;
  counter.innerHTML = `${num_clicks} Santas`;
  upgradeButton.disabled = num_clicks < 10;

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
