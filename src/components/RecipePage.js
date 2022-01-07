import IngredientList from "./IngredientList";
import { useParams, Link } from "react-router-dom";
import styles from "./RecipePage.module.css";
import { ThemeContext } from "../theme-context";
import ThemeIcon from "./ThemeIcon";
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
      {({ theme, toggleTheme }) =>
        <div className={styles.bodyDiv} style={theme}>
          <div className={`${styles.container}`}>
            <h1 className={styles.title}>{recipe.title}</h1>
            <div className={styles.links}>
              <ThemeIcon custom={{ position: 'static', display: 'block', marginBottom: 10, marginLeft: 'auto', marginRight: 0 }} />
              <Link className={styles.link} style={{ color: theme.color }} to="/">Back to results</Link>
            </div>
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
        </div>
      }
    </ThemeContext.Consumer>
  );
}
export default RecipePage;