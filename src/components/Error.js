import styles from "../App.module.css";
const Error = ({ message }) => {
  if (message === "") return null;
  return (
    <h4 className={styles.error} >{message}</h4>
  );
}
export default Error;