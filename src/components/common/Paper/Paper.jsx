import PropTypes from "prop-types";

import s from "./Paper.module.css";

const Paper = ({ children }) => {
  return <div className={s.paper}>{children}</div>;
};

Paper.propTypes = {
  children: PropTypes.node,
};

export default Paper;
