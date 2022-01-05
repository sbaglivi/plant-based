import IngredientList from "./IngredientList";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
const API_KEY = "ebb4c5f35fdf413f8285b65b600dc6d2";
const RecipePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const getRecipeIngredients = async (id) => {
    let queryString = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${API_KEY}`
    let response = await fetch(queryString);
    if (response.ok) {
      let results = await response.json();
      setIngredients(results.ingredients);
    }
  }
  const getRecipeInstructions = async (id) => {
    let queryString = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`
    let response = await fetch(queryString);
    if (response.ok) {
      let results = await response.json();
      console.log("got results")
      console.log(results);
      setInstructions(results);
    }
  }
  const { id } = useParams();
  useEffect(() => {
    getRecipeIngredients(id);
    getRecipeInstructions(id);
  }, [id]);
  return (
    <>
      <IngredientList ingredients={ingredients} />
      <div>{instructions[0]?.name}
        {instructions[0]?.steps.map((step, index) => <p key={index}>{step.step}</p>)}
      </div>
    </>
  );
}
export default RecipePage;