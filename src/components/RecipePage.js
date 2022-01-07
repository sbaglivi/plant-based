import IngredientList from "./IngredientList";
import { useParams, Link } from "react-router-dom";
import styles from "./RecipePage.module.css";
import { ThemeContext } from "../theme-context";
const RecipePage = ({ recipes }) => {
  const { id } = useParams();
  const getRecipeById = (recipes, id) => {
    return recipes.filter(recipe => recipe.id === +id)[0];
  }
  let recipe = getRecipeById(recipes, id);
  if (!recipe) {
    try {
      recipe = JSON.parse(window.localStorage.getItem('recipe'));
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  window.localStorage.setItem('recipe', JSON.stringify(recipe));
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) =>
        <div className={`${styles.container}`} style={{color: theme.color}}>
          <button onClick={()=>toggleTheme()}> TEMP </button>
          <h1 className={styles.title}>{recipe.title}</h1>
          <Link className={styles.link} style={{color: theme.color}} to="/">Back to results</Link>
          <img className={styles.img} alt={recipe.title} src={recipe.image} />
          <IngredientList className={styles.ingredients} ingredients={recipe.extendedIngredients} />
          <div className={styles.instructions}>
            <h4>Instructions:</h4>
            <div>{recipe?.analyzedInstructions[0]?.name}
              <ol>
                {recipe?.analyzedInstructions[0]?.steps.map((step, index) => <li key={index}>{step.step}</li>)}
              </ol>
            </div>
          </div>
        </div>
      }
    </ThemeContext.Consumer>
  );
}
export default RecipePage;