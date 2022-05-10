import React from "react";
import PropTypes from "prop-types";
import "./NavItem.css";

const NavItem = ({ name, icon }) => {
  const isActive = false;
  const navItemStyles = ["itemName"];
  isActive && navItemStyles.push("NavItemActive");
  return (
    <div className="NavItem">
      <span className="iconWrapper">
        {icon}
        <a className={navItemStyles.join(" ")} href="/">
          {name}
        </a>
      </span>
    </div>
  );
};
NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default NavItem;
