import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext, themes } from "../../context/themeContext";

import s from "./Paper.module.css";

const Paper = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={theme === themes.light ? s.paperLight : s.paperDark}>
      {children}
    </div>
  );
};

Paper.propTypes = {
  children: PropTypes.node,
};

export default Paper;
