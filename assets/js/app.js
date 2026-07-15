class Player {
  constructor(id, name, avatar, wins, loses) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.wins = wins;
    this.loses = loses;
  }
}

let player;
let title = "Not Fight Club";

// create container
const body = document.getElementsByTagName("body")[0];
const main = body.appendChild(document.createElement("main"));
main.classList.add("main");
const mainContainer = main.appendChild(document.createElement("div"));
mainContainer.classList.add("container");

registerCheck();

// check registration
function registerCheck() {
  let keys = Object.keys(localStorage);
  for (let key of keys) {
    let value = localStorage.getItem(key);
    const keyHasNumber = /\d/.test(key);
    if (keyHasNumber === true) {
      player = JSON.parse(localStorage.getItem(key));
    }
  }
  if (player === undefined) {
    registerForm();
  } else {
    home();
  }
}

// registration form
function registerForm() {
  document.title = title + " - Registration";
  let registerContaner = mainContainer.appendChild(document.createElement("div"));
  registerContaner.classList.add("register-container");

  element = registerContaner.appendChild(document.createElement("h1"));
  element = element.appendChild(document.createTextNode("Create Your Character"));

  element = registerContaner.appendChild(document.createElement("div"));
  element.classList.add("register-caption");
  element = element.appendChild(document.createTextNode("Character Name"));

  element = registerContaner.appendChild(document.createElement("input"));
  element.addEventListener("input", (e) => {
    if (e.target.value.trim() !== "") {
      document.querySelector(".register-button").removeAttribute("disabled", "disabled");
    } else {
      document.querySelector(".register-button").setAttribute("disabled", "disabled");
    }
  });
  element.classList.add("register-input");
  element.setAttribute("type", "text");
  element.setAttribute("id", "registerName");

  element = registerContaner.appendChild(document.createElement("button"));
  element.addEventListener("click", () => {
    register();
  });
  element.classList.add("register-button");
  element.setAttribute("type", "button");
  element.setAttribute("disabled", "disabled");
  element = element.appendChild(document.createTextNode("Create Character"));
}

// registration
function register() {
  let playerName = document.getElementById("registerName").value.trim();
  let playerId = Math.floor(Math.random() * 10000);
  const player = new Player(playerId, playerName, "default", 0, 0);
  localStorage[playerId] = JSON.stringify(player);
  mainContainer.replaceChildren();
  registerCheck();
}

// home
function home() {
  document.title = title + " - Home";
  console.log("id=", player.id, "name=", player.name);
}
