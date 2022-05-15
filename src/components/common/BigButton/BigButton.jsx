import PropTypes from "prop-types";
import s from "./BigButton.module.css";

const BigButton = ({ text, icon, onClickForm, value }) => {
  const isActive = value;

  return (
    <button onClick={onClickForm} className={isActive ? s.disabled : s.btn}>
      <span className={s.icon}>{icon}</span>
      <span className={s.heading}>{text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default BigButton;
