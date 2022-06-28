import React from "react";
import { useContext } from "react";
import { ThemeContext, themes } from "../../../components/context/themeContext";

import BigButton from "../../common/BigButton/BigButton";
import Paper from "../../common/Paper/Paper";
import PropTypes from "prop-types";
import s from "./TutorForm.module.css";
import { useState } from "react";

const TutorForm = ({ onAddTutor }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [options, setOptions] = useState("");

  const { theme } = useContext(ThemeContext);

  // const handleChangeInputForm = (e) => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddTutor({
      firstName,
      lastName,
      patronymic,
      phone,
      email,
      city,
      options,
    });
    resetForm();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPatronymic("");
    setPhone("");
    setEmail("");
    setCity("");
    setOptions("");
  };

  const requiredValues = [
    firstName,
    lastName,
    patronymic,
    phone,
    email,
    city,
    options,
  ];
  console.log(requiredValues);
  const isSubmitBtnDisabled = requiredValues.some((item) => item === "");

  return (
    <div className={s.wrap}>
      <Paper>
        <div className={s.form__wrap}>
          <h4 className={theme === themes.light ? s.headerLight : s.headerDark}>
            Добавление преподователя
          </h4>
          <form onSubmit={handleSubmit} className={s.form} action="">
            <input
              onChange={(e) => setLastName(e.target.value)}
              name="lastName"
              type="text"
              placeholder="Фамилия"
              value={lastName}
              className={s.input}
              required
            />
            <input
              onChange={(e) => setFirstName(e.target.value)}
              name="firstName"
              type="text"
              placeholder="Имя"
              value={firstName}
              className={s.input}
              required
            />
            <input
              onChange={(e) => setPatronymic(e.target.value)}
              name="patronymic"
              type="text"
              placeholder="Отчество"
              value={patronymic}
              className={s.input}
              required
            />
            <input
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              type="tel"
              placeholder="Телефон"
              value={phone}
              className={s.input}
              required
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              className={s.input}
              required
            />
            <input
              onChange={(e) => setCity(e.target.value)}
              name="city"
              type="text"
              placeholder="Город"
              value={city}
              className={s.input}
              required
            />
            <input
              onChange={(e) => setOptions(e.target.value)}
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
};

TutorForm.propTypes = {
  onAddTutor: PropTypes.func,
};

export default TutorForm;

// class TutorForm extends Component {
//   static propTypes = {
//     onAddTutor: PropTypes.func,
//   };
//   state = {
//     firstName: "",
//     lastName: "",
//     patronymic: "",
//     phone: "",
//     email: "",
//     city: "",
//     options: "",
//   };
//   handleChangeInputForm = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     const { onAddTutor } = this.props;
//     onAddTutor(this.state);
//     this.resetForm();
//   };

//   resetForm = () => {
//     this.setState({
//       firstName: "",
//       lastName: "",
//       patronymic: "",
//       phone: "",
//       email: "",
//       city: "",
//       options: "",
//     });
//   };

//   render() {
//     const { lastName, firstName, patronymic, phone, email, city, options } =
//       this.state;

//     const isSubmitBtnDisabled = Object.values(this.state).some(
//       (item) => item === ""
//     );

//     return (
//       <div className={s.wrap}>
//         <Paper>
//           <div className={s.form__wrap}>
//             <h4 className={s.header}>Добавление преподователя</h4>
//             <form onSubmit={this.handleSubmit} className={s.form} action="">
//               <input
//                 onChange={this.handleChangeInputForm}
//                 name="lastName"
//                 type="text"
//                 placeholder="Фамилия"
//                 value={lastName}
//                 className={s.input}
//                 required
//               />
//               <input
//                 onChange={this.handleChangeInputForm}
//                 name="firstName"
//                 type="text"
//                 placeholder="Имя"
//                 value={firstName}
//                 className={s.input}
//                 required
//               />
//               <input
//                 onChange={this.handleChangeInputForm}
//                 name="patronymic"
//                 type="text"
//                 placeholder="Отчество"
//                 value={patronymic}
//                 className={s.input}
//                 required
//               />
//               <input
//                 onChange={this.handleChangeInputForm}
//                 name="phone"
//                 type="tel"
//                 placeholder="Телефон"
//                 value={phone}
//                 className={s.input}
//                 required
//               />
//               <input
//                 onChange={this.handleChangeInputForm}
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 className={s.input}
//                 required
//               />
//               <input
//                 onChange={this.handleChangeInputForm}
//                 name="city"
//                 type="text"
//                 placeholder="Город"
//                 value={city}
//                 className={s.input}
//                 required
//               />
//               <input
//                 onChange={this.handleChangeInputForm}
//                 name="options"
//                 type="text"
//                 placeholder="Вид деятельности"
//                 value={options}
//                 className={s.input}
//                 required
//               />
//               <BigButton
//                 type="submit"
//                 text="Пригласить"
//                 disabled={isSubmitBtnDisabled}
//               />
//             </form>
//           </div>
//         </Paper>
//       </div>
//     );
//   }
// }

// export default TutorForm;
