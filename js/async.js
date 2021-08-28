const searchFood = () => {
  const inputField = document.getElementById('search-field')
  const inputValue = inputField.value
  // clear data 
  inputField.value = ''

  // dynamically user দেখানো আমি কি লেখছি সেটা অনুসারে
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}` 
  fetch(url)
    .then(res => res.json())
  .then(data=>displaySearchResult(data.meals))
  // console.log(url);
}

const displaySearchResult = (meals) => {
  const searchResult = document.getElementById('search-result');
  // clear result 
  searchResult.textContent = ''
  // empty result 
  if (meals == null) {
    const validation = document.getElementById('valid')
    validation.innerText = `Please Write Something Likes Food Related`
  }
  else {
  for (const meal of meals) {
    console.log(meal);
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML =
    // যদি কোন meal এ ক্লিক করি তাহলে  সেটা অনুসারে নতুন details দেখানো
    ` <div onclick="loadMealDetail('${meal.idMeal}')" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top img-fluid" w-50 alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
      </div>
    </div>
    `
    searchResult.appendChild(div)
  }
  }

}
const loadMealDetail = async mealId => {
  // console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetails(data.meals[0]));
  
  const res = await fetch(url)
  const data = await res.json()
  displayMealDetails(data.meals[0])
}

const displayMealDetails = (mealInfo) => {
  const mealDetails = document.getElementById('meal-details')
  // যতবার displayMealDetails এ ক্লিক করমু নুতুন একটা যুগ করার আগে পুরাণ যেটা ছিল সেটা clear দিবে
  mealDetails.textContent = "" 
  const div = document.createElement('div')
  div.classList.add('card');
  div.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${mealInfo.strMeal}</h5>
      <p class="card-text">${mealInfo.strInstructions.slice(0, 50)}</p>
      <a href="${mealInfo.strSource}" class="btn btn-primary">More</a>
    </div>
    `
  mealDetails.appendChild(div)
}