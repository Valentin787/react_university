import { navConfig } from "../../data/navigation";
import NavItem from "./NavItem/NavItem";
import PropTypes from "prop-types";

const Navigation = ({ isActive }) => {
  return (
    <nav>
      {navConfig.map(({ name, icon }) => (
        <NavItem key={name} name={name} icon={icon} isActive={isActive} />
      ))}
    </nav>
  );
};
Navigation.propTypes = {
  isActive: PropTypes.bool,
};

export default Navigation;
