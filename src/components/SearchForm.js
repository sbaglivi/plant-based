import { BsSearch } from "react-icons/bs";
import styles from "./SearchForm.module.css";
const SearchForm = ({ newSearch, query, setQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      alert("Enter some text");
      return;
    }
    newSearch();

  }
  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Recipe search" placeholder="Vegetable chicken"></input>
      <BsSearch size={24} color={'black'} onClick={handleSubmit} />
    </form>
  );
}
export default SearchForm;