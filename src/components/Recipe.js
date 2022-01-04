const Recipe = ({ recipe }) => {
  return (
    <div className="singleRecipe">
      <h4>{recipe.title}</h4>
      <img src={recipe.image} />
      <p class="recipeTime">Preparation time: {recipe.readyInMinutes} minutes</p>
      <p class="recipeServings">Servings: {recipe.servings}</p>
      <p class="recipePrice">Price per serving: ${recipe.pricePerServing}</p>
    </div>
  );
}
export default Recipe;