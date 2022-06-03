import React, { Component } from "react";
import PropTypes, { object } from "prop-types";

import s from "./EditCard.module.css";
import { string } from "prop-types";

class EditCard extends Component {
  state = {
    inputCity: this.props.activeCity,
    inputDepartment: this.props.activeDepartment,
  };

  // CHANGE INPUT

  handlerChangeCity = (e) => {
    this.setState({ inputCity: e.target.value });
  };
  handlerChangeDepartment = (e) => {
    this.setState({ inputDepartment: e.target.value });
  };

  // SUBMIT FORM

  handlerSubmitCity = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { inputCity } = this.state;
    onSubmit(inputCity);

    this.resetCityInput();
  };

  handlerSubmitDepartment = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { inputDepartment } = this.state;
    onSubmit(inputDepartment);

    this.resetDepartmentInput();
  };

  // RESET INPUT

  resetCityInput = () => this.setState({ inputCity: "" });
  resetDepartmentInput = () => this.setState({ inputDepartment: "" });

  //RENDER

  render() {
    const { activeCity } = this.props;
    const { inputCity, inputDepartment } = this.state;

    return (
      <form
        onSubmit={
          inputCity === undefined
            ? this.handlerSubmitDepartment
            : this.handlerSubmitCity
        }
        className={s.container}
      >
        <label className={s.label}>
          <input
            className={s.input}
            onChange={
              activeCity ? this.handlerChangeCity : this.handlerChangeDepartment
            }
            value={inputCity || inputDepartment}
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
  }
}

EditCard.propTypes = {
  onSubmit: PropTypes.func,
  activeCity: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  activeDepartment: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default EditCard;
