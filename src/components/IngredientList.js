const IngredientList = ({ ingredients }) => {
  if (ingredients.length === 0) return null;
  return (
    <div>
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, i) => <li key={i}>{ingredient.original}</li>)}
      </ul>
    </div>
  );
}
export default IngredientList;