import React, { Component } from "react";
import BigButton from "../../common/BigButton/BigButton";
import Paper from "../../common/Paper/Paper";
import PropTypes from "prop-types";
import s from "./TutorForm.module.css";

class TutorForm extends Component {
  static propTypes = {
    onAddTutor: PropTypes.func,
  };
  state = {
    firstName: "",
    lastName: "",
    patronymic: "",
    phone: "",
    email: "",
    city: "",
    options: "",
  };
  handleChangeInputForm = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { onAddTutor } = this.props;
    onAddTutor(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      patronymic: "",
      phone: "",
      email: "",
      city: "",
      options: "",
    });
  };

  render() {
    const { lastName, firstName, patronymic, phone, email, city, options } =
      this.state;

    const isSubmitBtnDisabled = Object.values(this.state).some(
      (item) => item === ""
    );

    return (
      <div className={s.wrap}>
        <Paper>
          <div className={s.form__wrap}>
            <h4 className={s.header}>Добавление преподователя</h4>
            <form onSubmit={this.handleSubmit} className={s.form} action="">
              <input
                onChange={this.handleChangeInputForm}
                name="lastName"
                type="text"
                placeholder="Фамилия"
                value={lastName}
                className={s.input}
                required
              />
              <input
                onChange={this.handleChangeInputForm}
                name="firstName"
                type="text"
                placeholder="Имя"
                value={firstName}
                className={s.input}
                required
              />
              <input
                onChange={this.handleChangeInputForm}
                name="patronymic"
                type="text"
                placeholder="Отчество"
                value={patronymic}
                className={s.input}
                required
              />
              <input
                onChange={this.handleChangeInputForm}
                name="phone"
                type="tel"
                placeholder="Телефон"
                value={phone}
                className={s.input}
                required
              />
              <input
                onChange={this.handleChangeInputForm}
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                className={s.input}
                required
              />
              <input
                onChange={this.handleChangeInputForm}
                name="city"
                type="text"
                placeholder="Город"
                value={city}
                className={s.input}
                required
              />
              <input
                onChange={this.handleChangeInputForm}
                name="options"
                type="text"
                placeholder="Вид деятельности"
                value={options}
                className={s.input}
                required
              />
              <BigButton
                type="submit"
                text="Пригласить"
                disabled={isSubmitBtnDisabled}
              />
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

export default TutorForm;
