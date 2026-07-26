// Avatars
const Avatars = ["default", "hero-01", "hero-02", "hero-03", "hero-04", "hero-05"];

// Player
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

// menu
function menu() {
  mainContainer.replaceChildren();

  const modalWrappper = mainContainer.appendChild(document.createElement("div"));
  modalWrappper.classList.add("modal-wrapper");
  const modalWindow = modalWrappper.appendChild(document.createElement("div"));
  modalWindow.classList.add("modal-window");

  let navContaner = mainContainer.appendChild(document.createElement("div"));
  navContaner.classList.add("nav-container");

  element = navContaner.appendChild(document.createElement("h5"));
  element.setAttribute("id", "pageName");

  let navItems = navContaner.appendChild(document.createElement("div"));
  navItems.classList.add("nav-items");

  element = navItems.appendChild(document.createElement("div"));
  element.addEventListener("click", () => {
    home();
  });
  element.appendChild(document.createTextNode("Home"));
  element.classList.add("nav-item");

  element = navItems.appendChild(document.createElement("div"));
  element.addEventListener("click", () => {
    character();
  });
  element.appendChild(document.createTextNode("Character"));
  element.classList.add("nav-item");

  element = navItems.appendChild(document.createElement("div"));
  element.addEventListener("click", () => {
    settings();
  });
  element.appendChild(document.createTextNode("Settings"));
  element.classList.add("nav-item");
}

// main
function home() {
  menu();
  document.title = title + " - Main";
  window.history.pushState({}, "", "./index.html");
  document.getElementById("pageName").textContent = "Main";

  let mainButtonContainer = mainContainer.appendChild(document.createElement("div"));
  mainButtonContainer.classList.add("main-container");

  element = mainButtonContainer.appendChild(document.createElement("button"));
  element.addEventListener("click", () => {
    battle();
  });
  element.classList.add("main-button");
  element.setAttribute("type", "button");
  element = element.appendChild(document.createTextNode("Fight!"));
}

// character
function character() {
  menu();
  document.getElementById("pageName").textContent = "Character";
  document.title = title + " - Character";
  window.history.pushState({}, "", "#character");

  const modalWrapper = document.querySelector(".modal-wrapper");
  const modalWindow = document.querySelector(".modal-window");
  const modalButton = document.querySelector(".modal-button");

  let avatarSrc = "../assets/images/" + player.avatar + ".png";

  let characterContainer = mainContainer.appendChild(document.createElement("div"));
  characterContainer.classList.add("character-container");

  //characterAvatar = characterContainer.appendChild(document.createElement("div"));
  characterAvatarButton = characterContainer.appendChild(document.createElement("div"));
  characterAvatarButton.classList.add("character-edit-button");
  characterAvatarButton.appendChild(document.createTextNode("Edit"));
  characterAvatar = characterContainer.appendChild(document.createElement("img"));
  characterAvatar.addEventListener("mouseenter", () => {
    characterAvatarButton.classList.add("edit-button__active");
  });
  characterAvatarButton.addEventListener("mouseenter", () => {
    characterAvatarButton.classList.add("edit-button__active");
  });
  characterAvatar.addEventListener("mouseleave", () => {
    characterAvatarButton.classList.remove("edit-button__active");
  });
  characterAvatarButton.addEventListener("click", () => {
    characterAvatarButton.classList.remove("edit-button__active");
    characterAvatarEdit();
  });
  characterAvatar.setAttribute("src", avatarSrc);

  // change avatar
  function characterAvatarEdit() {
    modalWrapper.style.display = "block";
    modalWindow.style.display = "block";
    modalWindow.classList.toggle("modal__active");

    // modal close button
    let modalButtonBox = modalWindow.appendChild(document.createElement("div"));
    modalButtonBox.classList.add("modal-button-container");
    modalButtonBox = modalButtonBox.appendChild(document.createElement("div"));
    modalButtonBox.classList.add("modal-button");
    let modalButtonLine = modalButtonBox.appendChild(document.createElement("span"));
    modalButtonLine.classList.add("modal-line", "modal-line-top");
    modalButtonLine = modalButtonBox.appendChild(document.createElement("span"));
    modalButtonLine.classList.add("modal-line", "modal-line-bottom");

    modalButtonBox.addEventListener("click", function (event) {
      modalWrapper.style.display = "none";
      modalWindow.style.display = "none";
      modalWindow.replaceChildren();
      modalWindow.classList.remove("modal__active");
    });

    // modal avatar container
    modal = modalWindow.appendChild(document.createElement("div"));
    modal.classList.add("modal-container");
    element = modal.appendChild(document.createElement("h5"));
    element.classList.add("avatar-caption");
    element.appendChild(document.createTextNode("Change avatar"));
    let avatarContainer = modal.appendChild(document.createElement("div"));
    avatarContainer.classList.add("avatar-container");
    for (const avatar of Avatars) {
      avatarSrc = "../assets/images/" + avatar + ".png";
      element = avatarContainer.appendChild(document.createElement("div"));
      avatarContainer.classList.add("avatar-item");
      avatarImmage = element.appendChild(document.createElement("img"));
      avatarImmage.setAttribute("src", avatarSrc);
      avatarImmage.classList.add("avatar-image");
      avatarImmage.addEventListener("click", function (event) {
        console.log("avatar selected", avatar);
        player.avatar = avatar;
        localStorage[player.id] = JSON.stringify(player);
        characterContainer.replaceChildren();
        character();
      });
    }
  }

  let characterStat = characterContainer.appendChild(document.createElement("div"));
  characterStat.classList.add("character-stat");

  element = characterStat.appendChild(document.createElement("div"));
  element.appendChild(document.createTextNode(player.name));
  element.classList.add("character-name");

  element = characterStat.appendChild(document.createElement("div"));
  element.classList.add("character-wins");
  element.appendChild(document.createTextNode("Wins: " + player.wins));

  element = characterStat.appendChild(document.createElement("div"));
  element.classList.add("character-loses");
  element.appendChild(document.createTextNode("Loses: " + player.loses));
}

// settings
function settings() {
  menu();
  document.title = title + " - Settings";
  window.history.pushState({}, "", "#settings");
  document.getElementById("pageName").textContent = "Settings";

  // refresh data
  player = JSON.parse(localStorage.getItem(player.id));

  let settingsContainer = mainContainer.appendChild(document.createElement("div"));
  settingsContainer.classList.add("settings-container");

  element = settingsContainer.appendChild(document.createElement("div"));
  element.appendChild(document.createTextNode("Player Name:"));

  element = settingsContainer.appendChild(document.createElement("div"));
  element.appendChild(document.createTextNode(player.name));

  element = settingsContainer.appendChild(document.createElement("button"));
  element.addEventListener("click", () => {
    settingsEdit();
  });
  element.classList.add("settings-button");
  element.setAttribute("type", "button");
  element = element.appendChild(document.createTextNode("edit"));

  // settings edit
  function settingsEdit() {
    settingsContainer.replaceChildren();

    element = settingsContainer.appendChild(document.createElement("div"));
    element.appendChild(document.createTextNode("Player Name:"));

    element = settingsContainer.appendChild(document.createElement("div"));
    element = element.appendChild(document.createElement("input"));
    element.setAttribute("value", player.name);
    element.addEventListener("input", (e) => {
      if (e.target.value.trim() !== "") {
        document.querySelector(".settings-button").removeAttribute("disabled", "disabled");
      } else {
        document.querySelector(".settings-button").setAttribute("disabled", "disabled");
      }
    });
    element.classList.add("settings-input");
    element.setAttribute("type", "text");
    element.setAttribute("id", "settingsName");

    element = settingsContainer.appendChild(document.createElement("button"));
    element.addEventListener("click", () => {
      settingsSave(document.getElementById("settingsName").value.trim());
    });
    element.classList.add("settings-button");
    element.setAttribute("type", "button");
    element = element.appendChild(document.createTextNode("save"));
  }

  // settings save
  function settingsSave(nameNew) {
    player.name = nameNew;
    localStorage[player.id] = JSON.stringify(player);
    settingsContainer.replaceChildren();
    settings();
  }
}

// battle
function battle() {
  menu();
  document.title = title + " - Battle";
  window.history.pushState({}, "", "#battle");
  document.getElementById("pageName").textContent = "Battle";
  console.log("id=", player.id, "name=", player.name);
}
