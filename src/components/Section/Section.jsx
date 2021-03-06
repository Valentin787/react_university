/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext, themes } from "../../components/context/themeContext";
import s from "./Section.module.css";

import "./Section.module.css";

const sectionStyle = {
  position: "relative",
  marginBottom: "32px",
  "& .header": {
    display: "flex",
    alignItems: "center",
    marginBottom: 32,
    "& .img-wrapper": {
      marginRight: 8,
    },
  },
};

const Section = ({ icon, title, children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <section css={sectionStyle}>
      <div className="header">
        <div className="img-wrapper">{icon}</div>
        <h3 className={theme === themes.light ? "heading" : s.titleDark}>
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Section;
