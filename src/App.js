import './App.css';
import SearchForm from './components/SearchForm';
import Recipe from "./components/Recipe";
import { useState } from 'react';
import { Route, Routes, useParams, Link } from 'react-router-dom';

const NotFound = () => {
  const params = useParams();
  return (
    <div>
      <p>Sorry, we don't have any route for {params.unknown}</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  )
}
// additionalQueryParameters = ["fillIngredients", "addRecipeInformation", "addRecipeNutrition"]
function App() {
  const API_KEY = "ebb4c5f35fdf413f8285b65b600dc6d2";

  const [recipes, setRecipes] = useState([]);
  const getRecipes = async (query) => {
    let queryString = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&query=${query}&apiKey=${API_KEY}&addRecipeInformation=true`;
    try {
      let response = await fetch(queryString);
      if (response.ok) {
        let results = await response.json();
        setRecipes(results.results)
      }
    } catch (e) {
      console.log(e);
    }
  }

  const logRecipeInfo = async ()=>{
    let queryString = `https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=${API_KEY}`
    let response = await fetch(queryString);
    if (response.ok){
      let results = await response.json();
      console.log(results);
    }
  }
  const logRecipeIngredients = async ()=>{
    let queryString = `https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=${API_KEY}`
    let response = await fetch(queryString);
    if (response.ok){
      let results = await response.json();
      console.log(results);
    }
  }
  return (
    <Routes>
      <Route path="/" exact element={
        <div className="App">
          <SearchForm getRecipes={getRecipes} />
          <div className="recipesDiv">
            {recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
          </div>
          <button onClick={logRecipeInfo}>Log recipe info</button>
          <button onClick={logRecipeIngredients}>Log recipe ingredients</button>
        </div>
      } />
      <Route path="/:unknown" element={<NotFound />} />
    </Routes>
  );
}

export default App;
