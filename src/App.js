import SearchForm from './components/SearchForm';
import RecipePage from "./components/RecipePage";
import styles from "./App.module.css"
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeContext, themes } from './theme-context';
import axios from "axios";
import ThemeIcon from './components/ThemeIcon';
import NotFound from "./components/NotFound";
import Banner from "./components/Banner"
import RecipeList from './components/RecipeList';
import Error from "./components/Error";
let firstSearchDone = false;
function App() {

  const [recipes, setRecipes] = useState([]);
  const [theme, setTheme] = useState(themes.dark);
  const [pageNumber, setPageNumber] = useState(0);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const toggleTheme = () => {
    const newTheme = theme === themes.dark ? themes.light : themes.dark;
    setTheme(newTheme);
  }
  const getRecipes = async () => {
    axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: process.env.REACT_APP_API_KEY,
        query: query,
        offset: pageNumber * 10,
        diet: 'vegetarian',
        addRecipeInformation: 'true',
        fillIngredients: 'true'
      }
    }).then(response => {
      setRecipes(response.data.results);
      if (response.data.results.length === 0) setError("Sorry, there were no results for your search")
      else setError("");
    }).catch(error => {
      if (error.response) {
        if (error.response.status === 402) {
          setError("HTTP Error 402 - Unfortunately we reached our daily quota for API calls. Try again tomorrow.")
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message)
      }
    })
  }

  const getNextPage = () => {
    setPageNumber(pageNumber + 1);
  }
  const getPreviousPage = () => {
    setPageNumber(pageNumber - 1);
  }
  const newSearch = () => {
    if (!firstSearchDone) firstSearchDone = true;
    pageNumber === 0 ? getRecipes() : setPageNumber(0);
  }
  useEffect(() => {
    if (!firstSearchDone) return;
    getRecipes();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    // eslint-disable-next-line
  }, [pageNumber])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <Routes>
        <Route path="/" exact element={
          <div className={styles.App} style={theme}>
            {!recipes.length ? <Banner /> : null}
            <ThemeIcon />
            <SearchForm newSearch={newSearch} query={query} setQuery={setQuery} />
            <RecipeList recipes={recipes} pageNumber={pageNumber} getNextPage={getNextPage} getPreviousPage={getPreviousPage} />
            <Error message={error} />
          </div>
        } />
        <Route path="/recipes/:id" element={<RecipePage recipes={recipes} />} />
        <Route path="/:unknown" element={<NotFound />} />
      </Routes>
    </ ThemeContext.Provider >
  );
}

export default App;
