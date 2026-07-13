// create container
const body = document.getElementsByTagName("body")[0];
const main = body.appendChild(document.createElement("main"));
main.classList.add("main");
const mainContainer = main.appendChild(document.createElement("div"));
mainContainer.classList.add("container");

registerForm();

// registration form
function registerForm() {
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
  console.log("register");
}
