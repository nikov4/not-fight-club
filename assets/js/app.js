// Avatars
const Avatars = ["default", "hero-01", "hero-02", "hero-03", "hero-04", "hero-05"];
const enemyAvatars = ["enemy-01", "enemy-02", "enemy-03", "enemy-04", "enemy-05"];
const enemyNames = ["Gorg", "Spike", "Wraith", "Fang", "Grim"];
const Zones = ["Head", "Neck", "Body", "Belly", "Legs"];

// Player
class Player {
  constructor(id, name, avatar, initialHp, currentHp, wins, loses, attack, defence1, defence2, enemy) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.initialHp = initialHp;
    this.currentHp = currentHp;
    this.wins = wins;
    this.loses = loses;
    this.attack = attack;
    this.defence1 = defence1;
    this.defence2 = defence2;
    this.enemy = enemy;
  }
}

// battle log
class Log {
  constructor(who, whom, where, damage, critical) {
    this.who = who;
    this.whom = whom;
    this.where = where;
    this.damage = damage;
    this.critical = critical;
  }
}

let player;
let enemy;
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
  player = JSON.parse(localStorage.getItem("player"));
  if (player === null || player === undefined) {
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
  // player
  let playerName = document.getElementById("registerName").value.trim();
  const playerId = "player";
  const player = new Player(playerId, playerName, "default", 150, 150, 0, 0, "", "", "", 0);
  localStorage[playerId] = JSON.stringify(player);
  // enemies
  let j = 0;
  for (const enemyAvatar of enemyAvatars) {
    const enemyId = Math.floor(Math.random() * 10000);
    const enemyHp = Math.floor(Math.random() * 100) + 100;
    const enemyAttack = Math.floor(Math.random() * 5);
    const enemyDefence1 = Math.floor(Math.random() * 5);
    const enemyDefence2 = getDefenceZone(enemyId, enemyDefence1);
    const enemy = new Player(enemyId, enemyNames[j], enemyAvatar, enemyHp, enemyHp, 0, 0, "", "", "");
    // const enemy = new Player(enemyId, enemyNames[j], enemyAvatar, enemyHp, enemyHp, 0, 0, enemyAttack, enemyDefence1, enemyDefence2);
    localStorage[enemyId] = JSON.stringify(enemy);
    j++;
  }
  mainContainer.replaceChildren();
  registerCheck();
}

// menu
function menu() {
  mainContainer.replaceChildren();

  const modalWrapper = mainContainer.appendChild(document.createElement("div"));
  modalWrapper.classList.add("modal-wrapper");
  const modalWindow = modalWrapper.appendChild(document.createElement("div"));
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

  let avatarSrc = "./assets/images/" + player.avatar + ".png";

  let characterContainer = mainContainer.appendChild(document.createElement("div"));
  characterContainer.classList.add("character-container");

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
    const modalWrapper = document.querySelector(".modal-wrapper");
    const modalWindow = document.querySelector(".modal-window");
    const modalButton = document.querySelector(".modal-button");
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
      avatarSrc = "./assets/images/" + avatar + ".png";
      element = avatarContainer.appendChild(document.createElement("div"));
      avatarContainer.classList.add("avatar-item");
      avatarImmage = element.appendChild(document.createElement("img"));
      avatarImmage.setAttribute("src", avatarSrc);
      avatarImmage.classList.add("avatar-image");
      avatarImmage.addEventListener("click", function (event) {
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

  // modal
  const modalWrapper = document.querySelector(".modal-wrapper");
  const modalWindow = document.querySelector(".modal-window");

  // modal close button
  let modalButtonBox = modalWindow.appendChild(document.createElement("div"));
  modalButtonBox.classList.add("modal-button-container");
  modalButtonBox = modalButtonBox.appendChild(document.createElement("div"));
  modalButtonBox.classList.add("modal-button");
  let modalButtonLine = modalButtonBox.appendChild(document.createElement("span"));
  modalButtonLine.classList.add("modal-line", "modal-line-top");
  modalButtonLine = modalButtonBox.appendChild(document.createElement("span"));
  modalButtonLine.classList.add("modal-line", "modal-line-bottom");

  // modal button
  modalButtonBox.addEventListener("click", function (event) {
    modalWrapper.style.display = "none";
    modalWindow.style.display = "none";
    modalWindow.replaceChildren();
    modalWindow.classList.remove("modal__active");
    mainContainer.replaceChildren();
    character();
  });

  // get random enemy
  if (player.enemy === 0) {
    const enemyNum = Math.floor(Math.random() * 5);
    let keys = Object.keys(localStorage);
    let j = 0;
    for (let key of keys) {
      let value = localStorage.getItem(key);
      const keyHasNumber = /\d/.test(key);
      if (keyHasNumber === true && j === enemyNum) {
        enemy = JSON.parse(localStorage.getItem(key));
      }
      j++;
    }
  } else {
    // continue fight
    enemy = JSON.parse(localStorage.getItem(player.enemy));
  }

  if (enemy !== undefined) {
    let battleContainer = mainContainer.appendChild(document.createElement("div"));
    battleContainer.classList.add("battle-container");
    let logContainer = mainContainer.appendChild(document.createElement("div"));
    logContainer.classList.add("log-container");

    // player
    let memberContainer = battleContainer.appendChild(document.createElement("div"));
    memberContainer.classList.add("battle-member-container");
    element = memberContainer.appendChild(document.createElement("div"));
    element.classList.add("battle-member-name");
    element.appendChild(document.createTextNode(player.name));
    element = memberContainer.appendChild(document.createElement("div"));
    let avatarSrc = "./assets/images/" + player.avatar + ".png";
    let battleAvatar = element.appendChild(document.createElement("img"));
    battleAvatar.setAttribute("src", avatarSrc);
    let memberHpContainer = memberContainer.appendChild(document.createElement("div"));
    memberHpContainer.classList.add("battle-hp-container");
    element = memberHpContainer.appendChild(document.createElement("div"));
    element.classList.add("battle-hp-line");
    element.setAttribute("id", "hpPlayerLine");
    element = memberContainer.appendChild(document.createElement("div"));
    element.classList.add("battle-hp-text");
    element.setAttribute("id", "hpPlayer");
    element.appendChild(document.createTextNode(`${player.currentHp} / ${player.initialHp}`));

    // attack parameters
    let parametersContainer = battleContainer.appendChild(document.createElement("div"));
    parametersContainer.classList.add("parameters-container");
    element = parametersContainer.appendChild(document.createElement("div"));
    element.appendChild(document.createTextNode("Please pick 1 Attack zone and 2 Defence zones"));
    let parametersZones = parametersContainer.appendChild(document.createElement("div"));
    parametersZones.classList.add("parameters-zones");

    // attack zones
    let j = 0;
    let selectZones = parametersZones.appendChild(document.createElement("div"));
    selectZones.appendChild(document.createTextNode("Attack Zones"));
    selectZones.classList.add("zones-column");
    for (let zone of Zones) {
      let element = selectZones.appendChild(document.createElement("div"));
      element.classList.add("select-zone");
      const selectInput = element.appendChild(document.createElement("input"));
      selectInput.setAttribute("type", "checkbox");
      selectInput.setAttribute("name", "attack");
      selectInput.setAttribute("data-attack", j);
      if (j === player.attack) {
        selectInput.setAttribute("checked", "");
      }
      selectInput.addEventListener("click", () => {
        battleCheck();
      });
      const selectLabel = element.appendChild(document.createElement("label"));
      selectLabel.appendChild(document.createTextNode(zone));
      j++;
    }

    // defence zones
    j = 0;
    selectZones = parametersZones.appendChild(document.createElement("div"));
    selectZones.appendChild(document.createTextNode("Defence Zones"));
    selectZones.classList.add("zones-column");
    for (let zone of Zones) {
      let element = selectZones.appendChild(document.createElement("div"));
      element.classList.add("select-zone");
      const selectInput = element.appendChild(document.createElement("input"));
      selectInput.setAttribute("type", "checkbox");
      selectInput.setAttribute("name", "defence");
      selectInput.setAttribute("data-defence", j);
      if (j === player.defence1 || j === player.defence2) {
        selectInput.setAttribute("checked", "");
      }
      selectInput.addEventListener("click", () => {
        battleCheck();
      });
      const selectLabel = element.appendChild(document.createElement("label"));
      selectLabel.appendChild(document.createTextNode(zone));
      j++;
    }

    // attack button
    element = parametersContainer.appendChild(document.createElement("div"));
    let btnElement = element.appendChild(document.createElement("button"));
    btnElement.addEventListener("click", () => {
      battleMove();
    });
    btnElement.classList.add("main-button");
    btnElement.setAttribute("type", "button");
    btnElement.appendChild(document.createTextNode("Attack!"));
    btnElement.setAttribute("disabled", "disabled");
    battleCheck();

    // battle check
    function battleCheck() {
      const zonesAttacks = document.querySelectorAll('input[name="attack"]:checked').length;
      const zonesDefences = document.querySelectorAll('input[name="defence"]:checked').length;
      if (zonesAttacks === 1 && zonesDefences === 2) {
        btnElement.removeAttribute("disabled", "disabled");
      } else {
        btnElement.setAttribute("disabled", "disabled");
      }
    }

    // fill hp line
    function fillHp(id) {
      if (id === "hpEnemy") {
        const hpSize = Math.floor((enemy.currentHp / enemy.initialHp) * 100);
        const hpEnemyLine = document.getElementById("hpEnemyLine");
        hpEnemyLine.style.width = hpSize + "%";
      } else {
        const hpSize = Math.floor((player.currentHp / player.initialHp) * 100);
        const hpPlayerLine = document.getElementById("hpPlayerLine");
        hpPlayerLine.style.width = hpSize + "%";
      }
    }

    // battle move
    let battleFinished = false;
    function battleMove() {
      player = JSON.parse(localStorage.getItem("player"));
      enemy = JSON.parse(localStorage.getItem(enemy.id));
      player.enemy = enemy.id;
      const zonesAttack = document.querySelectorAll('input[name="attack"]:checked');
      const zonesDefence = document.querySelectorAll('input[name="defence"]:checked');
      for (let zoneChecked of zonesAttack) {
        player.attack = Number(zoneChecked.dataset.attack);
      }
      let playerDefence = "";
      for (let zoneChecked of zonesDefence) {
        playerDefence = playerDefence + "," + zoneChecked.dataset.defence;
      }

      // save player zones
      const defences = playerDefence.split(",");
      player.defence1 = Number(defences[1]);
      player.defence2 = Number(defences[2]);
      localStorage[player.id] = JSON.stringify(player);

      // save enemy zones
      const enemyAttack = Math.floor(Math.random() * 5);
      const enemyDefence1 = Math.floor(Math.random() * 5);
      const enemyDefence2 = getDefenceZone(enemy.id, enemyDefence1);
      enemy.attack = enemyAttack;
      enemy.defence1 = enemyDefence1;
      enemy.defence2 = enemyDefence2;
      localStorage[enemy.id] = JSON.stringify(enemy);
      let log = JSON.parse(localStorage.getItem("log")) || [];
      let damage = 0;
      let initialHp = 0,
        currentHp = 0,
        hpSize = 0;

      // player attack
      if (player.attack === enemy.defence1 || player.attack === enemy.defence2) {
        // console.log(`${player.name} attacked ${enemy.name} to ${Zones[player.attack]} but ${enemy.name} priotect his ${Zones[player.attack]}`);
      } else {
        // console.log(`${player.name} attacked ${enemy.name} to ${Zones[player.attack]} and deal 10 damage`);
        damage = 10;
      }
      let logAdd = new Log(player.name, enemy.name, `${Zones[player.attack]}`, damage, "");
      log.push(logAdd);
      localStorage["log"] = JSON.stringify(log);
      let hpEnemy = document.getElementById("hpEnemy");
      initialHp = enemy.initialHp;
      currentHp = enemy.currentHp;
      if (initialHp === currentHp) {
        enemy.currentHp = initialHp - damage;
      } else {
        enemy.currentHp = currentHp - damage;
      }
      hpEnemy.replaceChildren();
      hpEnemy.appendChild(document.createTextNode(`${enemy.currentHp} / ${enemy.initialHp}`));
      localStorage[enemy.id] = JSON.stringify(enemy);
      if (enemy.currentHp <= 0) {
        modalWrapper.style.display = "block";
        modalWindow.style.display = "block";
        modalWindow.classList.toggle("modal__active");
        // modal container
        modal = modalWindow.appendChild(document.createElement("div"));
        modal.classList.add("modal-container");
        element = modal.appendChild(document.createElement("h5"));
        element.classList.add("result-container");
        element.appendChild(document.createTextNode("You Win!"));
        battleFinished = true;
        // increment wins
        player.wins = player.wins + 1;
        enemy.loses = enemy.loses + 1;
      } else {
        fillHp("hpEnemy");
      }

      // enemy attack
      if (enemy.attack === player.defence1 || enemy.attack === player.defence2) {
        // console.log(`${enemy.name} attacked ${player.name} to ${Zones[enemy.attack]} but ${player.name} priotect his ${Zones[enemy.attack]}`);
      } else {
        // console.log(`${enemy.name} attacked ${player.name} to ${Zones[enemy.attack]} and deal 10 damage`);
        damage = 10;
      }
      logAdd = new Log(enemy.name, player.name, `${Zones[enemy.attack]}`, damage, "");
      log.push(logAdd);
      localStorage["log"] = JSON.stringify(log);
      let hpPlayer = document.getElementById("hpPlayer");
      initialHp = player.initialHp;
      currentHp = player.currentHp;
      if (initialHp === currentHp) {
        player.currentHp = initialHp - damage;
      } else {
        player.currentHp = currentHp - damage;
      }
      hpPlayer.replaceChildren();
      hpPlayer.appendChild(document.createTextNode(`${player.currentHp} / ${player.initialHp}`));
      if (player.currentHp <= 0) {
        modalWrapper.style.display = "block";
        modalWindow.style.display = "block";
        modalWindow.classList.toggle("modal__active");
        // modal avatar container
        modal = modalWindow.appendChild(document.createElement("div"));
        modal.classList.add("modal-container");
        element = modal.appendChild(document.createElement("h5"));
        element.classList.add("result-container");
        element.appendChild(document.createTextNode("You Lose"));
        battleFinished = true;
        // increment loses
        player.loses = player.loses + 1;
        enemy.wins = enemy.wins + 1;
      } else {
        fillHp("hpPlayer");
      }

      // update players
      if (battleFinished === true) {
        enemy.currentHp = enemy.initialHp;
        enemy.attack = "";
        enemy.defence1 = "";
        enemy.defence2 = "";
        player.currentHp = player.initialHp;
        player.enemy = 0;
        player.attack = "";
        player.defence1 = "";
        player.defence2 = "";
      }
      localStorage["player"] = JSON.stringify(player);
      localStorage[enemy.id] = JSON.stringify(enemy);
      battleLog();
    }

    // enemy
    memberContainer = battleContainer.appendChild(document.createElement("div"));
    memberContainer.classList.add("battle-member-container");
    element = memberContainer.appendChild(document.createElement("div"));
    element.classList.add("battle-member-name");
    element.appendChild(document.createTextNode(enemy.name));
    element = memberContainer.appendChild(document.createElement("div"));
    element.classList.add("battle-avatar");
    avatarSrc = "./assets/images/" + enemy.avatar + ".jpg";
    battleAvatar = element.appendChild(document.createElement("img"));
    battleAvatar.setAttribute("src", avatarSrc);
    memberHpContainer = memberContainer.appendChild(document.createElement("div"));
    memberHpContainer.classList.add("battle-hp-container");
    element = memberHpContainer.appendChild(document.createElement("div"));
    element.classList.add("battle-hp-line");
    element.setAttribute("id", "hpEnemyLine");
    element = memberContainer.appendChild(document.createElement("div"));
    element.classList.add("battle-hp-text");
    element.setAttribute("id", "hpEnemy");
    element.appendChild(document.createTextNode(`${enemy.currentHp} / ${enemy.initialHp}`));

    // battle log
    function battleLog() {
      logs = JSON.parse(localStorage.getItem("log")) || [];
      logContainer.replaceChildren();
      for (let logString of Object.values(logs.reverse())) {
        let element = logContainer.appendChild(document.createElement("p"));
        if (logString.damage > 0) {
          element.appendChild(document.createTextNode(`${logString.who} attacked ${logString.whom} to ${logString.where} and deal ${logString.damage} damage`));
        } else {
          element.appendChild(document.createTextNode(`${logString.who} attacked ${logString.whom} to ${logString.where} but ${logString.whom} was able to protect his ${logString.where}`));
        }
        element.classList.add("log-entry");
      }
    }

    fillHp("hpPlayer");
    fillHp("hpEnemy");
    battleLog();
  } else {
    battle();
  }
}

// get unique defence zone
function getDefenceZone(enemyId, defenceZone) {
  const newDefenceZone = Math.floor(Math.random() * 5);
  if (newDefenceZone === defenceZone) {
    return getDefenceZone(enemyId, defenceZone);
  } else {
    return newDefenceZone;
  }
}
