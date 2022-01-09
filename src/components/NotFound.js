import { ThemeContext } from "../assets/js/theme-context";
import ThemeIcon from "./ThemeIcon";
import { Link, useParams } from "react-router-dom";
import styles from "../assets/css/App.module.css";
const NotFound = () => {
  const params = useParams();
  return (
    <ThemeContext.Consumer>
      {({ theme }) =>
        <div className={styles.errorPage} style={theme}>
          <ThemeIcon />
          <p>Sorry, we don't have any route for {params.unknown}</p>
          <Link style={{ color: theme.color }} to="/">Go back to the homepage</Link>
        </div>
      }
    </ThemeContext.Consumer>
  )
}
export default NotFound;