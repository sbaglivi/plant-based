import styles from "../App.module.css";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
const RecipeList = ({ recipes, firstSearchDone, pageNumber, getNextPage, getPreviousPage }) => {
  if (!recipes.length) {
    if (firstSearchDone) {
      return <h4 className={styles.error}>Sorry, there were no results for your search.</h4>
    } else {
      return null;
    }
  }
  return (
    <>
      <div className={styles.recipesDiv}>
        {recipes.map(recipe => <Link to={`recipes/${recipe.id}`} key={recipe.id} > <Recipe recipe={recipe} /></Link>)}
      </div>
      <div className={styles.pageButtons}>
        {pageNumber > 0 ? <button onClick={getPreviousPage}>Previous Page </button> : null}
        {recipes.length >= 10 ? <button onClick={getNextPage}>Next Page</button> : null}
      </div>
    </>
  );
}
export default RecipeList;