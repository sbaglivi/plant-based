import SearchForm from './components/SearchForm';
import Recipe from "./components/Recipe";
import RecipePage from "./components/RecipePage";
import styles from "./App.module.css"
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
let firstSearchDone = false;
function App() {
  const API_KEY = "ebb4c5f35fdf413f8285b65b600dc6d2";

  const [recipes, setRecipes] = useState([]);
  const getRecipes = async (query) => {
    let queryString = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&query=${query}&apiKey=${API_KEY}&addRecipeInformation=true&fillIngredients=true`;
    console.log(firstSearchDone)
    firstSearchDone = true;
    console.log(firstSearchDone);
    try {
      let response = await fetch(queryString);
      if (response.ok) {
        let results = await response.json();
        console.log(results.results);
        setRecipes(results.results)
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Routes>
      <Route path="/" exact element={
        <div className={styles.App}>
          {!recipes.length ? <h1>Plant Based</h1> : null}
          <SearchForm getRecipes={getRecipes} />
          <div className={styles.recipesDiv}>
            {recipes.length ? recipes.map(recipe => <Link to={`recipes/${recipe.id}`} key={recipe.id} > <Recipe recipe={recipe} /></Link>) : (firstSearchDone ? <h4 className={styles.error}> Sorry there were no results for your search. </h4> : null)}
          </div>
        </div>
      } />
      <Route path="/recipes/:id" element={<RecipePage recipes={recipes} />} />
      <Route path="/:unknown" element={<NotFound />} />
    </Routes>
  );
}

export default App;
