let recipes = []; // Array to store recipe objects

// Retrieve recipes from local storage on page load
if (localStorage.getItem("recipes")) {
  recipes = JSON.parse(localStorage.getItem("recipes"));
  displayRecipes();
}

// Function to save recipes to local storage
function saveRecipes() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Function to add a new recipe to the data structure
function addRecipe(title, ingredients, instructions, image) {
  const recipe = {
    title: title,
    ingredients: ingredients,
    instructions: instructions,
    image: image,
  };
  recipes.push(recipe);
  saveRecipes();
}

// Function to retrieve and display the list of recipes
function displayRecipes() {
  const recipesList = document.getElementById("recipes");
  recipesList.innerHTML = ""; // Clear the existing content

  recipes.forEach((recipe, index) => {
    const recipeItem = document.createElement("li");
    recipeItem.classList.add("recipe");

    const titleElement = document.createElement("h3");
    titleElement.textContent = `Recipe ${index + 1}: ${recipe.title}`;
    recipeItem.appendChild(titleElement);

    const imageElement = document.createElement("img");
    imageElement.classList.add("recipe-image");
    if (recipe.image instanceof File) {
      const imageUrl = URL.createObjectURL(recipe.image);
      imageElement.src = imageUrl;
      imageElement.alt = recipe.title;
      imageElement.style.width = "50px";
      imageElement.style.height = "50px";
    } else {
      imageElement.src = recipe.image;
      imageElement.alt = "No Image";
    }
    recipeItem.appendChild(imageElement);
    var br1 = document.createElement("br");
    var br2 = document.createElement("br");
    var br3 = document.createElement("br");

    recipeItem.appendChild(br1);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginRight = "2px";
    deleteButton.style.marginTop = "4px";

    deleteButton.addEventListener("click", () => deleteRecipe(index));
    recipeItem.appendChild(deleteButton);
    recipeItem.appendChild(br2);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.style.marginRight = "2px";
    editButton.style.marginTop = "4px";

    editButton.addEventListener("click", () => editRecipe(index));
    recipeItem.appendChild(editButton);
    recipeItem.appendChild(br3);

    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.style.marginTop = "4px";
    viewButton.addEventListener("click", () => viewRecipe(index));
    recipeItem.appendChild(viewButton);

    recipesList.appendChild(recipeItem);
  });
}

// Function to delete a recipe
function deleteRecipe(index) {
  recipes.splice(index, 1);
  saveRecipes();
  document.getElementById("recipe-details").innerHTML = "";
  displayRecipes();
}

// Function to edit a recipe
function editRecipe(index) {
  const recipe = recipes[index];
  const title = prompt("Enter new title:", recipe.title);
  const ingredients = prompt("Enter new ingredients:", recipe.ingredients);
  const instructions = prompt("Enter new instructions:", recipe.instructions);

  if (title && ingredients && instructions) {
    recipes[index] = {
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      image: recipe.image,
    };
    saveRecipes();
    displayRecipes();
  }
}

// Function to view a recipe
function viewRecipe(index) {
  const recipe = recipes[index];
  var src = "",
    alt = "";
  const recipeDetails = document.getElementById("recipe-details");
  if (recipe.image instanceof File) {
    const imageUrl = URL.createObjectURL(recipe.image);
    src = imageUrl;
    alt = recipe.title;
  } else {
    src = recipe.image;
    alt = "No Image";
  }
  recipeDetails.innerHTML = `
    <img src=${src} height="50" width="50"></img>
    <h3>${recipe.title}</h3>
    <p>Ingredients: ${recipe.ingredients}</p>
    <p>Instructions: ${recipe.instructions}</p>
  `;
}

// Display the recipes on page load
displayRecipes();

document.getElementById("submit-btn").addEventListener("click", function (e) {
  e.preventDefault();
  var title = document.getElementById("title").value;
  var ingredients = document.getElementById("ingredients").value;
  var instructions = document.getElementById("instructions").value;
  var imageInput = document.getElementById("image");
  var imageFile = imageInput.files[0];

  addRecipe(title, ingredients, instructions, imageFile);
  displayRecipes();
});
