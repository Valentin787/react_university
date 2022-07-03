import PropTypes from "prop-types";
import s from "./BigButton.module.css";

const BigButton = ({
  text,
  icon,
  type,
  onClickForm,
  onClick,
  disabled,
  onClickOpenForm,
  disabledBtnCity,
}) => {
  const isActive = disabled;

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      onClick={onClickForm || onClickOpenForm || onClick}
      className={isActive || disabledBtnCity ? s.disabled : s.btn}
    >
      <span className={s.icon}>{icon}</span>
      <span className={s.heading}>{text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  disabled: PropTypes.bool,
  onClickOpenForm: PropTypes.func,
  value: PropTypes.bool,
  type: PropTypes.string,
  disabledBtnCity: PropTypes.bool,
  onClickForm: PropTypes.func,
};

export default BigButton;
