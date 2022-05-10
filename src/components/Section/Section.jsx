/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
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
  console.log(icon);
  return (
    <section css={sectionStyle}>
      <div className="header">
        <div className="img-wrapper">{icon}</div>
        <h3 className="heading">{title}</h3>
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
