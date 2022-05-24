import React from "react";
import PropTypes from "prop-types";
import s from "./Filter.module.css";

const Filter = ({ label, placeholder, value, onFilter }) => {
  return (
    <div className={s.container}>
      <label className={s.label}>
        {label}
        <input
          onChange={onFilter}
          value={value}
          className={s.input}
          type="text"
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onFilter: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;
