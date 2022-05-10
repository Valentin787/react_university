import PropTypes from "prop-types";
import s from "./BigButton.module.css";

const BigButton = ({ text, icon }) => {
  const isActive = true;
  return (
    <button className={isActive ? s.btn : s.disabled}>
      {icon && (
        <img className={s.image} width="20" height="20" src={icon} alt={text} />
      )}
      <span className={s.heading}> {text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};

export default BigButton;
