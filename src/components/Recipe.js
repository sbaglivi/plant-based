import styles from "./Recipe.module.css";
const Recipe = ({ recipe }) => {
  return (
      <div className={styles.recipe}>
        <img src={recipe.image} alt={`${recipe.title} recipe`}/>
        <div className={styles.recipeText}>
          <h4>{recipe.title}</h4>
          <p className={styles.recipeTime}>Preparation time: {recipe.readyInMinutes} minutes</p>
          <p className={styles.recipeServings}>Servings: {recipe.servings}</p>
          <p className={styles.recipePrice}>Price per serving: ${recipe.pricePerServing}</p>
        </div>
      </div>
  );
}
export default Recipe;