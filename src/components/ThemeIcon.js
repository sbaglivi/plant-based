import { BsSun, BsMoon } from 'react-icons/bs';
import { ThemeContext } from '../theme-context';
import styles from './ThemeIcon.module.css'
const ThemeIcon = ({ custom }) => {
  const customStyles = custom || {};
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) =>
        theme.color === 'white' ?
          <BsSun className={styles.themeIcon} style={customStyles} size={30} onClick={() => toggleTheme()} />
          :
          <BsMoon style={{ ...customStyles, borderColor: 'black' }} className={styles.themeIcon} size={30} onClick={() => toggleTheme()} />
      }
    </ThemeContext.Consumer>
  )
}
export default ThemeIcon;