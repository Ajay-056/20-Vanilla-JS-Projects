const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('heading');
const singleMealEl = document.getElementById('single-meal');

function popup(message) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerText = message;
  alert.style.display = 'flex';
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 2000);
}

async function searchMeal(e) {
  e.preventDefault();

  singleMealEl.innerHTML = '';

  const searchTerm = search.value;

  if (searchTerm.trim()) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );

    const allData = await res.json();

    const data = allData.meals;

    resultHeading.innerText = `Search results for '${searchTerm}':`;

    if (data === null) {
      popup('There are no search results. Try again!');
    } else {
      mealsEl.innerHTML = data
        .map(
          (meal) => `<div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                    </div>`
        )
        .join('');
    }
    search.value = '';
  } else {
    popup('Please enter a search term!');
  }
}

async function getMealById(mealID) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );

  const allData = await res.json();

  const data = allData.meals[0];

  addMealToDOM(data);
}

async function randomMeal() {
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

  const allData = await res.json();

  const data = allData.meals[0];

  addMealToDOM(data);
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
