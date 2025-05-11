
const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.getElementById("search")


let meals = [];

async function fetchmeals(search) {
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) =>res.json())
    .then((data) => (meals = data.meals));
    console.log(meals);
    
}

function mealsDisolay() {
    if (meals === null) {
        result.innerHTML = "<h2>Aucun resultat</h2>"
    }
    else {
    meals.length = 12;
    
    result.innerHTML = meals
    .map((meal) => {
            let ingredients = [];

            for (i = 1; i < 21; i++) {
                if (meal[`strIngredient${i}`]) {
                    let ingredient = meal[`strIngredient${i}`];
                    let measure = meal[`strMeasure${i}`];

                    ingredients.push(`<li>${ingredient}   -   ${measure}</li>`);


                }
            }
            console.log(ingredients)

       return `
        <li class="card">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strArea}</p>
        <img src="${meal.strMealThumb}" alt="Photo ${meal.strMeal}">
        <ul>${ingredients.join("")}</ul>
        </li>
        `
        }
    ).join("");
    }
}

input.addEventListener("input", (e) => {
    fetchmeals(e.target.value);
})


form.addEventListener("submit", (e) => {
    e.preventDefault();
    mealsDisolay()
})