import PropTypes from "prop-types";
import s from "./Header.module.css";

const Header = ({ title }) => {
  return (
    <header className={s.mainHeader}>
      {title && <h3 className="heading">{title}</h3>}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
