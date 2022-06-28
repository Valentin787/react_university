import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext, themes } from "../../components/context/themeContext";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import s from "./Header.module.css";

const Header = ({ title }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={s.mainHeader}>
      <ThemeSwitcher />
      {title && (
        <h3 className={theme === themes.light ? s.lightTitle : s.darkTitle}>
          {title}
        </h3>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
