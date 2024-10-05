import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shea's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks : number = 0;
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