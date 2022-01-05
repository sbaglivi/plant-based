const IngredientList = ({ ingredients }) => {
  if (ingredients.length === 0) return null;
  return (
    <ul>
      {ingredients.map((ingredient, i) => <li key={i}>{ingredient.name} - {`${ingredient.amount.metric.value} ${ingredient.amount.metric.unit}`}</li>)}
    </ul>
  );
}
export default IngredientList;