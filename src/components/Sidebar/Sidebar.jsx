import React from "react";
import PropTypes from "prop-types";
import Navigation from "../Navigation/Navigation";
import "./Sidebar.css";

const defineStyles = (isOpen) => {
  const finalStyles = ["Sidebar"];
  if (!isOpen) {
    finalStyles.push("Sidebar-closed");
  }
  return finalStyles.join(" ");
};

const Sidebar = () => {
  const isOpen = true;
  return (
    <div className={defineStyles(isOpen)}>
      <div className="Sidebar-decor"></div>
      <button className="toggle-btn" aria-label="toggle-sidebar"></button>
      <Navigation />
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
