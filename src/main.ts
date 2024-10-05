import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Santa's Workshop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks: number = 0;
let growth_rate: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Elf",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "Elves are the backbone of Santa's Workshop.",
  },
  {
    name: "Reindeer",
    cost: 100,
    rate: 2.0,
    count: 0,
    description: "Reindeer are the fastest way to deliver gifts.",
  },
  {
    name: "Sleigh",
    cost: 1000,
    rate: 50,
    count: 0,
    description: "A sleigh can carry a lot of gifts.",
  },
  {
    name: "Candy Cane Conveyor",
    cost: 10000,
    rate: 1500,
    count: 0,
    description:
      "Santa installs a candy cane-themed conveyor belt system to speed up packaging",
  },
  {
    name: "Christmas Every Day",
    cost: 100000,
    rate: 5000,
    count: 0,
    description:
      "Santa uses his magic to make every day Christmas making the demand for gifts skyrocket",
  },
];

const button = document.createElement("button");
button.innerHTML = "🎁";
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

const upgradeButtons = availableItems.map((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${upgrade.name} (${upgrade.cost} Gifts)`;
  upgradeButton.disabled = true;
  upgradeButton.title = upgrade.description;
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
  counter.innerHTML = `${num_clicks.toFixed(2)} Gifts`;
}

function updateGrowthRateDisplay() {
  growthRateDisplay.innerHTML =
    `Growth Rate: ${growth_rate.toFixed(2)} Gifts/sec<br>` +
    availableItems
      .map((upgrade) => `${upgrade.name}: ${upgrade.count}`)
      .join("<br>");
}

function updateUpgradeButtons() {
  upgradeButtons.forEach((button, index) => {
    button.disabled = num_clicks < availableItems[index].cost;
    button.innerHTML = `Buy ${availableItems[index].name} (${availableItems[index].cost.toFixed(2)} Gifts)`;
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
