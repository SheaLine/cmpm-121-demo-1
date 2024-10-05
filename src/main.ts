import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shea's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks: number = 0;
let growth_rate: number = 0;

const upgrades = [
  { name: "A", cost: 10, rate: 0.1, count: 0 },
  { name: "B", cost: 100, rate: 2.0, count: 0 },
  { name: "C", cost: 1000, rate: 50, count: 0 },
];

const button = document.createElement("button");
button.innerHTML = "🎅";
button.onclick = () => {
  num_clicks++;
  updateCounter();
};
app.append(button);

const growthRateDisplay = document.createElement("div");
updateGrowthRateDisplay();
app.append(growthRateDisplay);

const counter = document.createElement("div");
updateCounter();
app.append(counter);

const upgradeButtons = upgrades.map((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${upgrade.name} (${upgrade.cost} Santas)`;
  upgradeButton.disabled = true;
  upgradeButton.onclick = () => {
    if (num_clicks >= upgrade.cost) {
      num_clicks -= upgrade.cost;
      growth_rate += upgrade.rate;
      upgrade.count++;
      upgrade.cost *= 1.15;
      updateCounter();
      updateGrowthRateDisplay();
      updateUpgradeButtons();
    }
  };
  app.append(upgradeButton);
  return upgradeButton;
});

function updateCounter() {
    counter.innerHTML = `${num_clicks.toFixed(2)} Santas`;
  }
  
  function updateGrowthRateDisplay() {
    growthRateDisplay.innerHTML = `Growth Rate: ${growth_rate.toFixed(2)} Santas/sec<br>` +
      upgrades.map(upgrade => `${upgrade.name}: ${upgrade.count}`).join("<br>");
  }
  
  function updateUpgradeButtons() {
    upgradeButtons.forEach((button, index) => {
      button.disabled = num_clicks < upgrades[index].cost;
      button.innerHTML = `Buy ${upgrades[index].name} (${upgrades[index].cost.toFixed(2)} Santas)`;
    });
  }

let lastTime: number = performance.now();
function animate(time: number) {
  const elapsed = time - lastTime;
  lastTime = time;

  num_clicks += (elapsed / 1000) * growth_rate;
    updateCounter();
    updateUpgradeButtons();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
