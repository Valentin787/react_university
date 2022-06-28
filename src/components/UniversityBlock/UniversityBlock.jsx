import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext, themes } from "../../components/context/themeContext";
import Paper from "../common/Paper/Paper";
import Card from "./Card/Card";

import s from "../UniversityBlock/UniversityBlock.module.css";

const UniversityBlock = ({ name, descr }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={s.section}>
      <Paper>
        <Card name={name} />
      </Paper>

      <Paper>
        <p className={theme === themes.light ? s.textLight : s.textDark}>
          {descr}
        </p>
      </Paper>
    </section>
  );
};

UniversityBlock.propTypes = {
  name: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
};

export default UniversityBlock;
