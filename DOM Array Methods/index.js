const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const doubleMoney = document.getElementById("double");
const showOnlyMillionaires = document.getElementById("show-millionaires");
const sortByRichest = document.getElementById("sort");
const calcTotalWealth = document.getElementById("calculate-wealth");

let data = [];

getRandUser();
getRandUser();
getRandUser();

async function getRandUser() {
  const res = await fetch("https://randomuser.me/api/");
  const allData = await res.json();
  const data = allData.results[0];
  //   const name = data.name.first + " " + data.name.last;

  const newUser = {
    name: `${data.name.first} ${data.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  generateRandData(newUser);
}

function generateRandData(newUser) {
  data.push(newUser);

  updateDOM();
}

function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((pd) => {
    const person = document.createElement("div");
    person.classList.add("person");
    person.innerHTML = `<strong>${pd.name}</strong>$${formatMoney(pd.money)}`;
    main.appendChild(person);
  });
}

function money2X() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function showRichest() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

function sortByMoney() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

function calculateTotalAmount() {
  const total = data.reduce(
    (accumulator, user) => (accumulator += user.money),
    0
  );
  const h3 = document.createElement("h3");
  h3.innerHTML = `Total Wealth:<strong>$${formatMoney(total)}</strong>`;
  main.appendChild(h3);
}

addUser.addEventListener("click", getRandUser);
doubleMoney.addEventListener("click", money2X);
showOnlyMillionaires.addEventListener("click", showRichest);
sortByRichest.addEventListener("click", sortByMoney);
calcTotalWealth.addEventListener("click", calculateTotalAmount);
