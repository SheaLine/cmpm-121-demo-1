import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Santa's Workshop";
document.title = gameName;

const StatsContainer = document.createElement("div");
StatsContainer.classList.add("stats-container");
app.append(StatsContainer);

const ButtonContainer = document.createElement("div");
ButtonContainer.classList.add("button-container");
app.append(ButtonContainer);

const UpgradesContainer = document.createElement("div");
UpgradesContainer.classList.add("upgrades-container");
app.append(UpgradesContainer);

const statsHeader = document.createElement("h1");
statsHeader.innerHTML = "Stats";
StatsContainer.append(statsHeader);

const header = document.createElement("h1");
header.innerHTML = gameName;
ButtonContainer.append(header);

const upgradesHeader = document.createElement("h1");
upgradesHeader.innerHTML = "Upgrades";
UpgradesContainer.append(upgradesHeader);

class GameState {
  private _numClicks: number = 0;
  private _growthRate: number = 0;

  get numClicks(): number {
    return this._numClicks;
  }

  set numClicks(value: number) {
    this._numClicks = value;
    subject.notifyObservers();
  }

  get growthRate(): number {
    return this._growthRate;
  }

  set growthRate(value: number) {
    this._growthRate = value;
    subject.notifyObservers();
  }
}

const gameState = new GameState();

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

interface Observer {
  update(): void;
}

class Subject {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update());
  }
}

const subject = new Subject();

class CounterDisplay implements Observer {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    ButtonContainer.append(this.element);
    subject.addObserver(this);
  }

  update() {
    this.element.innerHTML = `${gameState.numClicks.toFixed(2)} Gifts`;
  }
}

class GrowthRateDisplay implements Observer {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    StatsContainer.append(this.element);
    subject.addObserver(this);
  }

  update() {
    this.element.innerHTML =
      `Growth Rate:<br>${gameState.growthRate.toFixed(2)} Gifts/sec<br><br>` +
      availableItems
        .map((upgrade) => `${upgrade.name}: ${upgrade.count}`)
        .join("<br>");
  }
}

const button = document.createElement("button");
button.innerHTML = "🎁";
button.onclick = () => {
  gameState.numClicks++;
  subject.notifyObservers();
};
ButtonContainer.append(button);

class UpgradeButton implements Observer {
  private button: HTMLButtonElement;
  private upgrade: Item;
  private cost_multiplier: number = 1.15;

  constructor(upgrade: Item) {
    this.upgrade = upgrade;
    this.button = document.createElement("button");
    this.button.innerHTML = `Buy ${upgrade.name} (${upgrade.cost} Gifts)`;
    this.button.disabled = true;
    this.button.title = upgrade.description;
    this.button.onclick = () => {
      if (gameState.numClicks >= upgrade.cost) {
        gameState.numClicks -= upgrade.cost;
        gameState.growthRate += upgrade.rate;
        upgrade.count++;
        upgrade.cost *= this.cost_multiplier;
        subject.notifyObservers();
      }
    };
    UpgradesContainer.append(this.button);
    subject.addObserver(this);
  }

  update() {
    this.button.disabled = gameState.numClicks < this.upgrade.cost;
    this.button.innerHTML = `Buy ${this.upgrade.name} (${this.upgrade.cost.toFixed(2)} Gifts)`;
  }
}

new CounterDisplay();
new GrowthRateDisplay();
availableItems.map((item) => new UpgradeButton(item));

let lastTime: number = performance.now();
function animate(time: number) {
  const elapsed = time - lastTime;
  lastTime = time;

  gameState.numClicks += (elapsed / 1000) * gameState.growthRate;
  subject.notifyObservers();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
