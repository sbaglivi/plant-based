import './App.css';
import SearchForm from './components/SearchForm';
import RecipeTable from './components/RecipeTable';
import Recipe from "./components/Recipe";
import { useState } from 'react';
import recipesWithInfos from './data';

function App() {
  const fakeData =
    [
      { id: 1096282, title: 'Rustic Pasta with Chunky Vegetables', image: 'https://spoonacular.com/recipeImages/1096282-312x231.jpg', imageType: 'jpg', time: "45 min" },
      { id: 648190, title: 'Italian Pasta Salad with organic Arugula', image: 'https://spoonacular.com/recipeImages/648190-312x231.jpg', imageType: 'jpg' },
      { id: 660101, title: 'Simple Garlic Pasta', image: 'https://spoonacular.com/recipeImages/660101-312x231.jpg', imageType: 'jpg' },
      { id: 1096227, title: 'Pesto Zucchini Pasta (Whole 30 Approved)', image: 'https://spoonacular.com/recipeImages/1096227-312x231.jpg', imageType: 'jpg' },
      { id: 1096053, title: 'GF Vegan Creamy Broccoli Pasta', image: 'https://spoonacular.com/recipeImages/1096053-312x231.jpg', imageType: 'jpg' },
      { id: 633711, title: 'Baked Penne', image: 'https://spoonacular.com/recipeImages/633711-312x231.jpg', imageType: 'jpg' },
      { id: 633766, title: 'Baked Rigatoni', image: 'https://spoonacular.com/recipeImages/633766-312x231.jpg', imageType: 'jpg' },
      { id: 637664, title: 'Cheesy Mexican Penne', image: 'https://spoonacular.com/recipeImages/637664-312x231.png', imageType: 'png' },
      { id: 662669, title: 'Swiss Chard Linguine', image: 'https://spoonacular.com/recipeImages/662669-312x231.jpg', imageType: 'jpg' },
    ]
  const API_KEY = "ebb4c5f35fdf413f8285b65b600dc6d2";

  const [recipes, setRecipes] = useState([]);
  const additionalQueryParameters = ["fillIngredients", "addRecipeInformation", "addRecipeNutrition"]
  const getRecipes = async (query) => {
    let queryString = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&query=${query}&apiKey=${API_KEY}`;
    try {
      let response = await fetch(queryString);
      if (response.ok) {
        let results = await response.json();
        setRecipes(results);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <SearchForm />
      <RecipeTable recipes={fakeData} />
      {recipesWithInfos.map(recipe => <Recipe recipe={recipe} />)}
    </div>
  );
}

export default App;
