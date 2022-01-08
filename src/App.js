import SearchForm from './components/SearchForm';
import RecipePage from "./components/RecipePage";
import styles from "./App.module.css"
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeContext, themes } from './theme-context';
import ThemeIcon from './components/ThemeIcon';
import NotFound from "./components/NotFound";
import Banner from "./components/Banner"
import RecipeList from './components/RecipeList';
import { useEffect } from 'react/cjs/react.development';
let firstSearchDone = false;
function App() {

  const [recipes, setRecipes] = useState([]);
  const [theme, setTheme] = useState(themes.dark);
  const [pageNumber, setPageNumber] = useState(0);
  const [query, setQuery] = useState("");
  const toggleTheme = () => {
    const newTheme = theme === themes.dark ? themes.light : themes.dark;
    setTheme(newTheme);
  }
  const getRecipes = async () => {
    const queryString = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&query=${query}&apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&fillIngredients=true&offset=${pageNumber * 10}`;
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
  }, [pageNumber])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <Routes>
        <Route path="/" exact element={
          <div className={styles.App} style={theme}>
            {!recipes.length ? <Banner /> : null}
            <ThemeIcon />
            <SearchForm newSearch={newSearch} query={query} setQuery={setQuery} />
            <RecipeList recipes={recipes} firstSearchDone={firstSearchDone} pageNumber={pageNumber} getNextPage={getNextPage} getPreviousPage={getPreviousPage} />
          </div>
        } />
        <Route path="/recipes/:id" element={<RecipePage recipes={recipes} />} />
        <Route path="/:unknown" element={<NotFound />} />
      </Routes>
    </ ThemeContext.Provider >
  );
}

export default App;
