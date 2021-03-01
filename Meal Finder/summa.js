if (term.trim()) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

      if (data.meals === null) {
        resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
      } else {
        mealsEl.innerHTML = data.meals
          .map(
            (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
          )
          .join('');
      }
    });
  // Clear search text
  search.value = '';
} else {
  alert('Please enter a search term');
}
