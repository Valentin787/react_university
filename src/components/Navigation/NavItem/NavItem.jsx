import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import s from "./NavItem.module.css";

const NavItem = ({ name, icon, isActive, link }) => {
  // const navItemStyles = ["itemName"];
  // isActive && navItemStyles.push("NavItemActive");
  return (
    <div className={s.NavItem}>
      <span className={s.iconWrapper}>
        {icon}
        <NavLink
          to={link}
          className={s.itemName}
          activeClassName={s.NavItemActive}
        >
          {name}
        </NavLink>
        {/* {isActive && ( */}
        {/* // <a className={s.itemName} href="">
          //   {name}
          // </a>
        )} */}
      </span>
    </div>
  );
};
NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  link: PropTypes.string.isRequired,
};

export default NavItem;
