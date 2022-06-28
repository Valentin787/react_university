import { useState } from "react";
import { useContext } from "react";
import { ThemeContext, themes } from "../../../components/context/themeContext";

import PropTypes from "prop-types";
import Paper from "../../common/Paper/Paper";
import s from "./CitiesForm.module.css";
import BigButton from "../../common/BigButton/BigButton";

const CitiesForm = ({ addNewCity, cities, name, title, placeholder }) => {
  const [city, setCity] = useState("");

  //USE_CONTEXT
  const { theme } = useContext(ThemeContext);

  const handlerCityInput = (e) => setCity(e.target.value);

  const handlerSubmitCityForm = (e) => {
    e.preventDefault();

    addNewCity(city);

    resetCityInput();
  };

  const resetCityInput = () => {
    setCity("");
  };

  // const { city } = this.state;
  // const { cities, name, title, placeholder } = this.props;
  const sameCityName = cities.includes(city);

  const isActiveBtnAdd = Object.values(city).length === 0;

  return (
    <div className={s.wrap}>
      <Paper>
        <h4 className={theme === themes.light ? s.headerLight : s.headerDark}>
          {title}
        </h4>
        <form onSubmit={handlerSubmitCityForm} className={s.form} action="">
          <input
            onChange={handlerCityInput}
            name={name}
            type="text"
            placeholder={placeholder}
            value={city}
            className={s.input}
            required
          />
          {sameCityName && <p>Название {city} уже существует</p>}
          <BigButton
            type="submit"
            text="Добавить"
            disabledBtnCity={isActiveBtnAdd}
          />
        </form>
      </Paper>
    </div>
  );
};

CitiesForm.propTypes = {
  addNewCity: PropTypes.func,
  cities: PropTypes.array,
  name: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CitiesForm;

// class CitiesForm extends Component {
// static propTypes = {
//   addNewCity: PropTypes.func,
//   cities: PropTypes.array,
//   name: PropTypes.string,
//   title: PropTypes.string,
//   placeholder: PropTypes.string,
// };

// state = {
//   city: "",
// };

// handlerCityInput = (e) => {
//   this.setState({ city: e.target.value });
// };

// handlerSubmitCityForm = (e) => {
//   e.preventDefault();

//   const { addNewCity } = this.props;
//   const { city } = this.state;
//   addNewCity(city);

//   this.resetCityInput();
// };

//   resetCityInput = () => {
//     this.setState({ city: "" });
//   };
//   render() {
//     const { city } = this.state;
//     const { cities, name, title, placeholder } = this.props;
//     const sameCityName = cities.includes(city);

//     const isActiveBtnAdd = Object.values(this.state).some(
//       (inputCity) => inputCity === ""
//     );

//     return (
//       <div className={s.wrap}>
//         <Paper>
//           <h4 className={s.header}>{title}</h4>
//           <form
//             onSubmit={this.handlerSubmitCityForm}
//             className={s.form}
//             action=""
//           >
//             <input
//               onChange={this.handlerCityInput}
//               name={name}
//               type="text"
//               placeholder={placeholder}
//               value={city}
//               className={s.input}
//               required
//             />
//             {sameCityName && <p>Название {city} уже существует</p>}
//             <BigButton
//               type="submit"
//               text="Добавить"
//               disabledBtnCity={isActiveBtnAdd}
//             />
//           </form>
//         </Paper>
//       </div>
//     );
//   }
// }

// export default CitiesForm;
