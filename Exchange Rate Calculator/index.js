const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

async function calculateAmount() {
  const c1 = currencyOne.value;
  const c2 = currencyTwo.value;

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/bff2e0ee284afd00d8772aa0/latest/${c1}`
  );
  const data = await res.json();
  const equivalentRate = data.conversion_rates[c2];
  rate.innerHTML = `1 ${c1} = ${equivalentRate} ${c2}`;

  amountTwo.value = (amountOne.value * equivalentRate).toFixed(2);
}

currencyOne.addEventListener("change", calculateAmount);
amountOne.addEventListener("input", calculateAmount);
currencyTwo.addEventListener("change", calculateAmount);
amountTwo.addEventListener("input", calculateAmount);

swap.addEventListener("click", () => {
  const c1 = currencyOne.value;
  const c2 = currencyTwo.value;

  currencyOne.value = c2;
  currencyTwo.value = c1;

  calculateAmount();
});

calculateAmount();
