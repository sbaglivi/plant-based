const RecipeTable = ({ recipes }) => {
  if (recipes.length === 0) return null;
  return (
    <table className="recipeTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Calories</th>
          <th>Ingredients</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map(recipe =>
          <tr key={recipe.id}>
            <td>{recipe.title}</td>
            <td>{recipe?.calories ?? "999"}</td>
            <td>{"A lot of things"}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
export default RecipeTable;