import { useState } from "react";
import { BsSearch } from "react-icons/bs";
const SearchForm = ({getRecipes}) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(text === ""){
      alert("Enter some text");
      return;
    }
    getRecipes(text);

  }
  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} aria-label="Recipe search" placeholder="Vegetable chicken"></input>
      <BsSearch size={24} />
    </form>
  );
}
export default SearchForm;