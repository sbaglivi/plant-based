import SearchForm from './components/SearchForm';
import Recipe from "./components/Recipe";
import RecipePage from "./components/RecipePage";
import styles from "./App.module.css"
import { useState } from 'react';
import { Route, Routes, useParams, Link } from 'react-router-dom';
import { ThemeContext, themes } from './theme-context';
import ThemeIcon from './components/ThemeIcon';

const NotFound = () => {
  const params = useParams();
  return (
    <ThemeContext.Consumer>
      {({ theme }) =>
        <div className={styles.errorPage} style={theme}>
          <ThemeIcon />
          <p>Sorry, we don't have any route for {params.unknown}</p>
          <Link style={{ color: theme.color }} to="/">Go back to the homepage</Link>
        </div>
      }
    </ThemeContext.Consumer>
  )
}
// additionalQueryParameters = ["fillIngredients", "addRecipeInformation", "addRecipeNutrition"]
let firstSearchDone = false;
function App() {
  const API_KEY = "ebb4c5f35fdf413f8285b65b600dc6d2";

  const [recipes, setRecipes] = useState([]);
  const [theme, setTheme] = useState(themes.dark);
  const toggleTheme = () => {
    const newTheme = theme === themes.dark ? themes.light : themes.dark;
    setTheme(newTheme);
  }
  const getRecipes = async (query) => {
    let queryString = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&query=${query}&apiKey=${API_KEY}&addRecipeInformation=true&fillIngredients=true`;
    firstSearchDone = true;
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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <Routes>
        <Route path="/" exact element={
          <div className={styles.App} style={theme}>
            {!recipes.length ? <h1>Plant Based</h1> : null}
            <ThemeIcon />
            <SearchForm getRecipes={getRecipes} />
            <div className={styles.recipesDiv}>
              {recipes.length ? recipes.map(recipe => <Link to={`recipes/${recipe.id}`} key={recipe.id} > <Recipe recipe={recipe} /></Link>) : (firstSearchDone ? <h4 className={styles.error}> Sorry there were no results for your search. </h4> : null)}
            </div>
          </div>
        } />
        <Route path="/recipes/:id" element={<RecipePage recipes={recipes} />} />
        <Route path="/:unknown" element={<NotFound />} />
      </Routes>
    </ ThemeContext.Provider >
  );
}

export default App;
