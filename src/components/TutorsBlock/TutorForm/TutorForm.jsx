import React, { Component } from "react";
import BigButton from "../../common/BigButton/BigButton";
import Paper from "../../common/Paper/Paper";
import PropTypes from "prop-types";
import s from "./TutorForm.module.css";

class TutorForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  render() {
    return (
      <div className={s.wrap}>
        <Paper>
          <div className={s.form__wrap}>
            <h4 className={s.header}>Добавление преподователя</h4>
            <form className={s.form} action="">
              <input
                name="lastName"
                type="text"
                placeholder="Фамилия"
                required
              />
              <input name="firstName" type="text" placeholder="Имя" required />
              <input
                name="patronymic"
                type="text"
                placeholder="Отчество"
                required
              />
              <input name="phone" type="tel" placeholder="Телефон" required />
              <input name="email" type="email" placeholder="Email" required />
              <input name="city" type="text" placeholder="Город" required />
              <input
                name="options"
                type="text"
                placeholder="Вид деятельности"
                required
              />
              <BigButton type="submit" text="Пригласить" disabled />
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

export default TutorForm;
