import React from "react";
import PropTypes from "prop-types";
import s from "./NavItem.module.css";

const NavItem = ({ name, icon, isActive }) => {
  const navItemStyles = ["itemName"];
  isActive && navItemStyles.push("NavItemActive");
  return (
    <div className={s.NavItem}>
      <span className={s.iconWrapper}>
        {icon}
        {isActive && (
          <a className={s.itemName} href="/">
            {name}
          </a>
        )}
      </span>
    </div>
  );
};
NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};

export default NavItem;
