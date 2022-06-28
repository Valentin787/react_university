import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import s from "./EditCard.module.css";

const EditCard = ({ onSubmit, activeCity, activeDepartment }) => {
  const [inputCity, setInputCity] = useState(activeCity);
  const [inputDepartment, setInputDepartment] = useState(activeDepartment);

  // USE REF
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // CHANGE INPUT

  const handlerChangeCity = (e) => {
    setInputCity(e.target.value);
  };
  const handlerChangeDepartment = (e) => {
    setInputDepartment(e.target.value);
  };

  // SUBMIT FORM

  const handlerSubmitCity = (e) => {
    e.preventDefault();

    onSubmit(inputCity);

    resetCityInput();
  };

  const handlerSubmitDepartment = (e) => {
    e.preventDefault();

    onSubmit(inputDepartment);

    resetDepartmentInput();
  };

  // RESET INPUT

  const resetCityInput = () => setInputCity("");
  const resetDepartmentInput = () => setInputDepartment("");

  return (
    <form
      onSubmit={
        inputCity === undefined ? handlerSubmitDepartment : handlerSubmitCity
      }
      className={s.container}
    >
      <label className={s.label}>
        <input
          ref={inputRef}
          className={s.input}
          onChange={activeCity ? handlerChangeCity : handlerChangeDepartment}
          value={inputCity !== undefined ? inputCity : inputDepartment}
          type="text"
        />
      </label>
      <button
        className={inputCity || inputDepartment ? s.btn : s.disabled}
        type="submit"
      >
        Сохранить
      </button>
    </form>
  );
};

EditCard.propTypes = {
  onSubmit: PropTypes.func,
  activeCity: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  activeDepartment: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default EditCard;
